import { Link } from 'react-router-dom';
import React from 'react';

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="logo-link">
            <img src="/images/logo.png" alt="Logo" className="logo-img" />
          </Link>
          <h1 className="auth-title">SE CONNECTER</h1>
        </div>
        
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input type="text" spellCheck="false" />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" />
        </div>

        <button className="auth-submit-btn">Se connecter</button>

        <p className="switch-auth">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </div>

      <style jsx>{`
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
          overflow: hidden !important;
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
          object-fit: contain;
          cursor: pointer;
          transition: transform 0.2s;
          border-radius: 50%;
        }

        .logo-img:hover {
          transform: scale(1.1);
        }

        .auth-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .form-group {
          text-align: left;
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 8px;
          margin-left: 5px;
          color: #000;
        }

        .form-group input {
          width: 100%;
          height: 48px;
          padding: 0 15px;
          border: 1px solid #000;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
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
          transition: background-color 0.2s;
        }

        .auth-submit-btn:hover { 
          background-color: #3d5ee0; 
        }

        .switch-auth {
          margin-top: 10px;
          font-size: 0.95rem;
          color: #666;
        }

        .switch-auth a {
          color: #4f75ff;
          text-decoration: none;
          font-weight: 600;
        }

        /* RESPONSIVE */
        @media (max-width: 480px) {
          .auth-card {
            border: none; 
            padding: 20px 10px;
          }
          .auth-title {
            font-size: 1.5rem;
          }
          .logo-img {
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;