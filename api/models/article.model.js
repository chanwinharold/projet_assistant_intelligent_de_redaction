const db = require("../database")

exports.createArticle = async (article_dt, id_user) => {
    return db`
        INSERT INTO ir_article (title, content, id_user)
        VALUES (${article_dt.title}, ${article_dt.content}, ${id_user})
        RETURNING id_article, title, content, created_at
    `
}

exports.getAllArticle = async (id_user) => {
    return db`
        SELECT *
        FROM ir_article
        WHERE id_user = ${id_user}
    `
}

exports.getOneArticle = async (id_article, id_user) => {
    return db`
        SELECT *
        FROM ir_article
        WHERE id_article = ${id_article} AND id_user = ${id_user}
    `
}

exports.updateArticle = async (id_article, article_dt, id_user) => {
    return db`
        UPDATE ir_article
        SET
            title = ${article_dt.title},
            content = ${article_dt.content}
        WHERE id_article = ${id_article} AND id_user = ${id_user}
    `
}

exports.deleteArticle = async (id_article, id_user) => {
    return db`
        DELETE FROM ir_article
        WHERE id_article = ${id_article} AND id_user = ${id_user}
    `
}