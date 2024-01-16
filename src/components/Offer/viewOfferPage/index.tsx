import React, { useRef, useState } from 'react';
import ReactDateRangePicker from '../../common/DateRangePicker';
import { Avatar, IconButton, Paper, Typography } from '@mui/material';
import { STRING } from '../../../constants/String';
import TextFields from '../../common/TextFields';
import Selects from '../../common/Selects';
import Textareas from '../../common/Textarea';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../api/Utils';

export default function ViewOfferPage() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const offer = () => {
        navigate('/offer');
    };
    const wrapperRef = useRef(null);
    const [states, setStates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    return (
        <>
            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={offer}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.OFFER_VIEW}
                </Typography>
            </div>
            <form className='add_product'>
                <Paper className='mt-[1.5rem] paperboxshadow p-[1rem]'>
                    <div className='flex !flex-col mt-[1rem] pl-[3rem] pr-[3rem] '>
                        <div className='flex item-center !gap-[15px] mt-[1rem]'>
                            <div className='w-[11rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_IMAGE}
                                </Typography>
                            </div>
                            <div className='flex-col'>
                                <Avatar
                                    src={`${BASE_URL}/${state?.image}`}
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    alt='Image Preview'>
                                </Avatar>
                            </div>
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_NAME}
                                </Typography>
                            </div>
                            <TextFields value={state?.offerName} placeholder={STRING.OFFER_NAME_PLACHOLDER}
                                name={'offerName'} className={'productField'} />
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DATE}
                                </Typography>
                            </div>
                            <div className='flex-col' style={{ width: '100%' }}>
                                <ReactDateRangePicker
                                    state={states}
                                    setState={setStates}
                                    wrapperRef={wrapperRef}
                                    showDateRangePicker={false}
                                    setShowDateRangePicker={() => { }}
                                    fromDate={state?.dateFrom}
                                    toDate={state?.dateTo} />
                            </div>
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_BRANDS}
                                </Typography>
                            </div>
                            <div className='flex-col w-[100%]'>
                                <Selects isDisabled={true}
                                    selectedValues={state?.defaultBrands}
                                    placeholder={STRING.OFFER_BRANDS_PLACHOLDER} height={'45px'} isMulti={true} />
                            </div>
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_PRODUCT}
                                </Typography>
                            </div>
                            <div className='flex-col w-[100%]'>
                                <Selects isDisabled={true}
                                    selectedValues={state?.defaultProducts}
                                    placeholder={STRING.OFFER_PRODUCTS_PLACHOLDER} height={'45px'} isMulti={true} />
                            </div>
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_CODE}
                                </Typography>
                            </div>
                            <TextFields
                                value={state?.offerCode}
                                placeholder={STRING.OFFER_OFFERCODE_PLACHOLDER}
                                name={'offerCode'} className={'productField'} />
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DISCOUNT}
                                </Typography>
                            </div>
                            <TextFields
                                value={state?.discount}
                                type={'number'}
                                autoComplete={'off'} placeholder={STRING.OFFER_DISCOUNT_PLACHOLDER}
                                name={'discount'} className={'productField'} />
                        </div>
                        <div className='!flex !item-center !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DISCOUNT_TYPE}
                                </Typography>
                            </div>
                            <div className='flex-col w-[100%]'>
                                <Selects isDisabled={true}
                                    selectedValues={{ label: state?.discountType, value: state?.discountType }}
                                    placeholder={STRING.OFFER_DISCOUNTTYPE_PLACHOLDER}
                                    height={'45px'} />
                            </div>
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DESCRIPTION}
                                </Typography>
                            </div>
                            <Textareas
                                value={state?.description}
                                name={'description'}  rows={3} placeholder={STRING.OFFER_DESCRIPTION_PLACHOLDER} />
                        </div>
                        <div>
                        </div>
                    </div>
                </Paper>
            </form>
        </>



    );
}


