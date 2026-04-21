const {createResume, getAllResume, getOneResume, updateResume, deleteResume} = require("../models/resume.model")


exports.createResume = (req, res) => {
    delete req.body.id_user
    delete req.body.id_resume

    const resume_dt = req.body
    const id_user = req.auth.id_user

    createResume(resume_dt, id_user).then(
        () => res.status(201).json({message: "Resumé sauvegardé avec succès !"})
    ).catch(err => res.status(400).json({error: `Erreur: ${err}`}))
}

exports.getAllResume = (req, res) => {
    delete req.body.id_user
    const id_user = req.auth.id_user

    getAllResume(id_user).then(
        (response) => res.status(200).json({data: response, message: "Résumés récupérés avec succès !"})
    ).catch(err => res.status(404).json({error: `Ressources Introuvables: ${err}`}))
}

exports.getOneResume = (req, res) => {
    delete req.body.id_user
    const id_resume = req.params.id
    const id_user = req.auth.id_user

    getOneResume(id_resume, id_user).then(
        (response) => res.status(200).json({data: response, message: "Résumé récupéré avec succès !"})
    ).catch(err => res.status(404).json({error: `Ressource Introuvable: ${err}`}))
}

exports.updateResume = (req, res) => {
    delete req.body.id_user
    delete req.body.id_resume

    const resume_dt = req.body
    const id_user = req.auth.id_user
    const id_resume = req.params.id

    updateResume(resume_dt, id_resume, id_user).then(
        () => res.status(200).json({message: "Resumé mise à jour avec succès !"})
    ).catch(err => res.status(400).json({error: `Erreur: ${err}`}))
}

exports.deleteResume = (req, res) => {
    delete req.body.id_user
    delete req.body.id_resume

    const id_user = req.auth.id_user
    const id_resume = req.params.id
    
    deleteResume(id_resume, id_user).then(
        () => res.status(204).json({message: "Résumé supprimé avec succès !"})
    ).catch(err => res.status(404).json({error: `Ressource Introuvable: ${err}`}))
}
