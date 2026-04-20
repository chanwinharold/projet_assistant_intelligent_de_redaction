
CREATE TABLE ir_article (
    id_article SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(4096) NOT NULL,
    id_user INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    FOREIGN KEY (id_user) REFERENCES ir_user(id_user)
);

INSERT INTO ir_article (title, content, id_user)
VALUES (?, ?, ?);

SELECT *
FROM ir_article
WHERE id_user = ?;

SELECT *
FROM ir_article
WHERE id_article = ? AND id_user = ?;

UPDATE ir_article
SET
    title = ?,
    content = ?
WHERE id_article = ? AND id_user = ?;

DELETE FROM ir_article
WHERE id_article = ? AND id_user = ?;