import "../../styles/Write.css";
import Editor from "./Editor.jsx";
import GlimpseEditor from "./GlimpseEditor.jsx";
import useAuthRedirection from "../../hooks/useAuthRedirection.js";

function Write() {
    useAuthRedirection();

    return (
        <main className={"main__container"}>
            <Editor />
            <GlimpseEditor title={null} content={null} />
        </main>
    );
}

export default Write;
