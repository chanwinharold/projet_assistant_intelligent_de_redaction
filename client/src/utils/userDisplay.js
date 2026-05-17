export function userDisplayName(user) {
    if (!user) return "";
    const full = [user.prenom, user.nom].filter(Boolean).join(" ").trim();
    return full || user.email || "";
}
