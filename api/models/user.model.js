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
        SELECT id_user, user_name, user_password
        FROM ir_user
        WHERE user_name = ${username}
    `;
}