CREATE TABLE IR_USER (
    id_user SERIAL PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL UNIQUE,
    user_image VARCHAR(255) DEFAULT 'user_default_image.png'
);

DROP TABLE IR_USER;