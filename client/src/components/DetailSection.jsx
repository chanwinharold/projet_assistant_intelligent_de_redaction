import React from 'react';

const DetailSection = () => {
  return (
    <section className="details-container">
      {/* Bloc 1: Rédaction Intelligente */}
      <div className="detail-row">
        <div className="detail-image">
          <img 
            src="/images/detail/detail1.png" 
            alt="Assistant Rédaction" 
          />
        </div>
        <div className="detail-text">
          <h2>Ne craignez plus la page blanche</h2>
          <p>
            Notre assistant analyse votre contexte pour suggérer la suite de vos phrases en temps réel. 
            Que ce soit pour un blog ou un rapport technique, l'IA garantit une cohérence éditoriale parfaite et un ton professionnel.
          </p>
        </div>
      </div>

      {/* Bloc 2: Résumé et Optimisation */}
      <div className="detail-row reverse">
        <div className="detail-image">
          <img 
            src="/images/detail/detail2.png" 
            alt="Synthèse IA" 
          />
        </div>
        <div className="detail-text">
          <h2>Des résumés percutants en un clic</h2>
          <p>
            Transformez de longs articles en synthèses structurées. Notre modèle NLP identifie les points clés 
            pour générer des "chapôs" captivants qui retiennent l'attention de vos lecteurs dès les premières secondes.
          </p>
        </div>
      </div>

      <style jsx>{`
        .details-container {
          padding: 80px 10%;
          max-width: 1440px;
          margin: 0 auto;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 60px;
          margin-bottom: 100px;
        }

        .detail-row.reverse {
          flex-direction: row-reverse;
        }

        .detail-image, .detail-text {
          flex: 1;
        }

        .detail-image img {
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: block;
        }

        .detail-text h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: #000;
          line-height: 1.2;
        }

        .detail-text p {
          font-size: 1.15rem;
          color: #4b5563;
          line-height: 1.7;
        }

        /* --- RESPONSIVE TABLETTE & MOBILE --- */
        @media (max-width: 1024px) {
          .details-container {
            padding: 60px 5%;
          }
          .detail-row {
            gap: 40px;
          }
          .detail-text h2 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .detail-row, .detail-row.reverse {
            flex-direction: column; /* Empilage vertical */
            margin-bottom: 80px;
            gap: 30px;
            text-align: center;
          }

          .detail-text h2 {
            font-size: 1.6rem;
            margin-bottom: 1rem;
          }

          .detail-text p {
            font-size: 1.05rem;
          }

          .detail-image {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default DetailSection;