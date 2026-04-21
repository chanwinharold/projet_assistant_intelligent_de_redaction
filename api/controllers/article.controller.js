const {createArticle, getAllArticle, getOneArticle, updateArticle, deleteArticle} = require("../models/article.model");


exports.createArticle = (req, res) => {
    delete req.body.id_user
    const article = req.body
    const id_user = req.auth.id_user

    createArticle(article, id_user).then(
        () => res.status(201).json({message: "Article sauvegardé avec succès !"})
    ).catch(err => res.status(400).json({error: `Erreur: ${err}`}))
};

exports.getAllArticle = (req, res) => {
    delete req.body.id_user
    const id_user = req.auth.id_user

    getAllArticle(id_user).then(
        response => {
            res.status(200).json({data: response, message: "Articles récupérés avec succès !"})
        }
    ).catch(err => res.status(404).json({error: `Ressources introuvables: ${err}`}))
};

exports.getOneArticle = (req, res) => {
    delete req.body.id_user
    const id_article = req.params.id
    const id_user = req.auth.id_user

    getOneArticle(id_article, id_user).then(
        response => {
            res.status(200).json({data: response || null, message: "Article récupéré avec succès !"})
        }
    ).catch(err => res.status(404).json({error: `Ressource introuvable: ${err}`}))
};

exports.updateArticle = (req, res) => {
    delete req.body.id_user
    const id_article = req.params.id
    const article = req.body
    const id_user = req.auth.id_user

    updateArticle(id_article, article, id_user).then(
        () => res.status(200).json({message: "Article mise à jour avec succès !"})
    ).catch(err => res.status(400).json({error: `Erreur: ${err}`}))
};

exports.deleteArticle = (req, res) => {
    delete req.body.id_user
    const id_article = req.params.id
    const id_user = req.auth.id_user

    deleteArticle(id_article, id_user).then(
        () => res.status(204).json({message: "Article supprimé avec succès !"})
    ).catch(err => res.status(404).json({error: `Ressource Introuvable: ${err}`}))
};
