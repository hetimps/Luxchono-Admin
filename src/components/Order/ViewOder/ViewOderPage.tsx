import { IconButton, Typography, Paper, Avatar, Select } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../style.scss';
import TextFields from '../../common/TextFields';
import { useLocation, useNavigate } from 'react-router-dom';
import { STRING } from '../../../constants/String';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../api/Utils';
import dayjs from 'dayjs';

export default function ViewOrderPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const [OrderData, setOrderData] = useState<any>("");
    const [FullAddress, setFullAddress] = useState("")
    const [CreateOnDate, setCreateOnDate] = useState("")
    const [ProductAmount, setProductAmount] = useState("")
    const Category = () => {
        navigate("/order")
    }
    useEffect(() => {
        setOrderData(state)
        setFullAddress(`${OrderData?.shippingAddress?.address} , ${OrderData?.shippingAddress?.city} - ${OrderData?.shippingAddress?.pincode}`)
        setCreateOnDate(dayjs(OrderData?.createdAt).format('MMM DD, YYYY [at] hh:mm A'))
        setProductAmount(`${OrderData?.products?.productId?.price?.toLocaleString('en-IN')} ₹`)
    }, [state, OrderData])

    return (
        <>
            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={Category}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.ORDER_VIEW}
                </Typography>
            </div>

            <form className='add_product'>
                <Paper className='mt-[1rem] p-[1rem]  paperboxshadow'>

                    <div className='flex !flex-col  pl-[3rem] pr-[3rem] '>

                        <div className='flex item-center !gap-[15px] mt-[0.5rem]'>
                            <div className='w-[12rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_IMAGE}
                                </Typography>
                            </div>

                            <div className='flex-col'>
                                <Avatar
                                    src={`${BASE_URL}/${OrderData?.products?.productId?.thumbnail}`}
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    alt='Product Imgae'>
                                </Avatar>
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_ID}
                                </Typography>
                            </div>
                            <TextFields value={OrderData?.id}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_CUSTOMER_NAME}
                                </Typography>
                            </div>
                            <TextFields value={OrderData?.shippingAddress?.fullName}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_CREATE_ON}
                                </Typography>
                            </div>
                            <TextFields value={CreateOnDate}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_METHOD}
                                </Typography>
                            </div>
                            <TextFields
                                value={OrderData?.method}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_AMOUNT}
                                </Typography>
                            </div>
                            <TextFields
                                value={ProductAmount}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_STATUS}
                                </Typography>
                            </div>
                            <TextFields
                                value={OrderData?.status}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_PRODUCT_NAME}
                                </Typography>
                            </div>
                            <TextFields
                                value={OrderData?.products?.productId?.productName}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_QTY}
                                </Typography>
                            </div>
                            <TextFields
                                value={OrderData?.products?.quantity}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_ADDRESS}
                                </Typography>
                            </div>
                            <TextFields
                                value={FullAddress}
                                className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ORDER_NUMBER}
                                </Typography>
                            </div>
                            <TextFields
                                value={OrderData?.shippingAddress?.phone}
                                className={'productField'} />
                        </div>
                    </div>
                </Paper>
            </form>
        </>
    );
}


