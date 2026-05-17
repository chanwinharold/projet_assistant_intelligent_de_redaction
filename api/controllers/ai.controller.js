const ai = require("../services/ai.service");

function sendAiError(res, err) {
    const message = err?.message || String(err) || "Erreur du service IA";
    const lower = message.toLowerCase();
    const status =
        lower.includes("injoignable") || lower.includes("hf_token") || lower.includes("503")
            ? 503
            : 502;
    res.status(status).json({ error: message });
}

exports.suggestTitle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const data = await ai.suggestTitle(title, content);
        res.json(data);
    } catch (err) {
        sendAiError(res, err);
    }
};

exports.autocomplete = async (req, res) => {
    try {
        const data = await ai.autocomplete(req.body.content);
        res.json(data);
    } catch (err) {
        sendAiError(res, err);
    }
};

exports.rephrase = async (req, res) => {
    try {
        const data = await ai.rephrase(req.body.content);
        res.json(data);
    } catch (err) {
        sendAiError(res, err);
    }
};

exports.summarize = async (req, res) => {
    try {
        const data = await ai.summarize(req.body.content);
        res.json(data);
    } catch (err) {
        sendAiError(res, err);
    }
};
