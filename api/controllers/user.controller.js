const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {createUser, getUser} = require("../models/user.model")

exports.signup = (req, res, _) => {
    bcrypt.hash(
        req.body.password,
        10,
        (error, hash_pw) => {
            if (error) return res.status(500).json({error: `Erreur lors du hash : ${error}.`});
            createUser({
                username: req.body.username,
                password: hash_pw,
                email: req.body.email,
                image: req.body.image
            }).then(() => res.status(201).json({message: "Utilisateur crée."}))
            .catch(error => {
                res.status(500).json({error: `Erreur lors de la création du compte : ${error}.`})
            })
        }
    )
}

exports.login = (req, res, _) => {
    getUser(req.body.username).then(response => {
        response = response[0]
        if (!response) return res.status(401).json({message: "Votre nom d'utilisateur/mot de passe est incorrecte."});
        bcrypt.compare(
            req.body.password,
            response.user_password,
            (error, result) => {
                if (error) return res.status(500).json({error: `Erreur 02 lors de la connexion : ${error}.`});
                if (!result) return res.status(401).json({message: "Votre nom d'utilisateur/mot de passe est incorrecte."});
                const token = jwt.sign(
                    {id_user: response.id_user},
                    process.env.JWT_USER_AUTH_TOKEN,
                    {expiresIn: '24h'}
                )
                res.cookie(
                    "authToken",
                    token,
                    {httpOnly: true}
                ).status(200).json({message: "Connexion réussie."})
            }
        )
    }).catch(error => res.status(500).json({error: `Erreur 01 lors de la connexion : ${error}.`}))
}