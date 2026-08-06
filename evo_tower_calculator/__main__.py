"""CLI for the standalone Evo Tower calculator."""

from __future__ import annotations

import argparse
import json
import shlex
import subprocess
import sys
from pathlib import Path
from typing import Any

from .calculator import FightParams, calculate_fight_params, calculate_with_builtin_engine


def _runner(command: str):
    argv = shlex.split(command)

    def run(battle_data: dict[str, Any]) -> bool:
        process = subprocess.run(
            argv,
            input=json.dumps(battle_data, ensure_ascii=False) + "\n",
            text=True,
            capture_output=True,
            check=False,
        )
        if process.returncode:
            raise RuntimeError(process.stderr.strip() or f"runner exited {process.returncode}")
        result = json.loads(process.stdout)
        if not isinstance(result, dict) or not isinstance(result.get("isWin"), bool):
            raise ValueError('runner output must be JSON like {"isWin": true}')
        return result["isWin"]

    return run


def main() -> int:
    parser = argparse.ArgumentParser(description="Calculate evotower_fight parameters")
    parser.add_argument("readyfight", type=Path, help="evotower_readyfight response JSON")
    parser.add_argument("--runner", help="single-battle simulator command")
    parser.add_argument("--engine-data", type=Path, help="built-in engine skill/rule JSON")
    parser.add_argument("--energy", type=int, help="maximum battles available")
    parser.add_argument("--stage-ids", help="comma-separated tower stage IDs")
    parser.add_argument("--item-skip", action="store_true", help="use item skip: 1 win, no simulation")
    args = parser.parse_args()

    if args.item_skip:
        params = FightParams(1, 1, True)
    else:
        response = json.loads(args.readyfight.read_text(encoding="utf-8"))
        stage_ids = [int(value) for value in args.stage_ids.split(",")] if args.stage_ids else None
        if args.runner:
            params = calculate_fight_params(
                response, _runner(args.runner), energy=args.energy, stage_ids=stage_ids
            )
        else:
            engine_data = (
                json.loads(args.engine_data.read_text(encoding="utf-8"))
                if args.engine_data
                else None
            )
            params = calculate_with_builtin_engine(
                response, engine_data=engine_data, energy=args.energy, stage_ids=stage_ids
            )
    json.dump(params.as_dict(), sys.stdout, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
