import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/Write.css";
import Editor from "./Editor.jsx";
import GlimpseEditor from "./GlimpseEditor.jsx";
import useAuth from "../../hooks/useAuth.js";
import Unauthorize from "../../components/Unauthorize.jsx";
import { articlesApi, aiApi, parseAiSuggestions, parseAiText } from "../../services/contentApi.js";
import { notifyError, notifySuccess } from "../../services/toast.js";
import { getErrorMessage } from "../../utils/errorMessage.js";

function Write() {
    const { isLoggedIn } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [articleId, setArticleId] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [glimpseMode, setGlimpseMode] = useState("preview");
    const [suggestionType, setSuggestionType] = useState("title");
    const [loading, setLoading] = useState(false);

    const loadArticle = useCallback(async (id) => {
        try {
            const res = await articlesApi.get(id);
            if (res.data) {
                setTitle(res.data.title || "");
                setContent(res.data.content || "");
                setArticleId(res.data.id_article);
            }
        } catch (err) {
            notifyError(getErrorMessage(err));
        }
    }, []);

    useEffect(() => {
        const id = searchParams.get("id");
        if (id) loadArticle(id);
        else {
            setTitle("");
            setContent("");
            setArticleId(null);
        }
    }, [searchParams, loadArticle]);

    const persistArticle = async () => {
        const payload = { title: title || "Sans titre", content: content || "" };
        if (articleId) {
            await articlesApi.update(articleId, payload);
            return articleId;
        }
        const res = await articlesApi.create(payload);
        const newId = res.data.id_article;
        setArticleId(newId);
        navigate(`/write?id=${newId}`, { replace: true });
        return newId;
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await persistArticle();
            notifySuccess("Article enregistré.");
            setGlimpseMode("preview");
        } catch (err) {
            notifyError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!articleId) {
            setTitle("");
            setContent("");
            return;
        }
        if (!window.confirm("Supprimer cet article ?")) return;
        setLoading(true);
        try {
            await articlesApi.delete(articleId);
            navigate("/write", { replace: true });
            setArticleId(null);
            setTitle("");
            setContent("");
            notifySuccess("Article supprimé.");
        } catch (err) {
            notifyError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`${title}\n\n${content}`);
        notifySuccess("Texte copié dans le presse-papiers.");
    };

    const handleSuggestTitle = async () => {
        if (!content.trim()) return notifyError("Rédigez du contenu avant de suggérer un titre.");
        setLoading(true);
        try {
            const res = await aiApi.suggestTitle(title, content);
            const list = parseAiSuggestions(res);
            if (!list.length) {
                notifyError("Aucune suggestion reçue. Réessayez.");
                return;
            }
            setSuggestions(list);
            setSuggestionType("title");
            setGlimpseMode("suggestions");
        } catch (err) {
            notifyError(getErrorMessage(err, "Erreur lors de la suggestion de titre."));
        } finally {
            setLoading(false);
        }
    };

    const handleAutocomplete = async () => {
        if (!content.trim()) return notifyError("Rédigez du contenu pour l'autocomplétion.");
        setLoading(true);
        try {
            const res = await aiApi.autocomplete(content);
            const list = parseAiSuggestions(res);
            if (!list.length) {
                notifyError("Aucune suggestion reçue. Réessayez.");
                return;
            }
            setSuggestions(list);
            setSuggestionType("completion");
            setGlimpseMode("suggestions");
        } catch (err) {
            notifyError(getErrorMessage(err, "Erreur lors de l'autocomplétion."));
        } finally {
            setLoading(false);
        }
    };

    const handleRephrase = async () => {
        if (!content.trim()) return notifyError("Rédigez du contenu à reformuler.");
        setLoading(true);
        try {
            const res = await aiApi.rephrase(content);
            const text = parseAiText(res);
            if (!text) {
                notifyError("Aucun texte reformulé reçu. Réessayez.");
                return;
            }
            setContent(text);
            notifySuccess("Texte reformulé.");
            setGlimpseMode("preview");
        } catch (err) {
            notifyError(getErrorMessage(err, "Erreur lors de la reformulation."));
        } finally {
            setLoading(false);
        }
    };

    const pickSuggestion = (value, type) => {
        if (type === "title") setTitle(value);
        else setContent((prev) => (prev ? `${prev} ${value}` : value));
        setSuggestions([]);
        setGlimpseMode("preview");
    };

    if (!isLoggedIn) return <Unauthorize />;

    return (
        <main className="main__container">
            <Editor
                title={title}
                content={content}
                loading={loading}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onSuggestTitle={handleSuggestTitle}
                onAutocomplete={handleAutocomplete}
                onRephrase={handleRephrase}
                onSave={handleSave}
                onCopy={handleCopy}
                onDelete={handleDelete}
            />
            <GlimpseEditor
                title={title}
                content={content}
                mode={glimpseMode}
                suggestions={suggestions}
                suggestionType={suggestionType}
                onPickSuggestion={pickSuggestion}
            />
        </main>
    );
}

export default Write;
