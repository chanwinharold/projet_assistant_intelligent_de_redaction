import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/useAuth.js";
import { apiRequest } from "../services/api.js";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        apiRequest("/auth/me", { method: "GET" })
            .then((data) => {
                setUser(data);
                setIsLoggedIn(true);
            })
            .catch(() => {
                setUser(null);
                setIsLoggedIn(false);
            })
            .finally(() => setAuthLoading(false));
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            await apiRequest("/auth/logout", { method: "POST" });
        } catch {
            /* ignore */
        }
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, authLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
