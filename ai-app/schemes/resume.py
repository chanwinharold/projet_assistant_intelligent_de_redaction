from pydantic import BaseModel


class ResumeSuggestion(BaseModel):
    result: dict[str, str]
    detail: str