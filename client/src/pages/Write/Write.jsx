import "../../styles/Write.css";
import Editor from "./Editor.jsx";
import GlimpseEditor from "./GlimpseEditor.jsx";
import useAuth from "../../hooks/useAuth.js";
import Unauthorize from "../../components/Unauthorize.jsx";

function Write() {
    const {isLoggedIn} = useAuth();

    return isLoggedIn ? (
        <main className={"main__container"}>
            <Editor />
            <GlimpseEditor title={null} content={null} />
        </main>
    ) : <Unauthorize />
}

export default Write;
