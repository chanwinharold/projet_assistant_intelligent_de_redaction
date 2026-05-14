import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { apiRequest } from '../../services/api.js';
import "../../styles/Login.css"
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Le contrôleur attend du JSON avec 'username' et 'password'
            const response = await apiRequest('/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            // Le backend renvoie { message: "Connexion réussie." } et un cookie
            console.log(response.message);
            login(response.data)

            // Redirection vers l'accueil
            navigate('/write');

        } catch (err) {
            // Affiche "Votre nom d'utilisateur/mot de passe est incorrecte." ou erreur serveur
            setError(err.message);
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

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom d'utilisateur</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <p className="switch-auth">
                    Pas encore de compte ? <Link to="/register">S'inscrire</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;