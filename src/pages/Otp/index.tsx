import { Paper, Grid, Typography} from '@mui/material';
import LoginImg from '../../assets/imag/LoginImg2.svg';
import Logo from '../../assets/imag/logo.svg';
import './style.scss';
import Buttons from '../../components/common/Buttons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';
import { useResendOtpMutation, useVerifyOtpMutation } from '../../api/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import OtpTimer from '../../components/common/OtpTimer';

interface OtpFormValues {
    verifyOtp: string;
}

export default function OtpVerify() {
    const [VerifyOtp, { isLoading }] = useVerifyOtpMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [Rsend, { isLoading: ResendOtpLoading }] = useResendOtpMutation();
    const OtpVerifys = useFormik<OtpFormValues>({
        initialValues: {
            verifyOtp: state?.verifyOtp,
        },
        validationSchema: Yup.object().shape({
            verifyOtp: Yup.string().length(4, 'Enter valid OTP')
                .required('OTP is a required '),

        }),
        onSubmit: async (values) => {
            const body = {
                email: state?.email,
                verifyOtp: values?.verifyOtp
            };
            const response: any = await VerifyOtp(body);
            const { statusCode, message} = response?.data;
            if (statusCode === 200) {
                navigate('/login');
                toast.success(message);
            } else {
                toast.error(message);
            }
        },
    });

    function matchIsNumeric(text: any) {
        const isNumber = typeof text === 'number';
        const isString = typeof text === 'string';
        return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
    }

    const validateChar = (value: any) => {
        return matchIsNumeric(value) && value !== ' ';
    };

    const handleResend = async () => {
        const body = {
            email: state?.email,
        };
        const response: any = await Rsend(body);
        const { statusCode, message} = response?.data;
        if (statusCode === 200) {
            toast.success(message);
        } else {
            toast.error(message);
        }

    };
    return (
        <div className='flex items-center justify-center  h-[100vh] otpcontainer'>
            <Paper className='!rounded-[40px] w-[1080px] overflow-hidden otppepar  paperboxshadow '>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div>
                            <img src={LoginImg} alt="LoginImg" className='LoginImg' />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <form onSubmit={OtpVerifys.handleSubmit}>
                            <div className='flex items-center justify-left  m-[2.5rem] !ml-[1.5rem] !mt-[4rem]'>
                                <img src={Logo} alt="logo" className='!ml-[1rem]' />
                            </div>
                            <div className='flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] lgoinform mt-[1rem]'>
                                <Typography
                                    className='!font-extrabold'
                                    variant='h5'
                                    component="h5">
                                    {'Verify email'}
                                </Typography>
                                <Typography
                                    className='!font-bold text-light'
                                    component="span">
                                    {`Otp is sent to ${state?.email} Please Check your mail.`}
                                </Typography>
                                <div className='!mt-[2rem] flex flex-col gap-[20px]' >

                                    <MuiOtpInput
                                        onChange={OtpVerifys.handleChange('verifyOtp')}
                                        value={OtpVerifys.values.verifyOtp}
                                        TextFieldsProps={{ placeholder: '-' }}
                                        // autoFocus
                                        length={4}
                                        validateChar={validateChar}
                                        style={{ fontFamily: 'Poppins' }} />
                                </div>
                                {isLoading || ResendOtpLoading ? (<div className='flex items-center justify-center mt-[3rem]'>
                                    <Loader />
                                </div >) : (
                                    <>
                                        <Buttons type={'submit'} text={'Next'} variant={'contained'} className={'otpButton'} />

                                        <div className='flex items-center justify-center mt-[1rem] '>
                                            <OtpTimer expiryTimeInSeconds={60} onResend={handleResend} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}