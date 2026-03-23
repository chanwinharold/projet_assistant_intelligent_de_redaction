import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { apiRequest } from '../services/api';
import { CheckCircle2 } from 'lucide-react';


const Register = () => {
  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Gestion des changements dans les inputs texte
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion du chargement de l'image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) return setError('Mots de passe différents');
  
  setLoading(true);
  try {
    // On envoie un objet JSON simple pour correspondre à req.body du controller
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      image: "" // Le controller attend 'image', on laisse vide en attendant multer
    };


    await apiRequest('/auth/signup', { // Le controller est lié à /signup et non /register
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    navigate('/login');
  } catch (err) {
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
          <h1 className="auth-title">S'INSCRIRE</h1>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Email d'utilisateur</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="upload-row">
  <span style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px',
    color: image ? '#4f75ff' : 'inherit' 
  }}>
    {image ? (
      <>
        <CheckCircle2 size={18} /> Image sélectionnée
      </>
    ) : (
      "Charger une image"
    )}
  </span>
  <label className="upload-button">
    <Upload size={22} strokeWidth={2.5} />
    <input 
      type="file" 
      accept="image/*"
      style={{ display: 'none' }} 
      onChange={handleImageChange}
    />
  </label>
</div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>
        
        <p className="switch-auth">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>

      <style>{`
        /* Styles identiques au Login pour la cohérence */
        .error-message {
          background-color: #fee2e2;
          color: #dc2626;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 0.9rem;
          border: 1px solid #fecaca;
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
          max-width: 480px;
          padding: 30px 35px;
          border: 1.5px solid #000;
          border-radius: 40px;
          text-align: center;
          background: white;
        }

        .auth-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 25px;
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
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 5px;
          margin-left: 5px;
        }

        .form-group input {
          width: 100%;
          height: 42px;
          padding: 0 15px;
          border: 1px solid #000;
          border-radius: 12px;
          box-sizing: border-box;
          outline: none;
        }

        .upload-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          margin: 15px 0;
          font-weight: 500;
        }

        .upload-button { cursor: pointer; display: flex; align-items: center; }
        .upload-button:hover { color: #4f75ff; }

        .auth-submit-btn {
          width: 100%;
          height: 50px;
          background-color: #4f75ff;
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 15px;
        }

        .auth-submit-btn:disabled { background-color: #ccc; }

        .switch-auth a {
          color: #4f75ff;
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .auth-card { padding: 20px; border-radius: 25px; border: none; }
        }
      `}</style>
    </div>
  );
};

export default Register;