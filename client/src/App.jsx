import { Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Write from "./pages/Write/Write.jsx";
import Home from "./pages/Home/Home.jsx";
import Resume from "./pages/Resume/Resume.jsx";
import Save from "./pages/Save/Save.jsx";

// Composant pour gérer l'affichage conditionnel
const AppLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

let router = createBrowserRouter([
    {
        path: "/",
        Component: AppLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/write",
                Component: Write
            },
            {
                path: "/resume",
                Component: Resume
            },
            {
                path: "/save",
                Component: Save
            }
        ]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;