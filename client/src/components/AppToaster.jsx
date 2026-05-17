import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_DURATION_MS } from "../services/toast.js";

export default function AppToaster() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={TOAST_DURATION_MS}
            pauseOnHover
            pauseOnFocusLoss
            newestOnTop
            limit={5}
            theme="colored"
            className="app-toast-container"
        />
    );
}
