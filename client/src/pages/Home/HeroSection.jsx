import { Link } from 'react-router-dom';
import "../../styles/Home.css";
import useAuth from "../../hooks/useAuth.js";

const HeroSection = () => {
    const {isLoggedIn} = useAuth();

    return (
        <section className="hero-container">
            <div className="hero-content">
                {/* TITRE AVEC OMBRE ET TYPO SERRÉE */}
                <h1 className="hero-title">
                    DES IDÉES PRÊTES À L'EMPLOI POUR ÉCRIRE <br/>PLUS VITE ET PLUS JUSTE.
                </h1>

                {/* DESCRIPTION AVEC ALIGNEMENT ET COULEUR EXACTE */}
                <p className="hero-description">
                    Découvrez l’outil qui turbo-booste votre écriture: en un clic, il propose des  <br />
                    titres percutants, des résumés prêts à publier et des phrases qui sonnent  <br />
                    juste, comme si vous aviez un rédacteur pro à vos côtés.
                </p>

                {/* BOUTON AVEC L'ICÔNE FLÈCHE CERCLÉE DU DESIGN */}
                <button className="hero-button">
                    <span>
                      <Link to={isLoggedIn ? "/write" : "/register"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        LANCEZ VOUS !
                      </Link>
                    </span>
                    <Link to={isLoggedIn ? "/write" : "/register"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="arrow-circle">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                    </Link>
                </button>
            </div>
        </section>
    );
};

export default HeroSection;