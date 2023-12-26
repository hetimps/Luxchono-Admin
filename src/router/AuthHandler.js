import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("lw-token");
    const location = useLocation();

    useEffect(() => {
        if (token) {
            ['/login']?.includes(location.pathname) && navigate("/category")
        } else {
            navigate("/login")
        }
    }, [navigate, token, location])

};

export default AuthHandler;