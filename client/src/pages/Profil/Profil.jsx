import React from 'react';
import "../../styles/Profil.css";
import useAuth from "../../hooks/useAuth.js";
import Unauthorize from "../../components/Unauthorize.jsx";

function Profil() {
    const {isLoggedIn} = useAuth();

    return isLoggedIn ? (
        <main>
            Profil
        </main>
    ) : <Unauthorize />
}

export default Profil;