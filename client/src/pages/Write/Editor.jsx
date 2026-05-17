import { Stars } from "../../assets/icons/Stars.jsx";
import { Thunder } from "../../assets/icons/Thunder.jsx";
import { CheckCorrect } from "../../assets/icons/CheckCorrect.jsx";
import { Safeguard } from "../../assets/icons/Safeguard.jsx";
import { Copy } from "../../assets/icons/Copy.jsx";
import { Delete } from "../../assets/icons/Delete.jsx";

const Editor = ({
    title,
    content,
    loading,
    onTitleChange,
    onContentChange,
    onSuggestTitle,
    onAutocomplete,
    onRephrase,
    onSave,
    onCopy,
    onDelete,
}) => {
    const prevent = (fn) => (e) => {
        e.preventDefault();
        fn();
    };

    return (
        <div className="editor">
            <header className="editor__header">
                <h1>éditeur</h1>
            </header>
            <section className="editor__main">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="editor__title">
                        <label htmlFor="title">Écrivez votre titre ici</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            placeholder="Un titre percutant ✨"
                        />
                        <button
                            type="button"
                            className="btn-primary"
                            disabled={loading}
                            onClick={prevent(onSuggestTitle)}
                        >
                            <Stars />
                            <span>Suggérer avec l&apos;IA</span>
                        </button>
                    </div>
                    <div className="editor__article">
                        <label htmlFor="article">Rédigez votre article ici</label>
                        <textarea
                            name="article"
                            id="article"
                            rows="35"
                            value={content}
                            onChange={(e) => onContentChange(e.target.value)}
                        />
                        <div>
                            <button type="button" className="btn-primary" disabled={loading} onClick={prevent(onAutocomplete)}>
                                <Thunder />
                                <span>Auto-completion</span>
                            </button>
                            <button type="button" className="btn-primary" disabled={loading} onClick={prevent(onRephrase)}>
                                <CheckCorrect />
                                <span>Auto-corrector</span>
                            </button>
                            <button type="button" className="btn-primary" disabled={loading} onClick={prevent(onRephrase)}>
                                <Stars />
                                <span>Reformuler avec l&apos;IA</span>
                            </button>
                            <button type="button" className="btn-primary" disabled={loading} onClick={prevent(onSave)}>
                                <Safeguard />
                                <span>Sauvegarder</span>
                            </button>
                            <button type="button" className="btn-primary" disabled={loading} onClick={prevent(onCopy)}>
                                <Copy />
                                <span>Terminer et Copier</span>
                            </button>
                            <button type="button" className="btn-primary" disabled={loading} onClick={prevent(onDelete)}>
                                <Delete />
                                <span>Supprimer</span>
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Editor;
