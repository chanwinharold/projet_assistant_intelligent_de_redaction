import useAuth from "./useAuth.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function useAuthRedirection() {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [navigate, isLoggedIn]);
}

export default useAuthRedirection