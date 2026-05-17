import { apiRequest } from "./api.js";

export const articlesApi = {
    list: () => apiRequest("/articles"),
    get: (id) => apiRequest(`/articles/${id}`),
    create: (body) => apiRequest("/articles", { method: "POST", body: JSON.stringify(body) }),
    update: (id, body) => apiRequest(`/articles/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    delete: (id) => apiRequest(`/articles/${id}`, { method: "DELETE" }),
};

export const resumesApi = {
    list: () => apiRequest("/resumes"),
    get: (id) => apiRequest(`/resumes/${id}`),
    create: (body) => apiRequest("/resumes", { method: "POST", body: JSON.stringify(body) }),
    update: (id, body) => apiRequest(`/resumes/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    delete: (id) => apiRequest(`/resumes/${id}`, { method: "DELETE" }),
};

/** Extrait une liste de suggestions depuis la réponse IA */
export function parseAiSuggestions(res) {
    const data = res?.result?.data ?? res?.result;
    if (Array.isArray(data)) return data.map(String);
    if (Array.isArray(data?.data)) return data.data.map(String);
    return [];
}

/** Extrait un texte unique (résumé, reformulation) */
export function parseAiText(res) {
    const data = res?.result?.data ?? res?.result;
    if (typeof data === "string") return data;
    if (typeof data?.data === "string") return data.data;
    if (data && typeof data === "object") return data.data ? String(data.data) : "";
    return "";
}

export const aiApi = {
    suggestTitle: (title, content) =>
        apiRequest("/ai/title", { method: "POST", body: JSON.stringify({ title, content }) }),
    autocomplete: (content) =>
        apiRequest("/ai/autocompletion", { method: "POST", body: JSON.stringify({ content }) }),
    rephrase: (content) =>
        apiRequest("/ai/rephrase", { method: "POST", body: JSON.stringify({ content }) }),
    summarize: (content) =>
        apiRequest("/ai/resume", { method: "POST", body: JSON.stringify({ content }) }),
};
