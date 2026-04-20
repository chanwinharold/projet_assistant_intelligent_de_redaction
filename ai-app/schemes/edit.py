from typing import List
from pydantic import BaseModel


class EditSuggestions(BaseModel):
    result: dict[str, List[str]]
    detail: str


class EditSuggestion(BaseModel):
    result: dict[str, str]
    detail: str
