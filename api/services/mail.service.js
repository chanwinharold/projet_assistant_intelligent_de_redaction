const nodemailer = require("nodemailer");

let transporter;

function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || process.env.AUTH_VERIFICATION_EMAIL,
                pass: process.env.SMTP_PASS || process.env.AUTH_VERIFICATION_PASSWORD,
            },
        });
    }
    return transporter;
}

exports.sendMail = async ({ to, subject, html }) => {
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.AUTH_VERIFICATION_EMAIL;
    if (!from || !(process.env.SMTP_PASS || process.env.AUTH_VERIFICATION_PASSWORD)) {
        console.warn("SMTP non configuré — email non envoyé vers", to);
        return { skipped: true };
    }
    await getTransporter().sendMail({ from, to, subject, html });
    return { sent: true };
};

exports.sendVerificationEmail = async (email, token) => {
    const url = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify?token=${token}`;
    return exports.sendMail({
        to: email,
        subject: "Confirmez votre compte — Intelligent Redac",
        html: `<p>Bienvenue sur Intelligent Redac.</p><p><a href="${url}">Confirmer mon email</a></p><p>Ce lien expire dans 30 minutes.</p>`,
    });
};

exports.sendPasswordResetEmail = async (email, token) => {
    const url = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${token}`;
    return exports.sendMail({
        to: email,
        subject: "Réinitialisation du mot de passe — Intelligent Redac",
        html: `<p>Vous avez demandé une réinitialisation.</p><p><a href="${url}">Choisir un nouveau mot de passe</a></p><p>Ce lien expire dans 30 minutes. Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.</p>`,
    });
};
