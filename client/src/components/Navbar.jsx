import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { Menu, X } from 'lucide-react';
import "../styles/Navbar.css";
import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user, isLoggedIn} = useAuth();

    const navLinks = [
        { name: 'Écrire', href: '/write' },
        { name: 'Résumer', href: '/resume' },
        { name: 'Enregistrements', href: '/save' },
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
                        <Link to={"/profil"} className="profile-circle">
                            <img src={`/user_images/${user.image}`} alt="Profil" title={user.username} />
                        </Link>
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
        </nav>
    );
};

export default Navbar;