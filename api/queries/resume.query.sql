
CREATE TABLE ir_resume (
    id_resume SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(4096) NOT NULL,
    id_user INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    FOREIGN KEY (id_user) REFERENCES ir_user(id_user)
);

INSERT INTO ir_resume (title, content, id_user)
VALUES (?, ?, ?);

SELECT *
FROM ir_resume
WHERE id_user = ?;

SELECT *
FROM ir_resume
WHERE id_user = ? AND id_resume = ?;

UPDATE ir_resume
    SET
        title = ?,
        content = ?
WHERE id_user = ? AND id_resume = ?;

DELETE FROM ir_resume
WHERE id_user = ? AND id_resume = ?;

INSERT INTO ir_resume (title, content, id_user) VALUES
('Réunion produit du lundi', 'Discussion sur les priorités du sprint, validation des tâches critiques et répartition du travail pour la semaine.', 1),
('Compte rendu de formation', 'Présentation des bases de la sécurité API, avec un focus sur l’authentification, les tokens et les bonnes pratiques.', 2),
('Résumé de lecture', 'Analyse des idées principales du livre, mettant en avant la gestion du temps, la concentration et l’efficacité personnelle.', 1),
('Bilan mensuel marketing', 'Les campagnes email ont bien performé, avec une hausse du taux d’ouverture et une amélioration du taux de conversion.', 2),
('Résumé entretien client', 'Le client souhaite une interface plus simple, un temps de réponse plus rapide et une meilleure documentation.', 1),
('Veille technologique', 'Nouvelles tendances autour de l’intelligence artificielle, des agents automatisés et des outils de productivité pour développeurs.', 2),
('Point hebdomadaire équipe', 'Retour sur les avancées des projets en cours, identification des blocages et plan d’action pour les résoudre.', 1),
('Résumé d’article scientifique', 'L’étude explore l’impact des modèles prédictifs sur l’automatisation des processus métiers et la prise de décision.', 2),
('Synthèse atelier UX', 'Les participants ont proposé plusieurs améliorations sur le parcours utilisateur, notamment sur la navigation et la clarté des écrans.', 1),
('Rapport de test', 'Les principaux scénarios ont été validés, mais quelques anomalies subsistent sur la gestion des erreurs et les cas limites.', 2);