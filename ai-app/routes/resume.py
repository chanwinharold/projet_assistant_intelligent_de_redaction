from fastapi import APIRouter, status, HTTPException
from schemes.prompt import Prompt
from schemes.resume import ResumeSuggestion
from config import PREPROCESSED_PROMPTS, MODEL_NAME
from model import AskAI

router = APIRouter(tags=["Resume"])
myai = AskAI(model_=MODEL_NAME, inference_provider_="together")


@router.get("/resume", status_code=status.HTTP_200_OK, response_model=ResumeSuggestion)
def get_resume(prompt_obj: Prompt):
    final_prompt = PREPROCESSED_PROMPTS["resume"] + prompt_obj.content
    data = myai.prompt(final_prompt)["content"]

    if not data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request. Please try again..."
        )

    return {"response": data, "detail": "You've been answered successfully !"}
