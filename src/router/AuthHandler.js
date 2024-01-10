// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// const AuthHandler = () => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem("lw-token");
//     const location = useLocation();
//     const { pathname } = location
//     const { state } = location
//     const email = state?.email
//     console.log(pathname, "pathname")
//     useEffect(() => {
//         if (token) {
//             ['/login', '/register', "/Otp", "/forgotpassword"]?.includes(pathname) && navigate("/category")
//         } else {
//             if (!['/register', "/Otp", "/forgotpassword"]?.includes(pathname)) {
//                 navigate("/login")
//             } else if (!email && ["/Otp"]?.includes(pathname)) {
//                 navigate("/register")
//             }
//         }
//     }, [token, pathname])
// };
// export default AuthHandler;

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("lw-token");
    const location = useLocation();
    const { pathname } = location;
    const { state } = location;
    const email = state?.email;
    const resetPasswordPath = /^\/resetpassword\/.+/;

    useEffect(() => {
        if (token) {
            (['/login', '/register', '/Otp', '/forgotpassword']?.includes(pathname) || resetPasswordPath.test(pathname)) && navigate("/dashboard");
        } else {
            if (!['/register', '/Otp', '/forgotpassword']?.includes(pathname) && !resetPasswordPath.test(pathname)) {
                navigate("/login");
            } else if (!email && ['/Otp']?.includes(pathname)) {
                navigate("/register");
            }
        }
    }, [token, pathname]);

    return null;
};

export default AuthHandler;
