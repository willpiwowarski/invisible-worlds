from pydantic import BaseModel
from typing import List, Optional


class Week(BaseModel):
    week_number: int
    title: str
    summary: str
    key_developments: List[str]

    size_comparison: Optional[str] = None
    systems_developing: Optional[List[str]] = None
