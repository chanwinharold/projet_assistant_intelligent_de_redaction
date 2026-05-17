from typing import Literal
import os
import requests
from config import HF_TOKEN

HF_API_URL = "https://router.huggingface.co/v1/chat/completions"


class AiServiceError(Exception):
    pass


class AskAI:
    def __init__(self, model_: str, inference_provider_: Literal["together", "featherless-ai", "fastest"]):
        self.model_ = model_
        self.inf_pro_ = inference_provider_

        if not HF_TOKEN or not str(HF_TOKEN).startswith("hf_"):
            raise AiServiceError(
                "HF_TOKEN manquant ou invalide dans ai-app/.env (token Hugging Face requis)."
            )

        self.headers = {
            "Authorization": f"Bearer {HF_TOKEN}",
            "Content-Type": "application/json",
        }

    def generate_payload(self, prompt_: str):
        return {
            "messages": [{"role": "user", "content": prompt_}],
            "model": f"{self.model_}:{self.inf_pro_}",
            "max_tokens": 1024,
            "temperature": 0.7,
        }

    def query(self, payload_: dict):
        response = requests.post(
            HF_API_URL,
            headers=self.headers,
            json=payload_,
            timeout=120,
        )

        try:
            res = response.json()
        except ValueError:
            raise AiServiceError(f"Réponse IA illisible (HTTP {response.status_code}).")

        if response.status_code == 401:
            raise AiServiceError(
                "Token Hugging Face invalide. Regénérez un token sur huggingface.co/settings/tokens."
            )

        if response.status_code != 200:
            err = res.get("error") if isinstance(res, dict) else res
            if isinstance(err, dict):
                err = err.get("message") or str(err)
            raise AiServiceError(str(err) or f"Erreur Hugging Face (HTTP {response.status_code}).")

        choices = res.get("choices") if isinstance(res, dict) else None
        if not choices:
            raise AiServiceError("Réponse IA vide. Vérifiez le modèle et votre quota Hugging Face.")

        message = choices[0].get("message", {})
        if not message.get("content"):
            raise AiServiceError("Le modèle n'a renvoyé aucun texte.")
        return message

    def prompt(self, prompt_: str):
        payload = self.generate_payload(prompt_)
        return self.query(payload)
