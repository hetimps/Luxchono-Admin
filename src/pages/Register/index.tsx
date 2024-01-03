import { Paper, Grid, Typography, InputAdornment, IconButton } from '@mui/material'
import LoginImg from "../../assets/imag/LoginImg2.svg";
import Logo from "../../assets/imag/logo.svg"
import TextFields from '../../components/common/TextFields';
import "./style.scss"
import Buttons from '../../components/common/Buttons';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { STRING } from '../../constants/String';
import { REGEX } from "../../constants/Regex";
import { toast } from "react-toastify";
import Loader from '../../components/common/Loader';
import { useLoginMutation, useRegisterMutation } from '../../api/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface RegisterFormValues {
    email: string;
    password: string;
    userName: string
}

export default function Register() {
    const [Register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const Registers = useFormik<RegisterFormValues>({
        initialValues: {
            email: "",
            password: "",
            userName: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(STRING.LOGIN_EMAIL_REQUIRED).matches(REGEX.EMAIL, STRING.LOGIN_EMAIL_FORMAT),
            password: Yup.string().required(STRING.LOGIN_PASSWORD_REQUIRED).min(6, STRING.LOGIN_PASSWORD_FORMAT),
            userName: Yup.string().required(STRING.REGISTER_USERNAME_REQUIRED).min(3, STRING.REGISTER_USERNAME_FORMATE),
        }),
        onSubmit: async (values) => {
            try {
                const response: any = await Register(values);
                const { statusCode, message, result } = response?.data;
                if (statusCode === 200) {
                    toast.success(message)
                    navigate("/Otp", {
                        state: {
                            email: result?.email,
                            verifyOtp: result?.verifyOtp,
                        }
                    })
                } else {
                    toast.error(message)
                }
            } catch (error) {
                console.log(error)
            }
        },
    });

    return (
        <div className='flex items-center justify-center  h-[100vh] registercontainer'>
            <Paper className='!rounded-[40px] w-[1080px] overflow-hidden registerpepar  paperboxshadow '>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div>
                            <img src={LoginImg} alt="LoginImg" className='LoginImg' />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <form onSubmit={Registers.handleSubmit}>
                            {/* <div className='flex items-center justify-center m-[2.5rem]'>
                                <img src={Logo} alt="logo" className='!ml-[1rem]' />
                            </div> */}
                            <div className='flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] registerform mt-[3rem] '>
                                <Typography
                                    className='!font-extrabold'
                                    variant='h5'
                                    component="h5">
                                    {STRING.LOGIN_TITAL}
                                </Typography>
                                <Typography
                                    className='!font-bold text-light'
                                    component="span">
                                    {STRING.REGISTER_DESC}
                                </Typography>
                                <div className='!mt-[1.5rem] flex flex-col gap-[20px]' >
                                    <div >
                                        <div className='mb-[5px]'>
                                            <Typography
                                                className='!font-bold'
                                                component="span">
                                                {STRING.LOGIN_EMALI}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields className={"regsiterField"} name={"email"} values={Registers.values.email} onChange={Registers.handleChange}
                                                helperText={Registers.touched.email && Registers.errors.email} placeholder={STRING.LOGIN_EMAIL_PLACEHOLDER} autoComplete={'off'} />
                                        </div>
                                    </div>

                                    <div >
                                        <div className='mb-[5px]'>
                                            <Typography
                                                className='!font-bold'
                                                component="span">
                                                {STRING.REGISTER_USERNAME}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields className={"regsiterField"} name={"userName"} values={Registers.values.userName} onChange={Registers.handleChange}
                                                helperText={Registers.touched.userName && Registers.errors.userName} placeholder={STRING.REGISTER_USERNAME_PLACEHOLDER} autoComplete={'off'} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className='mb-[5px]'>
                                            <Typography
                                                component="span"
                                                className='!font-bold'>
                                                {STRING.LOGIN_PASSWORD}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields
                                                className={"regsiterField"}
                                                name={"password"}
                                                values={Registers.values.password}
                                                onChange={Registers.handleChange}
                                                helperText={Registers.touched.password && Registers.errors.password}
                                                placeholder={STRING.LOGIN_PASSWORD_PLACEHOLDER}
                                                autoComplete={'off'}
                                                type={showPassword ? 'text' : 'password'}
                                                action={togglePasswordVisibility}
                                                endAdornment={true}
                                                icons={showPassword ? <VisibilityIcon className='!text-[1.4rem]' /> : <VisibilityOffIcon className='!text-[1.4rem]' />}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? (<div className='flex items-center justify-center mt-[3rem]'>
                                    <Loader />
                                </div >) : (
                                    <>
                                        <Buttons type={"submit"} text={STRING.SIGN_UP} variant={"contained"} className={"registerButton"} />
                                        <span className='flex items-center justify-center mt-[0.2rem] gap-[2px]'>
                                            {STRING.LOGIN_LABEL}
                                            <Link to="/login" className="signin_link" >
                                                {STRING.SIGN_IN}
                                            </Link>
                                        </span>
                                    </>
                                )}
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}