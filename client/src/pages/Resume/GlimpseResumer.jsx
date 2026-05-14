import {Safeguard} from "../../assets/icons/Safeguard.jsx";
import {Copy} from "../../assets/icons/Copy.jsx";
import {Delete} from "../../assets/icons/Delete.jsx";

const GlimpseResumer = ({content}) => {
    return (
        <div className={"glimpse"}>
            <header className={"editor__header"}>
                <h2>résumé</h2>
            </header>
            <section className={"editor__main resumer__grid"}>
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

                <div className={"btn__container"}>
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
            </section>
        </div>
    );
};

export default GlimpseResumer;