import { Paper, Grid, Typography, InputAdornment, IconButton } from '@mui/material'
import LoginImg from "../../assets/imag/LoginImg.svg";
import Logo from "../../assets/imag/logo.svg"
import TextFields from '../../components/TextFields';
import "./style.scss"
import Buttons from '../../components/Buttons';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { STRING } from '../../constants/String';
import { REGEX } from "../../constants/Regex";
import { toast } from "react-toastify";
import Loader from '../../components/Loader';
import { useLoginMutation } from '../../api/Login';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [Login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const login = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(STRING.LOGIN_EMAIL_REQUIRED).matches(REGEX.EMAIL, STRING.LOGIN_EMAIL_FORMAT),
      password: Yup.string().required(STRING.LOGIN_PASSWORD_REQUIRED).min(6, STRING.LOGIN_PASSWORD_FORMAT)
    }),
    onSubmit: async (values) => {
      try {
        const response: any = await Login(values);
        const { statusCode, message, result } = response?.data;
        if (statusCode === 200) {
          toast.success(message)
          await localStorage.setItem("token", result?.Token)
          const token = localStorage.getItem("token");
        
            console.log("hellooooo")
            navigate("/product")
          
        } else {
          toast.error(message)
        }
      } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <div className='flex items-center justify-center  h-[100vh] logincontainer'>
      <Paper className='!rounded-[40px] w-[1080px] overflow-hidden loginpepar'>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div>
              <img src={LoginImg} alt="LoginImg" className='LoginImg' />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <form onSubmit={login.handleSubmit}>
              <div className='flex items-center justify-center m-[2.5rem]'>
                <img src={Logo} alt="logo" className='!ml-[1rem]' />
              </div>
              <div className='flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] lgoinform'>
                <Typography
                  className='!font-extrabold'
                  variant='h5'
                  component="h5">
                  {STRING.LOGIN_TITAL}
                </Typography>
                <Typography
                  className='!font-bold text-light'
                  component="span">
                  {STRING.LOGIN_DESC}
                </Typography>
                <div className='!mt-[2rem] flex flex-col gap-[20px]' >
                  <div >
                    <div className='mb-[7px]'>
                      <Typography
                        className='!font-bold'
                        component="span">
                        {STRING.LOGIN_EMALI}
                      </Typography>
                    </div>
                    <div>
                      <TextFields className={"loginField"} name={"email"} values={login.values.email} onChange={login.handleChange} error={login.touched.email && Boolean(login.errors.email)}
                        helperText={login.touched.email && login.errors.email} placeholder={STRING.LOGIN_EMAIL_PLACEHOLDER} autoComplete={'off'} />
                    </div>
                  </div>
                  <div>
                    <div className='mb-[7px]'>
                      <Typography
                        component="span"
                        className='!font-bold'>
                        {STRING.LOGIN_PASSWORD}
                      </Typography>
                    </div>
                    <div>
                      <TextFields
                        className={"loginField"}
                        name={"password"}
                        values={login.values.password}
                        onChange={login.handleChange}
                        error={login.touched.password && Boolean(login.errors.password)}
                        helperText={login.touched.password && login.errors.password}
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
                </div >) : (<Buttons type={"submit"} text={STRING.LOGIN_BUTTON} variant={"contained"} className={"loginButton"} values={login.values.password} />)}
              </div>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
