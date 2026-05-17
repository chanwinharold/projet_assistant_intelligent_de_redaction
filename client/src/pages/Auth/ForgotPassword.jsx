import { Link } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../../services/api.js";
import { notifyError, notifyInfo } from "../../services/toast.js";
import "../../styles/Login.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiRequest("/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
            });
            notifyInfo(res.message);
        } catch (err) {
            notifyError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Mot de passe oublié</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        Envoyer le lien
                    </button>
                </form>
                <p className="switch-auth">
                    <Link to="/login">Retour à la connexion</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
