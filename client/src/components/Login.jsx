import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { apiRequest } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Le contrôleur attend du JSON avec 'username' et 'password'
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Le backend renvoie { message: "Connexion réussie." } et un cookie
      console.log(response.message);
      
      // Redirection vers l'accueil
      navigate('/');
      
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
    
      <style jsx>{`
        .error-message {
          background-color: #fee2e2;
          color: #dc2626;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          border: 1px solid #fecaca;
        }

        .auth-submit-btn:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }

        
        .auth-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          font-family: 'Inter', sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
          padding: 40px 30px;
          border: 1.5px solid #000;
          border-radius: 40px;
          text-align: center;
          box-sizing: border-box;
          background: white;
        }
        .auth-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 40px;
        }
        .logo-img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
        .auth-title {
          font-size: 1.8rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .form-group {
          text-align: left;
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .form-group input {
          width: 100%;
          height: 48px;
          padding: 0 15px;
          border: 1px solid #000;
          border-radius: 12px;
          box-sizing: border-box;
        }
        .auth-submit-btn {
          width: 100%;
          height: 55px;
          background-color: #4f75ff; 
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 30px 0 20px;
          cursor: pointer;
        }
        .switch-auth a {
          color: #4f75ff;
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Login;