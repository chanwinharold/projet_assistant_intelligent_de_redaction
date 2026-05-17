const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mail = require("../services/mail.service");
const {
    createUser,
    getUserByEmail,
    getUserById,
    getUserByUsername,
    createEmailToken,
    getEmailToken,
    deleteEmailToken,
    updateEmailToVerified,
    updatePassword,
    updateUserProfile,
} = require("../models/user.model");

const JWT_SECRET = process.env.JWT_USER_AUTH_TOKEN || process.env.JWT_SECRET;
const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes
const isProd = process.env.NODE_ENV === "production";
const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
};

function deriveUsername(email) {
    const base = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "").slice(0, 16);
    return base || "user";
}

async function ensureUniqueUsername(base) {
    let candidate = base.slice(0, 20);
    let suffix = 0;
    while (true) {
        const existing = await getUserByUsername(candidate);
        if (!existing.length) return candidate;
        suffix += 1;
        candidate = `${base.slice(0, 20 - String(suffix).length)}${suffix}`;
    }
}

function formatUser(user) {
    const prenom = user.user_prenom || "";
    const nom = user.user_nom || "";
    return {
        prenom,
        nom,
        email: user.user_email,
        image: user.user_image,
        isVerified: user.user_verified ?? false,
    };
}

function validateNamePart(value, label) {
    const trimmed = value?.trim();
    if (!trimmed || trimmed.length < 2) {
        return { error: `${label} requis (2 caractères minimum).` };
    }
    if (trimmed.length > 50) {
        return { error: `${label} trop long (50 caractères maximum).` };
    }
    return { value: trimmed };
}

function setAuthCookie(res, user) {
    const token = jwt.sign({ id_user: user.id_user }, JWT_SECRET, { expiresIn: "24h" });
    res.cookie("authToken", token, COOKIE_OPTIONS);
}

async function createTokenForUser(id_user, type) {
    const token = crypto.randomBytes(32).toString("hex");
    await createEmailToken({
        token,
        expires: new Date(Date.now() + TOKEN_TTL_MS),
        id_user,
        tokenType: type,
    });
    return token;
}

exports.signup = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;
        const prenomCheck = validateNamePart(req.body.prenom, "Prénom");
        const nomCheck = validateNamePart(req.body.nom, "Nom");

        if (!email || !password) {
            return res.status(400).json({ error: "Email et mot de passe requis." });
        }
        if (prenomCheck.error) return res.status(400).json({ error: prenomCheck.error });
        if (nomCheck.error) return res.status(400).json({ error: nomCheck.error });
        if (password.length < 6) {
            return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères." });
        }

        const existing = await getUserByEmail(email);
        if (existing.length) {
            return res.status(409).json({ error: "Un compte existe déjà avec cet email." });
        }

        const hash = await bcrypt.hash(password, 10);
        const username = await ensureUniqueUsername(deriveUsername(email));
        const inserted = await createUser({
            username,
            email,
            password: hash,
            prenom: prenomCheck.value,
            nom: nomCheck.value,
            verified: false,
        });
        const user = inserted[0];

        const verifyToken = await createTokenForUser(user.id_user, "verify");
        const mailResult = await mail.sendVerificationEmail(email, verifyToken);

        if (mailResult?.skipped) {
            await updateEmailToVerified(user.id_user);
            user.user_verified = true;
            setAuthCookie(res, user);
            return res.status(201).json({
                message: "Compte créé (SMTP non configuré — connexion directe).",
                data: formatUser(user),
            });
        }

        res.status(201).json({
            message: "Compte créé. Consultez votre boîte mail pour confirmer votre adresse.",
            data: formatUser(user),
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({ error: "Un compte existe déjà avec cet email." });
        }
        console.error("signup:", error);
        res.status(500).json({ error: "Erreur lors de la création du compte." });
    }
};

exports.login = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ error: "Email et mot de passe requis." });
        }

        const rows = await getUserByEmail(email);
        const user = rows[0];
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const valid = await bcrypt.compare(password, user.user_password);
        if (!valid) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        if (!user.user_verified) {
            return res.status(403).json({
                message: "Email non confirmé. Vérifiez votre boîte mail ou demandez un nouvel envoi.",
                code: "EMAIL_NOT_VERIFIED",
            });
        }

        setAuthCookie(res, user);
        res.status(200).json({
            message: "Connexion réussie.",
            data: formatUser(user),
        });
    } catch (error) {
        console.error("login:", error);
        res.status(500).json({ error: "Erreur lors de la connexion." });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const token = req.query.token || req.body.token;
        if (!token) return res.status(400).json({ error: "Token manquant." });

        const rows = await getEmailToken(token);
        const row = rows[0];
        if (!row || row.token_type !== "verify") {
            return res.status(400).json({ error: "Lien invalide ou expiré." });
        }
        if (new Date(row.expires) < new Date()) {
            return res.status(400).json({ error: "Lien expiré." });
        }

        await updateEmailToVerified(row.id_user);
        await deleteEmailToken(token);

        const userRows = await getUserById(row.id_user);
        const user = userRows[0];
        if (user) setAuthCookie(res, { id_user: row.id_user, ...user });

        res.status(200).json({
            message: "Email confirmé. Vous êtes connecté.",
            data: user ? formatUser(user) : null,
        });
    } catch (error) {
        console.error("verifyEmail:", error);
        res.status(500).json({ error: "Erreur lors de la vérification." });
    }
};

exports.resendVerification = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const rows = await getUserByEmail(email);
        const user = rows[0];
        if (!user) {
            return res.status(200).json({ message: "Si ce compte existe, un email a été envoyé." });
        }
        if (user.user_verified) {
            return res.status(400).json({ error: "Ce compte est déjà vérifié." });
        }
        const verifyToken = await createTokenForUser(user.id_user, "verify");
        await mail.sendVerificationEmail(email, verifyToken);
        res.status(200).json({ message: "Email de confirmation renvoyé." });
    } catch (error) {
        console.error("resendVerification:", error);
        res.status(500).json({ error: "Impossible d'envoyer l'email." });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        if (!email) return res.status(400).json({ error: "Email requis." });

        const rows = await getUserByEmail(email);
        const user = rows[0];
        if (user) {
            const resetToken = await createTokenForUser(user.id_user, "reset");
            await mail.sendPasswordResetEmail(email, resetToken);
        }
        res.status(200).json({
            message: "Si ce compte existe, un email de réinitialisation a été envoyé.",
        });
    } catch (error) {
        console.error("forgotPassword:", error);
        res.status(500).json({ error: "Impossible d'envoyer l'email." });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({ error: "Token et mot de passe requis." });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères." });
        }

        const rows = await getEmailToken(token);
        const row = rows[0];
        if (!row || row.token_type !== "reset") {
            return res.status(400).json({ error: "Lien invalide ou expiré." });
        }
        if (new Date(row.expires) < new Date()) {
            return res.status(400).json({ error: "Lien expiré." });
        }

        const hash = await bcrypt.hash(password, 10);
        await updatePassword(row.id_user, hash);
        await deleteEmailToken(token);

        res.status(200).json({ message: "Mot de passe mis à jour. Vous pouvez vous connecter." });
    } catch (error) {
        console.error("resetPassword:", error);
        res.status(500).json({ error: "Erreur lors de la réinitialisation." });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: COOKIE_OPTIONS.httpOnly,
        sameSite: COOKIE_OPTIONS.sameSite,
        secure: COOKIE_OPTIONS.secure,
    });
    res.status(200).json({ message: "Déconnexion réussie." });
};

exports.getAuthMe = async (req, res) => {
    try {
        const rows = await getUserById(req.auth.id_user);
        const user = rows[0];
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(formatUser(user));
    } catch {
        res.status(401).json({ message: "Token invalide" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const id_user = req.auth.id_user;
        const prenomCheck = validateNamePart(req.body.prenom, "Prénom");
        const nomCheck = validateNamePart(req.body.nom, "Nom");
        if (prenomCheck.error) return res.status(400).json({ error: prenomCheck.error });
        if (nomCheck.error) return res.status(400).json({ error: nomCheck.error });

        await updateUserProfile(id_user, {
            prenom: prenomCheck.value,
            nom: nomCheck.value,
            image: req.body.image,
        });
        const rows = await getUserById(id_user);
        res.json({ message: "Profil mis à jour.", data: formatUser(rows[0]) });
    } catch (error) {
        console.error("updateProfile:", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du profil." });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Mots de passe requis." });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: "Le nouveau mot de passe doit contenir au moins 6 caractères." });
        }

        const rows = await getUserById(req.auth.id_user);
        const fullUser = (await getUserByEmail(rows[0].user_email))[0];
        const valid = await bcrypt.compare(currentPassword, fullUser.user_password);
        if (!valid) {
            return res.status(401).json({ error: "Mot de passe actuel incorrect." });
        }

        const hash = await bcrypt.hash(newPassword, 10);
        await updatePassword(req.auth.id_user, hash);
        res.json({ message: "Mot de passe modifié." });
    } catch (error) {
        console.error("changePassword:", error);
        res.status(500).json({ error: "Erreur lors du changement de mot de passe." });
    }
};

exports.uploadImage = (req, res) => {
    if (!req.file) return res.status(200).json(null);
    res.status(200).send(req.file.filename);
};
