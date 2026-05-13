import "../../styles/Home.css";

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
        </section>
    );
};

export default DetailSection;