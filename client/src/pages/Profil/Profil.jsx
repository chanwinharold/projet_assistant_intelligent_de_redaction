import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Profil.css";
import useAuth from "../../hooks/useAuth.js";
import Unauthorize from "../../components/Unauthorize.jsx";
import { apiRequest, apiUpload } from "../../services/api.js";
import { notifyError, notifySuccess } from "../../services/toast.js";
import PasswordInput from "../../components/PasswordInput.jsx";
import { getErrorMessage } from "../../utils/errorMessage.js";

function Profil() {
    const { user, isLoggedIn, login, logout } = useAuth();
    const navigate = useNavigate();

    const [prenom, setPrenom] = useState(user?.prenom || "");
    const [nom, setNom] = useState(user?.nom || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.prenom) setPrenom(user.prenom);
        if (user?.nom) setNom(user.nom);
    }, [user]);

    if (!isLoggedIn) return <Unauthorize />;

    const profilePayload = () => ({
        prenom: prenom.trim(),
        nom: nom.trim(),
    });

    const handleImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);
        try {
            const form = new FormData();
            form.append("image", file);
            const filename = await apiUpload("/auth/image", form);
            const res = await apiRequest("/auth/profile", {
                method: "PUT",
                body: JSON.stringify({ ...profilePayload(), image: filename }),
            });
            login(res.data);
            notifySuccess("Photo de profil mise à jour.");
        } catch (err) {
            notifyError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiRequest("/auth/profile", {
                method: "PUT",
                body: JSON.stringify(profilePayload()),
            });
            login(res.data);
            notifySuccess("Profil mis à jour.");
        } catch (err) {
            notifyError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handlePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiRequest("/auth/password", {
                method: "PUT",
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            setCurrentPassword("");
            setNewPassword("");
            notifySuccess("Mot de passe modifié.");
        } catch (err) {
            notifyError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <main className="profil-page">
            <div className="profil-card">
                <h1>Mon profil</h1>

                <div className="profil-avatar">
                    <img src={`/user_images/${user.image}`} alt="Avatar" />
                    <label className="profil-upload">
                        Changer la photo
                        <input type="file" accept="image/*" hidden onChange={handleImage} />
                    </label>
                </div>

                <p className="profil-email">{user.email}</p>

                <form onSubmit={handleProfile} className="profil-form">
                    <div className="profil-name-row">
                        <div className="profil-field">
                            <label>Prénom</label>
                            <input
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                autoComplete="given-name"
                                required
                                minLength={2}
                                maxLength={50}
                            />
                        </div>
                        <div className="profil-field">
                            <label>Nom</label>
                            <input
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                autoComplete="family-name"
                                required
                                minLength={2}
                                maxLength={50}
                            />
                        </div>
                    </div>
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        Enregistrer le profil
                    </button>
                </form>

                <form onSubmit={handlePassword} className="profil-form">
                    <h2>Changer le mot de passe</h2>
                    <label>Mot de passe actuel</label>
                    <PasswordInput value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                    <label>Nouveau mot de passe</label>
                    <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        Modifier le mot de passe
                    </button>
                </form>

                <button type="button" className="profil-logout" onClick={handleLogout}>
                    Se déconnecter
                </button>
                <p className="profil-links">
                    <Link to="/save">Mes enregistrements</Link>
                </p>
            </div>
        </main>
    );
}

export default Profil;
