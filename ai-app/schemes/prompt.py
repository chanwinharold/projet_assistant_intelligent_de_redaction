from pydantic import BaseModel
from typing import Optional


class Prompt(BaseModel):
    user: Optional[str] = None
    content: str


class PromptTitle(Prompt):
    title: Optional[str] = None
