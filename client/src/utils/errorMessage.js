export function formatPayload(value) {
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
        return value
            .map((item) =>
                typeof item === "object" ? item.msg || item.message || JSON.stringify(item) : String(item)
            )
            .join(", ");
    }
    if (value && typeof value === "object") {
        return value.message || value.error || JSON.stringify(value);
    }
    return String(value);
}

export function getErrorMessage(err, fallback = "Une erreur est survenue.") {
    if (!err) return fallback;
    if (typeof err === "string") return err;

    const msg = err.message;
    if (typeof msg === "string" && msg && msg !== "[object Object]") return msg;

    if (err.detail) return formatPayload(err.detail);
    if (err.error) return formatPayload(err.error);

    return fallback;
}
