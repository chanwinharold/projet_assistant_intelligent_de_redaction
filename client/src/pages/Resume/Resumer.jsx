import {Stars} from "../../assets/icons/Stars.jsx";

const Resumer = () => {
    return (
        <div className={"editor"}>
            <header className={"editor__header"}>
                <h1>éditeur</h1>
            </header>
            <section className="resumer__main">
                <form className={"resumer__form"}>
                    <label htmlFor={"resume"}>Copiez puis coller votre texte</label>
                    <button type={"submit"} className={"btn-primary"}>
                        <Stars />
                        <span>Résumer avec l’IA</span>
                    </button>
                    <textarea name="resume" id="resume" rows="20" placeholder={"collez ici..."}></textarea>
                </form>
            </section>
        </div>
    );
};

export default Resumer;