import {Stars} from "../../assets/icons/Stars.jsx";
import {Thunder} from "../../assets/icons/Thunder.jsx";
import {CheckCorrect} from "../../assets/icons/CheckCorrect.jsx";
import {Safeguard} from "../../assets/icons/Safeguard.jsx";
import {Copy} from "../../assets/icons/Copy.jsx";
import {Delete} from "../../assets/icons/Delete.jsx";


const Editor = () => {
    return (
        <div className={"editor"}>
            <header className={"editor__header"}>
                <h1>éditeur</h1>
            </header>
            <section className={"editor__main"}>
                <form>
                    <div className={"editor__title"}>
                        <label htmlFor="title">Écrivez votre titre ici</label>
                        <input id={"title"} type="text" name={"title"} placeholder={"Un titre percutant ✨"} />
                        <button type={"submit"} className={"btn-primary"}>
                            <Stars />
                            <span>Suggérer avec l’IA</span>
                        </button>
                    </div>
                    <div className="editor__article">
                        <label htmlFor="article">Rédigez votre article ici</label>
                        <textarea name="article" id="article" rows="35"></textarea>

                        <div>
                            <button type={"submit"} className={"btn-primary"}>
                                <Thunder />
                                <span>Auto-completion</span>
                            </button>
                            <button type={"submit"} className={"btn-primary"}>
                                <CheckCorrect />
                                <span>Auto-corrector</span>
                            </button>
                            <button type={"submit"} className={"btn-primary"}>
                                <Stars />
                                <span>Reformuler avec l’IA</span>
                            </button>
                            <button type={"submit"} className={"btn-primary"}>
                                <Safeguard />
                                <span>Sauvegarder</span>
                            </button>
                            <button type={"submit"} className={"btn-primary"}>
                                <Copy />
                                <span>Terminer et Copier</span>
                            </button>
                            <button type={"submit"} className={"btn-primary"}>
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