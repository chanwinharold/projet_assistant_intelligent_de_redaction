from fastapi import status, HTTPException, APIRouter
from model import AskAI
from config import PREPROCESSED_PROMPTS, MODEL_NAME
from schemes.prompt import Prompt, PromptTitle
from schemes.edit import EditSuggestion, EditSuggestions

router = APIRouter(prefix="/edit", tags=["Editor"])
myai = AskAI(model_=MODEL_NAME, inference_provider_="together")


@router.get("/title", status_code=status.HTTP_200_OK, response_model=EditSuggestions)
def get_title(prompt_obj: PromptTitle):
    final_prompt: str = PREPROCESSED_PROMPTS["suggest_title"] + (prompt_obj.title or " ") + prompt_obj.content
    data: str = myai.prompt(final_prompt)["content"]

    if not data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request. Please try again..."
        )

    propositions_list= data.split('%')[:3]
    return {"response": propositions_list, "detail": "You've been answered successfully !"}


@router.get("/autocompletion", status_code=status.HTTP_200_OK, response_model=EditSuggestions)
def get_answer(prompt_obj: Prompt):
    final_prompt = PREPROCESSED_PROMPTS["autocomplete"] + prompt_obj.content
    data: str = myai.prompt(final_prompt)["content"]

    if not data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request. Please try again..."
        )

    propositions_list = data.split('%')[:3]
    return {"response": propositions_list, "detail": "You've been answered successfully !"}


@router.get("/rephrase", status_code=status.HTTP_200_OK, response_model=EditSuggestion)
def get_rephrase(prompt_obj: Prompt):
    final_prompt = PREPROCESSED_PROMPTS["rephrase"] + prompt_obj.content
    data: str = myai.prompt(final_prompt)["content"]

    if not data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request. Please try again..."
        )

    return {"response": data, "detail": "You've been answered successfully !"}