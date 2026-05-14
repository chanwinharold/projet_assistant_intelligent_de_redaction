const db = require("../database")

exports.createUser = async (user_dt) => {
    return user_dt.image ?
    db`
        INSERT INTO ir_user (user_name, user_email, user_password, user_image)
        VALUES (${user_dt.username}, ${user_dt.email}, ${user_dt.password}, ${user_dt.image})
    ` :
    db`
        INSERT INTO ir_user (user_name, user_email, user_password)
        VALUES (${user_dt.username}, ${user_dt.email}, ${user_dt.password})
    `
}

exports.getUser = async (username) => {
    return db`
        SELECT *
        FROM ir_user
        WHERE user_name = ${username}
    `;
}

exports.getUserById = async (id_user) => {
    return db`
        SELECT user_name, user_email, user_image, user_verified
        FROM ir_user
        WHERE id_user = ${id_user}
    `;
}

exports.createEmailToken = async (token_dt) => {
    return db`
        INSERT INTO ir_email_token (token, expires)
        VALUES (${token_dt.tokens}, ${token_dt.expires})
    `;
}

exports.getEmailToken = async (token) => {
    return db`
        SELECT *
        FROM ir_email_token
        WHERE token = ${token}
    `;
}

exports.updateEmailToVerified = async (email) => {
    return db`
        UPDATE ir_user
        SET user_verified = true
        WHERE user_email = ${email}
    `;
}