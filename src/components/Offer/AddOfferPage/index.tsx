import React, { useRef, useState } from 'react'
import ReactDateRangePicker from '../../DateRangePicker'
import { Avatar, IconButton, Paper, Typography } from '@mui/material';
import Buttons from '../../Buttons';
import { STRING } from '../../../constants/String';
import TextFields from '../../TextFields';
import Selects from '../../Selects';
import Textareas from '../../Textarea';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function AddOfferPage() {
    const navigate = useNavigate();


    const offer = () => {
        navigate("/offer")
    }

    //date range
    const wrapperRef = useRef(null);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [prevDate, setPrevDate] = useState(state);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showDateRangePicker, setShowDateRangePicker] = useState(false);


    return (

        <>

            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={offer}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {"Add Offer"}
                </Typography>
            </div>
            <form className='add_product'>
                <Paper className='mt-[1.5rem] h-[860px] !shadow-none'>
                    <div className='flex justify-end'>
                        <Buttons type={"submit"} className={'product_add_button'} startIcon={<BookmarkIcon />} variant={'contained'} text={'Save'} />
                    </div>
                    <div className='flex !flex-col mt-[1rem] pl-[3rem] pr-[3rem] '>


                        <div className='flex item-center !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {"image :-"}
                                </Typography>
                            </div>

                            <TextFields
                                name={"image"}
                                id={'fileInput'}
                                type={'file'}
                                accept={'image/png'}
                                style={{ display: 'none' }} />

                            <div className='flex-col'>
                                <Avatar
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>
                            </div>
                            {/* <div className='flex items-end' >
                        {AddProduct.touched.thumbnail && AddProduct.errors.thumbnail && (
                            <Typography variant='caption' className='!font-bold ' color='error'>
                                {AddProduct.errors.thumbnail.toString()}
                            </Typography>
                        )}
                    </div> */}
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {"Offer Name :-"}
                                </Typography>
                            </div>
                            <TextFields placeholder={"Offer Name"}
                                name={"offerName"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {"Offer Code :-"}
                                </Typography>
                            </div>
                            <TextFields placeholder={"Offer Code"}
                                name={"offerCode"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {"Description :-"}
                                </Typography>
                            </div>
                            <Textareas name={"description"} width={"70rem"} rows={3} placeholder={"Description"} />
                        </div>


                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {"Discount :-"}
                                </Typography>
                            </div>
                            <TextFields type={"number"} autoComplete={'off'} placeholder={"Discount"}
                                name={"discount"} className={'productField'} />
                        </div>


                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold '>
                                    {"Discount Type :-"}
                                </Typography>
                            </div>
                            <div className='flex-col'>
                                <Selects placeholder={"Discount Type"} width={"70rem"} height={"45px"} />
                                {/* {(AddProduct.submitCount > 0 && AddProduct.errors.brand) && (
                            <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                {AddProduct.errors.brand.toString()}
                            </Typography>
                        )} */}
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {"Brands"}
                                </Typography>
                            </div>
                            <div className='flex-col'>
                                <Selects placeholder={"Select Brands"} width={"70rem"} height={"45px"} isMulti={true} />
                                {/* {AddProduct.touched.category && AddProduct.errors.category && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {AddProduct.errors.category.toString()}
                                    </Typography>
                                )} */}
                            </div>
                        </div>


                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {"Products"}
                                </Typography>
                            </div>
                            <div className='flex-col'>
                                <Selects placeholder={"Select Products"} width={"70rem"} height={"45px"} isMulti={true} />
                                {/* {AddProduct.touched.category && AddProduct.errors.category && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {AddProduct.errors.category.toString()}
                                    </Typography>
                                )} */}
                            </div>
                        </div>

                        <div>


                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {"Products :-"}
                                </Typography>
                            </div>
                            <div className='flex-col'>
                                <ReactDateRangePicker
                                    wrapperRef={wrapperRef}
                                    state={state}
                                    setState={setState}
                                    prevDate={prevDate}
                                    setPrevDate={setPrevDate}
                                    fromDate={fromDate}
                                    setFromDate={setFromDate}
                                    toDate={toDate}
                                    setToDate={setToDate}
                                    showDateRangePicker={showDateRangePicker}
                                    setShowDateRangePicker={setShowDateRangePicker} />
                            </div>
                        </div>


                    </div>
                </Paper>
            </form>
        </>



    )
}


