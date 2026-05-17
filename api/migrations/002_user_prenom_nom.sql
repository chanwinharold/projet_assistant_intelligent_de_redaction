-- Prénom et nom distincts ; user_name reste un identifiant interne unique
ALTER TABLE ir_user
    ADD COLUMN IF NOT EXISTS user_prenom VARCHAR(50),
    ADD COLUMN IF NOT EXISTS user_nom VARCHAR(50);

UPDATE ir_user
SET
    user_prenom = COALESCE(NULLIF(TRIM(user_prenom), ''), user_name),
    user_nom = COALESCE(NULLIF(TRIM(user_nom), ''), '')
WHERE user_prenom IS NULL OR TRIM(user_prenom) = '';
