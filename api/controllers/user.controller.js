const bcrypt = require("bcrypt")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const Nodemailer = require("nodemailer")
const {createUser, getUser, createEmailToken, getEmailToken, updateEmailToVerified} = require("../models/user.model")

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
            }).then(async () => {

                const emailTransporter= Nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.AUTH_VERIFICATION_EMAIL,
                        pass: process.env.AUTH_VERIFICATION_PASSWORD
                    }
                })
                emailTransporter.verify((error, _) => {
                    if (error) {
                        console.error('Connexion SMTP échouée : ', error);
                    } else {
                        console.log('Serveur prêt à envoyer des emails');
                    }
                });

                const token = crypto.randomBytes(32).toString('hex')
                await createEmailToken({
                    tokens: token,
                    expires: Date.now() + 3600000
                })

                await emailTransporter.sendMail({
                    from: process.env.AUTH_VERIFICATION_EMAIL,
                    to: req.body.email,
                    subject: "Confirmez votre adresse email",
                    html: `<a href="${process.env.FRONTEND_URL}/verify?token=${token}">Confirmer mon email</a>`
                })

                res.status(201).json({message: "Utilisateur crée."})

            }).catch(error => {
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

exports.verifyEmail = (req, res, _) => {
    getEmailToken(req.query.token).then(response => {
        response = response[0]
        if (!response || response.expires < Date.now()) return res.status(400).json({error: "Lien invalide ou expiré."})
        updateEmailToVerified().then(() => {
            res.status(200).json({message: "Email confirmé."})
        }).catch(error => res.status(500).json({error: `Erreur lors de la confirmation : ${error}.`}))
    }).catch(error => res.status(500).json({error: `Erreur lors de la vérification : ${error}.`}))
}