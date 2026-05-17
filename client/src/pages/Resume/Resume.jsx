import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/Resume.css";
import Resumer from "./Resumer.jsx";
import GlimpseResumer from "./GlimpseResumer.jsx";
import useAuth from "../../hooks/useAuth.js";
import Unauthorize from "../../components/Unauthorize.jsx";
import { resumesApi, aiApi, parseAiText } from "../../services/contentApi.js";
import { notifyError, notifySuccess } from "../../services/toast.js";
import { getErrorMessage } from "../../utils/errorMessage.js";

function Resume() {
    const { isLoggedIn } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [sourceText, setSourceText] = useState("");
    const [summary, setSummary] = useState("");
    const [title, setTitle] = useState("");
    const [resumeId, setResumeId] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadResume = useCallback(async (id) => {
        const res = await resumesApi.get(id);
        if (res.data) {
            setTitle(res.data.title || "");
            setSummary(res.data.content || "");
            setSourceText("");
            setResumeId(res.data.id_resume);
        }
    }, []);

    useEffect(() => {
        const id = searchParams.get("id");
        if (id) loadResume(id).catch((e) => notifyError(getErrorMessage(e)));
        else {
            setSourceText("");
            setSummary("");
            setTitle("");
            setResumeId(null);
        }
    }, [searchParams, loadResume]);

    const handleSummarize = async () => {
        if (!sourceText.trim()) return notifyError("Collez un texte à résumer.");
        setLoading(true);
        try {
            const res = await aiApi.summarize(sourceText);
            const text = parseAiText(res);
            if (!text) {
                notifyError("Aucun résumé reçu. Réessayez.");
                return;
            }
            setSummary(text);
            if (!title) setTitle(`Résumé — ${new Date().toLocaleDateString("fr-FR")}`);
            notifySuccess("Résumé généré.");
        } catch (err) {
            notifyError(getErrorMessage(err, "Erreur lors du résumé IA."));
        } finally {
            setLoading(false);
        }
    };

    const persistResume = async () => {
        const payload = {
            title: title || `Résumé — ${new Date().toLocaleDateString("fr-FR")}`,
            content: summary || "",
        };
        if (resumeId) {
            await resumesApi.update(resumeId, payload);
            return resumeId;
        }
        const res = await resumesApi.create(payload);
        const newId = res.data.id_resume;
        setResumeId(newId);
        navigate(`/resume?id=${newId}`, { replace: true });
        return newId;
    };

    const handleSave = async () => {
        if (!summary.trim()) return notifyError("Aucun résumé à enregistrer.");
        setLoading(true);
        try {
            await persistResume();
            notifySuccess("Résumé enregistré.");
        } catch (err) {
            notifyError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!resumeId) {
            setSourceText("");
            setSummary("");
            setTitle("");
            return;
        }
        if (!window.confirm("Supprimer ce résumé ?")) return;
        setLoading(true);
        try {
            await resumesApi.delete(resumeId);
            navigate("/resume", { replace: true });
            setResumeId(null);
            setSummary("");
            setTitle("");
            notifySuccess("Résumé supprimé.");
        } catch (err) {
            notifyError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(summary);
        notifySuccess("Résumé copié.");
    };

    if (!isLoggedIn) return <Unauthorize />;

    return (
        <main className="main__container">
            <Resumer
                sourceText={sourceText}
                loading={loading}
                onSourceChange={setSourceText}
                onSummarize={handleSummarize}
            />
            <GlimpseResumer
                title={title}
                content={summary}
                loading={loading}
                onTitleChange={setTitle}
                onSave={handleSave}
                onCopy={handleCopy}
                onDelete={handleDelete}
            />
        </main>
    );
}

export default Resume;
