import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            navigate("/category")
        } else {
            navigate("/login")
        }
    }, [])
   
};

export default AuthHandler;