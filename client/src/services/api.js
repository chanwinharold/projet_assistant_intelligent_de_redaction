// services/api.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiRequest = async (endpoint, options = {}) => {
    // On s'assure qu'il n'y a qu'un seul slash entre l'URL et endpoint
    const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1");

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || data.message || "Erreur interne du serveur !");
    return data;
};

export const apiUpload = async (endpoint, formData) => {
    const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1");

    const response = await fetch(url, {
        method: "POST",
        body: formData,       // ← pas de Content-Type, le navigateur le gère
        credentials: "include"
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Erreur upload");
    }

    return response.text(); // ← filename renvoyé par le backend
};