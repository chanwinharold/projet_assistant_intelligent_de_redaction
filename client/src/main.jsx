import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AppToaster from "./components/AppToaster.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <App />
        <AppToaster />
    </AuthProvider>
);
