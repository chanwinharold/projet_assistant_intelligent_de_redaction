from pydantic import BaseModel


class ResumeSuggestion(BaseModel):
    response: str
    detail: str