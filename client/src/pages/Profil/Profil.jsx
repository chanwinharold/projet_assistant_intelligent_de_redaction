import React from 'react';
import "../../styles/Profil.css";
import useAuthRedirection from "../../hooks/useAuthRedirection.js";

function Profil() {
    useAuthRedirection();

    return (
        <main>
            Profil
        </main>
    );
}

export default Profil;