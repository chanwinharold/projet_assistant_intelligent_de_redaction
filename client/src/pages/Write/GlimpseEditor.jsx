const GlimpseEditor = ({ title, content, mode, suggestions, suggestionType, onPickSuggestion }) => {
    return (
        <div className="glimpse">
            <header className="editor__header">
                <h2>{mode === "suggestions" ? "suggestions IA" : "aperçu"}</h2>
            </header>
            <section className="editor__main">
                {mode === "suggestions" && suggestions?.length > 0 ? (
                    <ul className="glimpse-suggestions">
                        {suggestions.map((item, index) => (
                            <li key={index}>
                                <button type="button" className="glimpse-suggestion-btn" onClick={() => onPickSuggestion(item, suggestionType)}>
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        <strong>{title || "Un titre percutant ✨"}</strong>
                        <p>{content || "Votre article apparaîtra ici…"}</p>
                    </>
                )}
            </section>
        </div>
    );
};

export default GlimpseEditor;
