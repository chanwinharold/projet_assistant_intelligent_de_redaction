import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../services/api.js";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { notifyError, notifyInfo, notifySuccess } from "../services/toast.js";
import { getErrorMessage } from "../utils/errorMessage.js";
import "../styles/Login.css";

function Verify() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const { login } = useAuth();
    const effectRan = useRef(false);

    const [status, setStatus] = useState(token ? "loading" : "pending");
    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [resendLoading, setResendLoading] = useState(false);
    const [showResend, setShowResend] = useState(!token);

    useEffect(() => {
        if (effectRan.current) return;
        effectRan.current = true;

        if (!token) {
            setStatus("pending");
            setShowResend(true);
            if (searchParams.get("email")) {
                notifyInfo(
                    "Consultez votre boîte mail ou renvoyez un email de confirmation ci-dessous.",
                    "verify-pending"
                );
            } else {
                notifyError("Lien invalide.", "verify-error");
            }
            return;
        }

        apiRequest(`/auth/verify?token=${encodeURIComponent(token)}`, { method: "GET" })
            .then((res) => {
                if (res.data) login(res.data);
                setStatus("ok");
                notifySuccess(res.message || "Email confirmé.", "verify-success");
                setTimeout(() => navigate("/write"), 2000);
            })
            .catch((err) => {
                setStatus("error");
                setShowResend(true);
                notifyError(getErrorMessage(err, "Échec de la vérification."), "verify-error");
            });
    }, [token, login, navigate]);

    const handleResend = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            notifyError("Indiquez votre adresse email.", "verify-resend-email");
            return;
        }
        setResendLoading(true);
        try {
            const res = await apiRequest("/auth/resend-verification", {
                method: "POST",
                body: JSON.stringify({ email: email.trim().toLowerCase() }),
            });
            notifySuccess(res.message || "Email de confirmation renvoyé.", "verify-resend-success");
            setShowResend(true);
        } catch (err) {
            notifyError(getErrorMessage(err, "Impossible d'envoyer l'email."), "verify-resend-error");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Vérification</h1>

                {status === "loading" && <p>Validation en cours…</p>}

                {(status === "error" || status === "pending") && (
                    <p className="verify-hint">
                        {status === "pending"
                            ? "Un email de confirmation vous a été envoyé (lien valide 30 minutes)."
                            : "Le lien est invalide ou a expiré (validité : 30 minutes)."}
                    </p>
                )}

                {status === "ok" && <p className="verify-hint">Redirection en cours…</p>}

                {(showResend || status === "pending" || status === "error") && status !== "ok" && (
                    <form onSubmit={handleResend} className="verify-resend-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="votre@email.com"
                                required
                            />
                        </div>
                        <button type="submit" className="auth-submit-btn" disabled={resendLoading}>
                            {resendLoading ? "Envoi…" : "Renvoyer l'email de confirmation"}
                        </button>
                    </form>
                )}

                <p className="switch-auth">
                    <Link to="/login">Connexion</Link>
                </p>
            </div>
        </div>
    );
}

export default Verify;
