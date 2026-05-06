import React from 'react';
import {apiRequest} from "../services/api.js";
import {Link, useNavigate} from "react-router-dom";

function Verify() {
    const Navigate = useNavigate()
    const params = new URLSearchParams(window.location.search)
    const handleVerify = async (e) => {
        try {
            e.preventDefault()
            await apiRequest(`/auth/verify?token=${params.get("token")}`, {method: "POST"})
            Navigate("/")
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <form>
            <h1>Vérification</h1>
            <button type={"submit"} onClick={handleVerify}>Cliquez ici pour continuer</button>
        </form>
    );
}

export default Verify;