from fastapi import APIRouter, status, HTTPException
from schemes.prompt import Prompt
from schemes.resume import ResumeSuggestion
from config import PREPROCESSED_PROMPTS, MODEL_NAME
from model import AskAI, AiServiceError
from routes.edit import _parse_json_content

router = APIRouter(tags=["Resume"])

try:
    myai = AskAI(model_=MODEL_NAME, inference_provider_="together")
except AiServiceError as e:
    myai = None
    _init_error = str(e)


def _parse_resume(prompt_obj: Prompt):
    if myai is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=_init_error)
    final_prompt = PREPROCESSED_PROMPTS["resume"] + prompt_obj.content
    try:
        response = myai.prompt(final_prompt)["content"]
    except AiServiceError as e:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(e))
    if not response:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Réponse vide.")
    return {"result": _parse_json_content(response), "detail": "You've been answered successfully !"}


@router.post("/resume", status_code=status.HTTP_200_OK, response_model=ResumeSuggestion)
def post_resume(prompt_obj: Prompt):
    try:
        return _parse_resume(prompt_obj)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur IA : {e}")
