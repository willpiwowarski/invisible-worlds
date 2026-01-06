import json
from pathlib import Path
from typing import List

from .schemas import Week


DATA_PATH = Path(__file__).parent / "data" / "weeks.json"


def load_weeks() -> List[Week]:
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    return [Week(**week) for week in raw_data]
