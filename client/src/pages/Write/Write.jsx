import "../../styles/Write.css";
import Editor from "./Editor.jsx";
import GlimpseEditor from "./GlimpseEditor.jsx";

function Write() {
    return (
        <main className={"main__container"}>
            <Editor />
            <GlimpseEditor title={null} content={null} />
        </main>
    );
}

export default Write;
