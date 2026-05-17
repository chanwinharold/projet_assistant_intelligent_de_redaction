const db = require("../database");

exports.createUser = async ({ username, email, password, prenom, nom, verified = false }) => {
    return db`
        INSERT INTO ir_user (user_name, user_email, user_password, user_verified, user_prenom, user_nom)
        VALUES (${username}, ${email}, ${password}, ${verified}, ${prenom}, ${nom})
        RETURNING id_user, user_name, user_email, user_image, user_verified, user_prenom, user_nom
    `;
};

exports.getUserByUsername = async (username) => {
    return db`SELECT * FROM ir_user WHERE user_name = ${username}`;
};

exports.getUserByEmail = async (email) => {
    return db`SELECT * FROM ir_user WHERE user_email = ${email}`;
};

exports.getUserById = async (id_user) => {
    return db`
        SELECT id_user, user_name, user_email, user_image, user_verified, user_prenom, user_nom
        FROM ir_user
        WHERE id_user = ${id_user}
    `;
};

exports.updateEmailToVerified = async (id_user) => {
    return db`
        UPDATE ir_user SET user_verified = true WHERE id_user = ${id_user}
    `;
};

exports.updatePassword = async (id_user, passwordHash) => {
    return db`
        UPDATE ir_user SET user_password = ${passwordHash} WHERE id_user = ${id_user}
    `;
};

exports.updateUserProfile = async (id_user, { prenom, nom, image }) => {
    if (image !== undefined) {
        return db`
            UPDATE ir_user
            SET user_prenom = ${prenom}, user_nom = ${nom}, user_image = ${image}
            WHERE id_user = ${id_user}
        `;
    }
    return db`
        UPDATE ir_user
        SET user_prenom = ${prenom}, user_nom = ${nom}
        WHERE id_user = ${id_user}
    `;
};

exports.createEmailToken = async ({ token, expires, id_user, tokenType }) => {
    await db`DELETE FROM ir_email_token WHERE id_user = ${id_user} AND token_type = ${tokenType}`;
    return db`
        INSERT INTO ir_email_token (token, expires, id_user, token_type)
        VALUES (${token}, ${expires}, ${id_user}, ${tokenType})
    `;
};

exports.getEmailToken = async (token) => {
    return db`SELECT * FROM ir_email_token WHERE token = ${token}`;
};

exports.deleteEmailToken = async (token) => {
    return db`DELETE FROM ir_email_token WHERE token = ${token}`;
};
