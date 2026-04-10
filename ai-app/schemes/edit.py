from typing import List
from pydantic import BaseModel


class EditSuggestions(BaseModel):
    response: List[str]
    detail: str


class EditSuggestion(BaseModel):
    response: str
    detail: str
