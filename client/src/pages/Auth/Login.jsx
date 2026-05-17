import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api.js";
import useAuth from "../../hooks/useAuth.js";
import { notifyError, notifyInfo, notifySuccess } from "../../services/toast.js";
import PasswordInput from "../../components/PasswordInput.jsx";
import "../../styles/Login.css";

const Login = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");
    const [password, setPassword] = useState("");
    const [needsVerification, setNeedsVerification] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.message) notifyInfo(location.state.message);
    }, [location.state?.message]);

    const handleResend = async () => {
        if (!email) return notifyError("Indiquez votre email.");
        try {
            await apiRequest("/auth/resend-verification", {
                method: "POST",
                body: JSON.stringify({ email }),
            });
            notifySuccess("Email de confirmation renvoyé.");
        } catch (err) {
            notifyError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNeedsVerification(false);
        setLoading(true);
        try {
            const response = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            login(response.data);
            notifySuccess("Connexion réussie.");
            navigate("/write");
        } catch (err) {
            notifyError(err.message);
            setNeedsVerification(
                err.code === "EMAIL_NOT_VERIFIED" || err.message?.toLowerCase().includes("confirm")
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <Link to="/" className="logo-link">
                        <img src="/images/logo.png" alt="Logo" className="logo-img" />
                    </Link>
                    <h1 className="auth-title">SE CONNECTER</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
                    </div>
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>
                {needsVerification && (
                    <p className="switch-auth">
                        <button type="button" className="link-btn" onClick={handleResend}>
                            Renvoyer l&apos;email de confirmation
                        </button>
                    </p>
                )}
                <p className="switch-auth"><Link to="/forgot-password">Mot de passe oublié ?</Link></p>
                <p className="switch-auth">Pas encore de compte ? <Link to="/register">S&apos;inscrire</Link></p>
            </div>
        </div>
    );
};

export default Login;