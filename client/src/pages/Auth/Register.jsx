import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../../services/api.js";
import useAuth from "../../hooks/useAuth.js";
import { notifyError, notifyInfo } from "../../services/toast.js";
import PasswordInput from "../../components/PasswordInput.jsx";
import "../../styles/Register.css";

const Register = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!prenom.trim() || prenom.trim().length < 2) {
            notifyError("Le prénom doit contenir au moins 2 caractères.");
            return;
        }
        if (!nom.trim() || nom.trim().length < 2) {
            notifyError("Le nom doit contenir au moins 2 caractères.");
            return;
        }
        if (password !== confirmPassword) {
            notifyError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (password.length < 6) {
            notifyError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        setLoading(true);
        try {
            const response = await apiRequest("/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    prenom: prenom.trim(),
                    nom: nom.trim(),
                    email,
                    password,
                }),
            });

            if (response.data?.isVerified) {
                login(response.data);
                navigate("/write");
            } else {
                navigate(`/verify?email=${encodeURIComponent(email)}`, { replace: true });
                notifyInfo(response.message, "register-verify-info");
            }
        } catch (err) {
            notifyError(err.message);
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
                    <h1 className="auth-title">S&apos;INSCRIRE</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Prénom</label>
                            <input
                                type="text"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                autoComplete="given-name"
                                required
                                minLength={2}
                                maxLength={50}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nom</label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                autoComplete="family-name"
                                required
                                minLength={2}
                                maxLength={50}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required minLength={6} />
                    </div>
                    <div className="form-group">
                        <label>Confirmer le mot de passe</label>
                        <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required minLength={6} />
                    </div>
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? "Inscription..." : "S'inscrire"}
                    </button>
                </form>
                <p className="switch-auth">Déjà un compte ? <Link to="/login">Se connecter</Link></p>
            </div>
        </div>
    );
};

export default Register;
