import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import Verify from "./components/Verify.jsx";
import Write from "./pages/Write/Write.jsx";
import Home from "./pages/Home/Home.jsx";
import Resume from "./pages/Resume/Resume.jsx";
import Save from "./pages/Save/Save.jsx";
import Profil from "./pages/Profil/Profil.jsx";

const AppLayout = () => (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
);

const router = createBrowserRouter([
    {
        path: "/",
        Component: AppLayout,
        children: [
            { index: true, Component: Home },
            { path: "/write", Component: Write },
            { path: "/resume", Component: Resume },
            { path: "/save", Component: Save },
            { path: "/profil", Component: Profil },
            { path: "/profile", Component: Profil },
        ],
    },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    { path: "/forgot-password", Component: ForgotPassword },
    { path: "/reset-password", Component: ResetPassword },
    { path: "/verify", Component: Verify },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
