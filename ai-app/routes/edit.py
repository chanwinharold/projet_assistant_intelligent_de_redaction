from fastapi import status, HTTPException, APIRouter
from model import AskAI, AiServiceError
from config import PREPROCESSED_PROMPTS, MODEL_NAME
from schemes.prompt import Prompt, PromptTitle
from schemes.edit import EditSuggestion, EditSuggestions
import json
import re

router = APIRouter(prefix="/edit", tags=["Edit"])

try:
    myai = AskAI(model_=MODEL_NAME, inference_provider_="together")
except AiServiceError as e:
    myai = None
    _init_error = str(e)


def _ensure_ai():
    if myai is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=_init_error)


def _parse_json_content(content: str):
    text = (content or "").strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Réponse IA illisible. Réessayez.",
        )


def _run_ai(handler):
    _ensure_ai()
    try:
        return handler()
    except HTTPException:
        raise
    except AiServiceError as e:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur IA : {e}",
        )


def _parse_title(prompt_obj: PromptTitle):
    final_prompt = PREPROCESSED_PROMPTS["suggest_title"] + (prompt_obj.title or " ") + prompt_obj.content
    response = myai.prompt(final_prompt)["content"]
    if not response:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Réponse vide.")
    return {"result": _parse_json_content(response), "detail": "Title suggested successfully !"}


def _parse_autocomplete(prompt_obj: Prompt):
    final_prompt = PREPROCESSED_PROMPTS["autocomplete"] + prompt_obj.content
    response = myai.prompt(final_prompt)["content"]
    if not response:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Réponse vide.")
    return {"result": _parse_json_content(response), "detail": "Autocompleted successfully !"}


def _parse_rephrase(prompt_obj: Prompt):
    final_prompt = PREPROCESSED_PROMPTS["rephrase"] + prompt_obj.content
    response = myai.prompt(final_prompt)["content"]
    if not response:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Réponse vide.")
    return {"result": _parse_json_content(response), "detail": "Text rephrased successfully !"}


@router.post("/title", status_code=status.HTTP_200_OK, response_model=EditSuggestions)
def post_title(prompt_obj: PromptTitle):
    return _run_ai(lambda: _parse_title(prompt_obj))


@router.post("/autocompletion", status_code=status.HTTP_200_OK, response_model=EditSuggestions)
def post_autocomplete(prompt_obj: Prompt):
    return _run_ai(lambda: _parse_autocomplete(prompt_obj))


@router.post("/rephrase", status_code=status.HTTP_200_OK, response_model=EditSuggestion)
def post_rephrase(prompt_obj: Prompt):
    return _run_ai(lambda: _parse_rephrase(prompt_obj))
