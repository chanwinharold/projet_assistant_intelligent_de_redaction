import { Safeguard } from "../../assets/icons/Safeguard.jsx";
import { Copy } from "../../assets/icons/Copy.jsx";
import { Delete } from "../../assets/icons/Delete.jsx";

const GlimpseResumer = ({ title, content, loading, onTitleChange, onSave, onCopy, onDelete }) => {
    const prevent = (fn) => (e) => {
        e.preventDefault();
        fn();
    };

    return (
        <div className="glimpse">
            <header className="editor__header">
                <h2>résumé</h2>
            </header>
            <section className="editor__main resumer__grid">
                <input
                    type="text"
                    className="resume-title-input"
                    placeholder="Titre du résumé"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
                <p>{content || "Le résumé généré apparaîtra ici…"}</p>
                <div className="btn__container">
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
            </section>
        </div>
    );
};

export default GlimpseResumer;
