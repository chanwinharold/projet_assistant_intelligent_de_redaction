import { toast } from "react-toastify";

export const TOAST_DURATION_MS = 20_000;

const defaultOptions = {
    autoClose: TOAST_DURATION_MS,
    pauseOnHover: true,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
};

const show = (type, message, toastId) =>
    toast[type](message, {
        ...defaultOptions,
        ...(toastId ? { toastId } : {}),
    });

export const notifySuccess = (message, toastId) => show("success", message, toastId);
export const notifyError = (message, toastId) => show("error", message, toastId);
export const notifyInfo = (message, toastId) => show("info", message, toastId);
