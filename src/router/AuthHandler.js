import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("lw-token");
    const location = useLocation();
    const { pathname } = location
    const { state } = location
    const email = state?.email
    useEffect(() => {
        if (token) {
            ['/login', '/register', "/Otp", "/forgotpassword", "/resetpassword"]?.includes(pathname) && navigate("/category")
        } else {
            if (!['/register', "/Otp", "/forgotpassword", "/resetpassword"]?.includes(pathname)) {
                navigate("/login")
            } else if (!email && ["/Otp"]?.includes(pathname)) {
                navigate("/register")
            }
        }
    }, [token, pathname])
};

export default AuthHandler;