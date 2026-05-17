DROP TABLE IF EXISTS ir_user;
CREATE TABLE IF NOT EXISTS ir_user (
    id_user SERIAL PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    user_prenom VARCHAR(50),
    user_nom VARCHAR(50),
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_image VARCHAR(255) DEFAULT 'user_default_image.png',
    user_verified BOOLEAN NOT NULL DEFAULT true
);

DROP TABLE IF EXISTS ir_email_token;
CREATE TABLE IF NOT EXISTS ir_email_token (
    id_token    SERIAL PRIMARY KEY,
    token       VARCHAR(255) NOT NULL UNIQUE,
    expires     TIMESTAMPTZ NOT NULL,
    id_user     INTEGER NOT NULL REFERENCES ir_user(id_user) ON DELETE CASCADE,
    token_type  VARCHAR(50) NOT NULL
);
