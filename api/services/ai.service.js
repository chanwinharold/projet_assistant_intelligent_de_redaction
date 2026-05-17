const AI_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

function extractAiError(data, status) {
    if (!data) return `Service IA indisponible (HTTP ${status})`;
    if (typeof data === "string") return data;
    if (typeof data.error === "string") return data.error;
    if (typeof data.message === "string") return data.message;
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) {
        return data.detail.map((e) => e.msg || e.message || String(e)).join(", ");
    }
    if (data.detail && typeof data.detail === "object") {
        return data.detail.message || JSON.stringify(data.detail);
    }
    return `Erreur du service IA (HTTP ${status})`;
}

async function callAi(path, body) {
    let response;
    try {
        response = await fetch(`${AI_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(120000),
        });
    } catch (err) {
        if (err.name === "TimeoutError") {
            throw new Error("Le service IA met trop de temps à répondre. Réessayez.");
        }
        throw new Error(
            "Service IA injoignable. Lancez ai-app : python -m uvicorn app:app --port 8000"
        );
    }

    const text = await response.text();
    let data = {};
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = { detail: text };
        }
    }

    if (!response.ok) {
        throw new Error(extractAiError(data, response.status));
    }
    return data;
}

exports.suggestTitle = (title, content) =>
    callAi("/edit/title", { title: title || "", content: content || "" });

exports.autocomplete = (content) =>
    callAi("/edit/autocompletion", { content: content || "" });

exports.rephrase = (content) =>
    callAi("/edit/rephrase", { content: content || "" });

exports.summarize = (content) =>
    callAi("/resume", { content: content || "" });
