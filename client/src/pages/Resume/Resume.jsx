import React from 'react';
import "../../styles/Resume.css";
import Resumer from "./Resumer.jsx";
import GlimpseResumer from "./GlimpseResumer.jsx";
import useAuth from "../../hooks/useAuth.js";
import Unauthorize from "../../components/Unauthorize.jsx";

function Resume() {
    const {isLoggedIn} = useAuth();
    return isLoggedIn ? (
        <main className={"main__container"}>
            <Resumer />
            <GlimpseResumer content={null} />
        </main>
    ) : <Unauthorize />
}

export default Resume;