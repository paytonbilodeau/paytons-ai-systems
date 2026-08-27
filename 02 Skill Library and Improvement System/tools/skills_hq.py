#!/usr/bin/env python3
"""Create a buyer-controlled, metadata-only skill inventory and proposals."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
from typing import Any


SCHEMA = "ai-mentorship-skills-hq-v1"
MAX_SKILL_BYTES = 1_000_000


class SkillsHQError(RuntimeError):
    """A safe user-facing error."""


def file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def frontmatter_metadata(text: str) -> dict[str, str]:
    if not text.startswith("---\n"):
        return {}
    end = text.find("\n---\n", 4)
    if end < 0:
        return {}
    result: dict[str, str] = {}
    for raw_line in text[4:end].splitlines():
        if ":" not in raw_line:
            continue
        key, value = raw_line.split(":", 1)
        key = key.strip().lower()
        if key in {"name", "description", "version"}:
            result[key] = value.strip().strip("\"'")[:500]
    return result


def discover_skill_files(root: Path) -> list[Path]:
    if not root.is_dir():
        raise SkillsHQError("The approved skill root must be an existing folder.")
    found: list[Path] = []
    for current, directories, files in os.walk(root, followlinks=False):
        current_path = Path(current)
        directories[:] = sorted(
            name
            for name in directories
            if not name.startswith(".") and not (current_path / name).is_symlink()
        )
        if "SKILL.md" not in files:
            continue
        candidate = current_path / "SKILL.md"
        if not candidate.is_symlink():
            found.append(candidate)
    return sorted(found)


def inventory(root: Path) -> dict[str, Any]:
    root = root.resolve()
    skills = []
    skipped = []
    for candidate in discover_skill_files(root):
        relative = candidate.relative_to(root).as_posix()
        size = candidate.stat().st_size
        if size > MAX_SKILL_BYTES:
            skipped.append({"path": relative, "reason": "file exceeds size limit"})
            continue
        metadata = frontmatter_metadata(candidate.read_text(encoding="utf-8"))
        skills.append(
            {
                "path": relative,
                "name": metadata.get("name", candidate.parent.name),
                "description": metadata.get("description", ""),
                "version": metadata.get("version", "unversioned"),
                "sha256": file_hash(candidate),
                "sizeBytes": size,
            }
        )
    return {
        "schema": SCHEMA,
        "rootLabel": root.name,
        "contentEmbedded": False,
        "chatLogsRead": False,
        "skillCount": len(skills),
        "skills": skills,
        "skipped": skipped,
    }


def proposal(skill: Path, failure: str, acceptance: str) -> dict[str, Any]:
    if not skill.is_file() or skill.is_symlink():
        raise SkillsHQError("The proposed skill must be one regular file.")
    if not failure.strip() or not acceptance.strip():
        raise SkillsHQError("A proposal needs an observed failure and acceptance test.")
    return {
        "schema": "ai-mentorship-skill-improvement-proposal-v1",
        "skillLabel": skill.parent.name,
        "currentSha256": file_hash(skill),
        "observedFailure": failure.strip(),
        "acceptanceTest": acceptance.strip(),
        "status": "proposal_only",
        "applied": False,
    }


def write_json(path: Path, payload: dict[str, Any], overwrite: bool) -> None:
    if path.exists() and not overwrite:
        raise SkillsHQError("Output exists. Choose a new path or approve --overwrite.")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    inventory_parser = subparsers.add_parser("inventory")
    inventory_parser.add_argument("--root", type=Path, required=True)
    inventory_parser.add_argument("--output", type=Path, required=True)
    inventory_parser.add_argument("--overwrite", action="store_true")
    proposal_parser = subparsers.add_parser("propose")
    proposal_parser.add_argument("--skill", type=Path, required=True)
    proposal_parser.add_argument("--failure", required=True)
    proposal_parser.add_argument("--acceptance", required=True)
    proposal_parser.add_argument("--output", type=Path, required=True)
    proposal_parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args(argv)

    try:
        if args.command == "inventory":
            payload = inventory(args.root)
        else:
            if args.output.resolve() == args.skill.resolve():
                raise SkillsHQError("Proposal output cannot replace the skill.")
            payload = proposal(args.skill, args.failure, args.acceptance)
        write_json(args.output, payload, args.overwrite)
    except (OSError, UnicodeError, SkillsHQError) as error:
        parser.error(str(error))
    print(json.dumps({"ok": True, "status": payload.get("status", "inventory_only")}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
