#!/usr/bin/env python3
"""Small local automation example with dry-run, apply, and receipts."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from typing import Any


class PilotError(RuntimeError):
    """A safe user-facing pilot error."""


def short_hash(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()[:12]


def analyze(records: object) -> tuple[dict[str, int], dict[str, Any]]:
    if not isinstance(records, list):
        raise PilotError("Input must be one JSON array.")
    open_count = 0
    processed = []
    skipped: dict[str, int] = {}
    for item in records:
        if not isinstance(item, dict):
            skipped["not an object"] = skipped.get("not an object", 0) + 1
            continue
        identifier = item.get("id")
        status = item.get("status")
        if not isinstance(identifier, str) or not identifier.strip():
            skipped["missing id"] = skipped.get("missing id", 0) + 1
            continue
        if status not in {"open", "closed"}:
            skipped["unsupported status"] = skipped.get("unsupported status", 0) + 1
            continue
        processed.append(short_hash(identifier))
        if status == "open":
            open_count += 1
    result = {"recordCount": len(processed), "openCount": open_count}
    receipt = {
        "schema": "ai-mentorship-safe-counter-receipt-v1",
        "examined": len(records),
        "processed": len(processed),
        "processedIdHashes": processed,
        "skipped": sum(skipped.values()),
        "skipReasons": skipped,
        "failed": 0,
        "quietStatus": "no work found" if open_count == 0 else "work found",
    }
    return result, receipt


def write_new(path: Path, payload: dict[str, Any], overwrite: bool) -> None:
    if path.exists() and not overwrite:
        raise PilotError("Output exists. Choose a new path or approve --overwrite.")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--receipt", type=Path)
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--confirm")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args(argv)
    try:
        records = json.loads(args.input.read_text(encoding="utf-8"))
        result, receipt = analyze(records)
        receipt.update(
            {
                "mode": "apply" if args.apply else "dry_run",
                "inputLabel": args.input.name,
            }
        )
        if args.apply:
            if args.confirm != "APPLY" or args.output is None:
                raise PilotError("Apply mode requires --confirm APPLY and --output.")
            if args.output.resolve() == args.input.resolve():
                raise PilotError("Output cannot replace the input.")
            write_new(args.output, result, args.overwrite)
            receipt["outputLabel"] = args.output.name
        if args.receipt:
            write_new(args.receipt, receipt, args.overwrite)
    except (OSError, json.JSONDecodeError, PilotError) as error:
        parser.error(str(error))
    print(json.dumps({"result": result, "receipt": receipt}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
