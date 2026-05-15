import React from 'react';
import "../../styles/Resume.css";
import Resumer from "./Resumer.jsx";
import GlimpseResumer from "./GlimpseResumer.jsx";
import useAuthRedirection from "../../hooks/useAuthRedirection.js";

function Resume() {
    useAuthRedirection();
    return (
        <main className={"main__container"}>
            <Resumer />
            <GlimpseResumer content={null} />
        </main>
    );
}

export default Resume;