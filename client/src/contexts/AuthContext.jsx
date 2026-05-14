import {useEffect, useState} from 'react';
import {AuthContext} from "../hooks/useAuth.js";
import {apiRequest} from "../services/api.js";

export const AuthProvider = ({children} ) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        apiRequest("/auth/me", {
            method: 'GET',
            credentials: "include",
        }
        ).then(data => {
            setUser(data)
            setIsLoggedIn(true);
        }).catch(err => console.error(err))
    }, []);

    const login = (userData) => {
        setUser(userData)
        setIsLoggedIn(true)
    };
    const logout = () => {
        setUser(null)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{user, isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};