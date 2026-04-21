const db = require("../database")


exports.createResume = async (resume_dt, id_user) => {
    return db`
        INSERT INTO ir_resume (title, content, id_user)
        VALUES (${resume_dt.title}, ${resume_dt.content}, ${id_user});
    `
};

exports.getAllResume = async (id_user) => {
    return db`
        SELECT *
        FROM ir_resume
        WHERE id_user = ${id_user}
    `
}

exports.getOneResume = async (id_resume, id_user) => {
    return db`
        SELECT *
        FROM ir_resume
        WHERE id_user = ${id_user} AND id_resume = ${id_resume}
    `
}

exports.updateResume = async (resume_dt, id_resume, id_user) => {
    return db`
        UPDATE ir_resume
        SET
            title = ${resume_dt.title},
            content = ${resume_dt.content}
        WHERE id_user = ${id_user} AND id_resume = ${id_resume}
    `
}

exports.deleteResume = async (id_resume, id_user) => {
    return db`
        DELETE FROM ir_resume
        WHERE id_user = ${id_user} AND id_resume = ${id_resume}
    `
}
