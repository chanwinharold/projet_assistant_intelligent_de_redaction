import "../../styles/Write.css";
import React from 'react';
import {Stars} from "../../assets/icons/Stars.jsx";
import {Thunder} from "../../assets/icons/Thunder.jsx";
import {CheckCorrect} from "../../assets/icons/CheckCorrect.jsx";
import {Safeguard} from "../../assets/icons/Safeguard.jsx";
import {Copy} from "../../assets/icons/Copy.jsx";
import {Delete} from "../../assets/icons/Delete.jsx";


function Write() {
    return (
        <main className={"main__container"}>
            <Editor />
            <GlimpseEditor title={null} content={null} />
        </main>
    );
}

export default Write;


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

const GlimpseEditor = ({title, content}) => {

    return (
        <div className={"glimpse"}>
            <header className={"editor__header"}>
                <h2>aperçu</h2>
            </header>
            <section className={"editor__main"}>
                <strong>{title ? (
                    title
                ):(`
                    Un titre percutant ✨
                `)}</strong>
                <p>{content ? (
                    content
                ):(`
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Praesentium quasi, rerum? At ex id illum necessitatibus 
                    saepe veniam voluptate. Facilis placeat quos reiciendis 
                    sed soluta? Accusamus hic illo in totam.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Praesentium quasi, rerum? At ex id illum necessitatibus 
                    saepe veniam voluptate. Facilis placeat quos reiciendis 
                    sed soluta? Accusamus hic illo in totam. 
                `)}</p>
            </section>
        </div>
    )
}
