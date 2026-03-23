
import { Link } from 'react-router-dom';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        {/* TITRE AVEC OMBRE ET TYPO SERRÉE */}
        <h1 className="hero-title">
          DES IDÉES PRÊTES À L'EMPLOI POUR ÉCRIRE PLUS VITE ET PLUS JUSTE. 
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
  <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
    LANCEZ VOUS !
  </Link>
</span> 
<Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
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
          </div> </Link>
        </button>
      </div>

      <style jsx>{`
        .hero-container {
          background-color: #fff;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .hero-content {
          max-width: 1000px;
          width: 100%;
        }

        .hero-title {
          font-family: 'Inter', 'Arial Black', sans-serif;
          font-size: 4.5rem; 
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -3px; /* Très serré pour l'effet compact */
          color: #000;
          margin-bottom: 40px;
          /* Ombre portée douce pour détacher le texte */
          text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
          text-transform: uppercase;
        }

        .hero-description {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          color: #1a1a1a;
          line-height: 1.4;
          margin-bottom: 50px;
          font-weight: 500;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          background-color: #fff;
          border: 3px solid #000;
          border-radius: 100px; /* Forme pilule parfaite */
          padding: 10px 15px 10px 35px; /* Padding asymétrique pour l'icône */
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hero-button span {
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .arrow-circle {
          background-color: #fff;
          border: 3px solid #000;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .arrow-circle svg {
          width: 24px;
          height: 24px;
          color: #000;
        }

        /* EFFETS AU SURVOL */
        .hero-button:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .hero-button:hover .arrow-circle {
          transform: translateX(5px);
          background-color: #000;
        }

        .hero-button:hover .arrow-circle svg {
          color: #fff;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
            letter-spacing: -1px;
          }
          .hero-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;