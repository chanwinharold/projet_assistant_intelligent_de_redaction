import {createContext, useContext} from 'react';

export const AuthContext = createContext({});

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useUserContext doit être utilisé dans AuthProvider")
    return context;
}

export default useAuth;