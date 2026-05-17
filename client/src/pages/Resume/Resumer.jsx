import { Stars } from "../../assets/icons/Stars.jsx";

const Resumer = ({ sourceText, loading, onSourceChange, onSummarize }) => (
    <div className="editor">
        <header className="editor__header">
            <h1>source</h1>
        </header>
        <section className="resumer__main">
            <form className="resumer__form" onSubmit={(e) => { e.preventDefault(); onSummarize(); }}>
                <label htmlFor="resume">Copiez puis collez votre texte</label>
                <button type="submit" className="btn-primary" disabled={loading}>
                    <Stars />
                    <span>{loading ? "Analyse…" : "Résumer avec l'IA"}</span>
                </button>
                <textarea
                    name="resume"
                    id="resume"
                    rows="20"
                    placeholder="collez ici..."
                    value={sourceText}
                    onChange={(e) => onSourceChange(e.target.value)}
                />
            </form>
        </section>
    </div>
);

export default Resumer;
