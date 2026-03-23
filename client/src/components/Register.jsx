import { Link } from 'react-router-dom';
import React from 'react';
import { Upload } from 'lucide-react';

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="logo-link">
            <img src="/images/logo.png" alt="Logo" className="logo-img" />
          </Link>
          <h1 className="auth-title">S'INSCRIRE</h1>
        </div>
        
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input type="text" spellCheck="false" />
        </div>

        <div className="form-group">
          <label>Email d'utilisateur</label>
          <input type="email" spellCheck="false" />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" />
        </div>

        <div className="form-group">
          <label>Confirmer le mot de passe</label>
          <input type="password" />
        </div>

        <div className="upload-row">
          <span>Charger une image</span>
          <label className="upload-button">
            <Upload size={22} strokeWidth={2.5} />
            <input type="file" style={{ display: 'none' }} />
          </label>
        </div>

        <button className="auth-submit-btn">S'inscrire</button>
        
        <p className="switch-auth">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
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
          overflow-x: hidden; 
        }

        .auth-card {
          width: 100%;
          max-width: 480px;
          padding: 40px 35px;
          border: 1.5px solid #000;
          border-radius: 40px;
          text-align: center;
          box-sizing: border-box;
          background: white;
          margin: auto; 
        }

        .auth-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .logo-img {
          width: 45px;
          height: 45px;
          object-fit: contain;
          transition: transform 0.2s;
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
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 6px;
          margin-left: 5px;
        }

        .form-group input {
          width: 100%;
          height: 45px;
          padding: 0 15px;
          border: 1px solid #000;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          box-sizing: border-box;
        }

        .upload-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
          font-size: 1rem;
          font-weight: 500;
        }

        .upload-button { 
          cursor: pointer; 
          display: flex; 
          align-items: center;
          transition: color 0.2s;
        }
        
        .upload-button:hover {
          color: #4f75ff;
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
          margin-bottom: 20px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .auth-submit-btn:hover {
          background-color: #3d5ee0;
        }

        .switch-auth {
          font-size: 0.95rem;
          color: #666;
          margin: 0;
        }

        .switch-auth a {
          color: #4f75ff;
          text-decoration: none;
          font-weight: 600;
        }

        /* RESPONSIVE */
        @media (max-width: 480px) {
          .auth-container {
            padding: 10px;
            align-items: flex-start; /* Permet le scroll naturel si le tel est très petit */
          }
          .auth-card {
            padding: 30px 20px;
            border-radius: 25px;
          }
          .auth-title {
            font-size: 1.4rem;
          }
          .form-group input {
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;