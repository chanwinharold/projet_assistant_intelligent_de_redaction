import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Liaison du système d'auth plus tard

  const navLinks = [
    { name: 'Écrire', href: '/editeur' },
    { name: 'Résumer', href: '/resume' },
    { name: 'Enregistrements', href: '/articles' },
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar-main">
        {/* LOGO GAUCHE */}
        <div className="logo-section">
          <div className="logo-circle">
           <Link to="/" className="logo-link">
                      <img src="/images/logo.png" alt="Logo" className="logo-img" />
                    </Link>
          </div>
        </div>

        {/* LIENS DESKTOP */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-item">
              {link.name}
            </a>
          ))}
        </div>

        {/* AUTH / PROFIL GAUCHE */}
        <div className="auth-section-desktop">
          {isLoggedIn ? (
            <div className="profile-circle">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hugues" alt="Profil" />
            </div>
          ) : (
            <Link to="/login" className="login-btn">Se connecter</Link>
          )}
        </div>

        {/* BOUTON MOBILE (HAMBURGER) */}
        <div className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          {isLoggedIn ? (
            <a href="/profil">Mon Profil</a>
          ) : (
            <a href="/login" className="mobile-login-link">Se connecter</a>
          )}
        </div>
      )}

      <style jsx>{`
        .navbar-container {
          width: 100%;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-main {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 5%;
          height: 80px;
        }

        .logo-circle {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          overflow: hidden;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #000;
        }

        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-links-desktop {
          display: none;
          gap: 2.5rem;
        }

        .nav-item {
          text-decoration: none;
          color: #000;
          font-weight: 500;
          position: relative;
          padding: 5px 0;
        }

        /* EFFET DE SURVOL SOULIGNAGE */
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #000;
          transition: width 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .login-btn {
          padding: 0.6rem 1.5rem;
          background: #000;
          color: #fff;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
        }

        .login-btn:hover {
          background: #333;
        }

        .profile-circle {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 1px solid #ddd;
          overflow: hidden;
        }

        .mobile-menu-button {
          display: block;
          cursor: pointer;
        }

        .mobile-menu {
          display: flex;
          align-items: center;
          text-align: center;
          flex-direction: column;
          background: #fff;
          padding: 1rem 5%;
          border-top: 1px solid #eee;
          gap: 1.5rem;
        }

        .mobile-menu a {
          text-decoration: none;
          color: #000;
          font-size: 1.1rem;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .nav-links-desktop { display: flex; }
          .auth-section-desktop { display: block; }
          .mobile-menu-button { display: none; }
          .mobile-menu { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;