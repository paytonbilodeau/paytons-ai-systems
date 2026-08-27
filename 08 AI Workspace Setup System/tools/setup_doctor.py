#!/usr/bin/env python3
"""Read-only workspace and local-tool report for one approved root."""

from __future__ import annotations

import argparse
import json
import os
import platform
import shutil
import sys
from pathlib import Path


def check(root: Path) -> dict[str, object]:
    exists = root.exists()
    is_directory = root.is_dir()
    free_gib = None
    if is_directory:
        free_gib = round(shutil.disk_usage(root).free / (1024**3), 2)
    return {
        "schema": "ai-mentorship-workspace-doctor-v1",
        "readOnly": True,
        "rootLabel": root.name or "approved-root",
        "root": {
            "exists": exists,
            "directory": is_directory,
            "readable": is_directory and os.access(root, os.R_OK),
            "writable": is_directory and os.access(root, os.W_OK),
            "freeGiB": free_gib,
        },
        "system": {
            "name": platform.system() or "Unknown",
            "release": platform.release() or "Unknown",
        },
        "python": {
            "version": ".".join(str(part) for part in sys.version_info[:3]),
            "supported": sys.version_info >= (3, 11),
        },
        "tools": {
            "node": shutil.which("node") is not None,
            "ffmpeg": shutil.which("ffmpeg") is not None,
            "ffprobe": shutil.which("ffprobe") is not None,
        },
        "changedSettings": False,
        "filesRead": 0,
        "filesWritten": 0,
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, required=True)
    args = parser.parse_args(argv)
    print(json.dumps(check(args.root), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
