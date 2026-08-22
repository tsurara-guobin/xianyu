from __future__ import annotations

import argparse
import json
import shlex
import subprocess
import sys
from pathlib import Path
from typing import Any, Mapping

from .calculator import calculate_fight_params


def runner(command: str):
    argv = shlex.split(command)
    if not argv:
        raise ValueError("runner command is empty")

    def run(battle: dict[str, Any]) -> bool:
        process = subprocess.run(
            argv,
            input=json.dumps(battle, ensure_ascii=False) + "\n",
            text=True,
            encoding="utf-8",
            errors="replace",
            capture_output=True,
        )
        if process.returncode:
            raise RuntimeError(process.stderr.strip() or f"runner exited with {process.returncode}")
        result = json.loads(process.stdout)
        if not isinstance(result, Mapping) or type(result.get("isWin")) is not bool:
            raise ValueError('runner must output one JSON object: {"isWin": true}')
        return result["isWin"]

    return run


def main() -> int:
    parser = argparse.ArgumentParser(description="Build exact evotower_fight winNum using a headless original-engine runner")
    parser.add_argument("readyfight", type=Path)
    parser.add_argument("--battle-num", required=True, type=int)
    parser.add_argument("--runner", required=True, help="command reading battleData on stdin and writing {isWin: bool}")
    parser.add_argument("--stage-ids", help="comma-separated tower IDs (needed when absent from battleData.options)")
    parser.add_argument("--is-skip", action="store_true")
    args = parser.parse_args()
    response = json.loads(args.readyfight.read_text(encoding="utf-8"))
    stages = [int(value) for value in args.stage_ids.split(",")] if args.stage_ids else None
    result = calculate_fight_params(response, runner(args.runner), battle_num=args.battle_num, stage_ids=stages, is_skip=args.is_skip)
    print(json.dumps(result.as_dict(), ensure_ascii=False, separators=(",", ":")))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
