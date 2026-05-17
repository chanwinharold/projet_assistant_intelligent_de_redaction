import { formatPayload } from "../utils/errorMessage.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function parseApiResponseError(data, status) {
    if (typeof data?.error === "string") return data.error;
    if (typeof data?.message === "string") return data.message;
    if (data?.detail) return formatPayload(data.detail);
    return `Erreur serveur (${status})`;
}

export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1");

    let response;
    try {
        response = await fetch(url, {
            credentials: "include",
            headers: { "Content-Type": "application/json", ...options.headers },
            ...options,
        });
    } catch {
        throw new Error("Impossible de joindre le serveur. Vérifiez que l'API tourne sur le port 3000.");
    }

    const text = await response.text();
    let data = {};
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = { error: text };
        }
    }

    if (!response.ok) {
        const err = new Error(parseApiResponseError(data, response.status));
        err.code = data.code;
        err.status = response.status;
        throw err;
    }
    return data;
};

export const apiUpload = async (endpoint, formData) => {
    const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1");

    const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    if (!response.ok) {
        const errText = await response.text();
        let message = errText || "Erreur upload";
        try {
            const data = JSON.parse(errText);
            message = parseApiResponseError(data, response.status);
        } catch {
            /* keep text */
        }
        throw new Error(message);
    }

    return response.text();
};
