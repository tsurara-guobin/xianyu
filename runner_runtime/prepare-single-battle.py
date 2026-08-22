from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from evo_tower_calculator import prepare_battle


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Prepare one Evo Tower battleData "
            "from an evotower_readyfight response"
        )
    )

    parser.add_argument(
        "readyfight",
        type=Path,
        help="readyfight response JSON",
    )

    parser.add_argument(
        "--index",
        type=int,
        default=0,
        help="zero-based battle index",
    )

    parser.add_argument(
        "--stage-id",
        type=int,
        help=(
            "tower stage ID; omit if battleData.options "
            "already contains the correct towerId"
        ),
    )

    parser.add_argument(
        "--output",
        type=Path,
        default=Path("single-battle.json"),
    )

    args = parser.parse_args()

    response = json.loads(
        args.readyfight.read_text(
            encoding="utf-8"
        )
    )

    battle = prepare_battle(
        response,
        args.index,
        stage_id=args.stage_id,
    )

    args.output.write_text(
        json.dumps(
            battle,
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    print(
        json.dumps(
            {
                "output": str(args.output),
                "index": args.index,
                "stageId": args.stage_id,
                "randomSeed": battle.get(
                    "randomSeed"
                ),
                "hasLeftTeam": (
                    battle.get("leftTeam")
                    is not None
                ),
                "hasRightTeam": (
                    battle.get("rightTeam")
                    is not None
                ),
            },
            ensure_ascii=False,
        )
    )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())