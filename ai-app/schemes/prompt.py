from pydantic import BaseModel
from typing import Optional


class Prompt(BaseModel):
    user: Optional[str]
    content: str


class PromptTitle(Prompt):
    title: Optional[str]
