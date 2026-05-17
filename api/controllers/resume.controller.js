const { createResume, getAllResume, getOneResume, updateResume, deleteResume } = require("../models/resume.model");

exports.createResume = (req, res) => {
    const resume = req.body;
    const id_user = req.auth.id_user;

    createResume(resume, id_user)
        .then((rows) => res.status(201).json({ message: "Résumé sauvegardé avec succès !", data: rows[0] }))
        .catch((err) => res.status(400).json({ error: `Erreur: ${err}` }));
};

exports.getAllResume = (req, res) => {
    const id_user = req.auth.id_user;

    getAllResume(id_user)
        .then((response) => {
            res.status(200).json({ data: response, message: "Résumés récupérés avec succès !" });
        })
        .catch((err) => res.status(404).json({ error: `Ressources introuvables: ${err}` }));
};

exports.getOneResume = (req, res) => {
    const id_resume = req.params.id;
    const id_user = req.auth.id_user;

    getOneResume(id_resume, id_user)
        .then((response) => {
            res.status(200).json({ data: response[0] || null, message: "Résumé récupéré avec succès !" });
        })
        .catch((err) => res.status(404).json({ error: `Ressource introuvable: ${err}` }));
};

exports.updateResume = (req, res) => {
    const id_resume = req.params.id;
    const resume = req.body;
    const id_user = req.auth.id_user;

    updateResume(resume, id_resume, id_user)
        .then(() => res.status(200).json({ message: "Résumé mise à jour avec succès !" }))
        .catch((err) => res.status(400).json({ error: `Erreur: ${err}` }));
};

exports.deleteResume = (req, res) => {
    const id_resume = req.params.id;
    const id_user = req.auth.id_user;

    deleteResume(id_resume, id_user)
        .then(() => res.status(204).json({ message: "Résumé supprimé avec succès !" }))
        .catch((err) => res.status(404).json({ error: `Ressource Introuvable: ${err}` }));
};
