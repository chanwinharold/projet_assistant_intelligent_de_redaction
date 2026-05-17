import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api.js";
import { notifyError } from "../../services/toast.js";
import PasswordInput from "../../components/PasswordInput.jsx";
import "../../styles/Login.css";

const ResetPassword = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token") || "";
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) notifyError("Lien invalide.");
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) return notifyError("Les mots de passe ne correspondent pas.");
        if (password.length < 6) return notifyError("6 caractères minimum.");
        setLoading(true);
        try {
            await apiRequest("/auth/reset-password", {
                method: "POST",
                body: JSON.stringify({ token, password }),
            });
            navigate("/login", { state: { message: "Mot de passe mis à jour. Connectez-vous." } });
        } catch (err) {
            notifyError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <Link to="/forgot-password">Demander un nouveau lien</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Nouveau mot de passe</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nouveau mot de passe</label>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                    </div>
                    <div className="form-group">
                        <label>Confirmer</label>
                        <PasswordInput value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={6} />
                    </div>
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        Enregistrer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;