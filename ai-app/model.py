from typing import Literal
from config import HF_TOKEN
import requests


class AskAI:
    def __init__(self, model_: str, inference_provider_: Literal["together", "featherless-ai", "fastest"]):
        """
        Initializes the class with the specified model and inference provider. Sets up the API URL
        and authorization headers for making requests. Prepares attributes used for responses and
        server communication.

        :param model_: The name of the model to be used for inference.
        :type model_: str
        :param inference_provider_: The inference provider being utilized. Must be one of
            "together", "featherless-ai", or "fastest".
        :type inference_provider_: Literal["together", "featherless-ai", "fastest"]
        """
        self.model_ = model_
        self.inf_pro_ = inference_provider_
        self.response_ = None

        self.API_URL = "https://router.huggingface.co/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {HF_TOKEN}",
        }

    def generate_payload(self, prompt_: str):
        """
        Constructs a payload for an inference API request that includes the user prompt,
        specified model, and inference provider. The payload is structured to fit the
        required API input format.

        :param prompt_: The prompt to be sent as the user input for the inference API.
        :return: A dictionary containing the structured payload for the inference request.
        """
        return {
            "messages": [
                {
                    "role": "user",
                    "content": prompt_
                }
            ],
            "model": f"{self.model_}:{self.inf_pro_}"
        }

    def query(self, payload_: dict):
        """
        Executes a POST request using the specified payload and retrieves a specific part
        of the response. This method interacts with an external API, sending the data as
        JSON and returning the first message choice from the response.

        :param payload_: Payload to be sent in the POST request body.
        :type payload_: dict
        :return: The first message choice from the API's response.
        :rtype: str
        """
        response_ = requests.post(self.API_URL, headers=self.headers, json=payload_)
        res = response_.json()
        return res["choices"][0]["message"]

    def prompt(self, prompt_: str):
        """
        Generates a payload based on the provided prompt, queries with the payload, and
        returns the response. The function utilizes the `generate_payload` method to
        create the payload and the `query` method to retrieve the response.

        :param prompt_: Input string used to construct the payload
        :type prompt_: str
        :return: The response generated after querying with the constructed payload
        :rtype: Any
        """
        payload = self.generate_payload(prompt_)
        self.response_ = self.query(payload)
        return self.response_
