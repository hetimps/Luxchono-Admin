import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Paper, Avatar, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Buttons from '../../Buttons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style.scss';
import TextFields from '../../TextFields';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAddCategoryMutation } from '../../../api/Category';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import { STRING } from '../../../constants/String';



export default function EditCategoryPage() {

    const [imagePreview, setImagePreview] = useState<any>(null);

    const location = useLocation();
    const { state } = location;

    console.log(imagePreview, "imagePreview")


    useEffect(() => {

        console.log(state?.categoryName, "state?.categoryName")

        AddCategory.setFieldValue("categoryName", state?.categoryName)
        AddCategory.setFieldValue("image", state?.image)
        setImagePreview(state?.image)

    }, [state])

    console.log(state, "state")

    const [AddCategoryData, { isLoading }] = useAddCategoryMutation();
    const navigate = useNavigate();

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            AddCategory.setFieldValue("image", file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);

            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(imagePreview);
        }

    };

    const AddCategoryImg = () => {
        document.getElementById("fileInput")?.click()
    };


    const AddCategory = useFormik({
        initialValues: {
            categoryName: '',
            image: '',
        },

        validationSchema: Yup.object().shape({
            categoryName: Yup.string().required(STRING.CATEGORY_NAME_REQUIRED).min(3, STRING.CATEGORY_NAME_FORMAT),
            image: Yup.mixed().required(STRING.CATEGORY_NAME_IMAGE),
        }),

        onSubmit: async (values: any) => {
            console.log(values, "value");

            const response: any = await AddCategoryData(values);

            const { message, statusCode } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                navigate("/category")
            } else {
                toast.error(message);
            }
        },

    });

    const Category = () => {
        navigate("/category")
    }

    return (
        <>
            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={Category}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.CATEGORYEDIT}
                </Typography>
            </div>

            <form onSubmit={AddCategory.handleSubmit}>
                <Paper className='mt-[1.5rem] h-[450px] !shadow-none'>
                    <div className='flex justify-end'>
                        {isLoading ? (<Loader />) : (<Buttons type={"submit"} className={'category_add_button'} startIcon={<BookmarkIcon />} variant={'contained'} text={'Save'} />)}
                    </div>
                    <div className='flex !flex-col mt-[1rem] pl-[3rem] pr-[3rem] '>
                        <div className='flex item-center !gap-[15px]'  >

                            <div className='w-[12rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.CATEGORY_IMAGE}
                                </Typography>
                            </div>

                            {/* <TextFields name={"image"} values={AddCategory.values.image} onChange={handleFileChange} id={'fileInput'} type={'file'} style={{ display: 'none' }} /> */}
                            <TextFields
                                name={"image"}
                                values={AddCategory.values.image}
                                onChange={handleFileChange}
                                id={'fileInput'}
                                type={'file'}
                                accept={'image/*'} // This will allow only image files
                                style={{ display: 'none' }} />


                            <div className='flex-col'>
                                <Avatar
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    src={imagePreview}
                                    onClick={AddCategoryImg}
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>
                                <label className='ml-[1rem]'>
                                    {AddCategory.touched.image && AddCategory.errors.image && (
                                        <Typography variant='caption' className='!font-bold ' color='error'>
                                            {AddCategory.errors.image.toString()}
                                        </Typography>
                                    )}
                                </label>
                            </div>

                        </div>

                        <div className='!flex !item-center  !gap-[15px]'>

                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.CATEGORY_NAME}
                                </Typography>
                            </div>

                            {/* <TextFields autoComplete={'off'} placeholder={"Category Name"} values={AddCategory.values.categoryName}
                                onChange={AddCategory.handleChange}
                                // onChange={(e: any) => AddCategory.handleChange(e)}
                                // onBlur={(e: any) => {
                                //     const trimmedValue = e.target.value.trim();
                                //     AddCategory.handleBlur(e);
                                //     AddCategory.setFieldValue("categoryName", trimmedValue);
                                // }}
                                error={AddCategory.touched.categoryName && Boolean(AddCategory.errors.categoryName)}
                                helperText={AddCategory.touched.categoryName && AddCategory.errors.categoryName} name={"categoryName"} className={'categoryField'} /> */}

                            <TextFields
                                onChange={(e: any) => AddCategory.handleChange(e)}
                                onBlur={(e: any) => {
                                    const trimmedValue = e.target.value.trim();
                                    AddCategory.handleBlur(e);
                                    AddCategory.setFieldValue("categoryName", trimmedValue);
                                }}
                                autoComplete={'off'} placeholder={"Category Name"} value={AddCategory.values.categoryName}
                                error={AddCategory.touched.categoryName && Boolean(AddCategory.errors.categoryName)}
                                helperText={AddCategory.touched.categoryName && AddCategory.errors.categoryName} name={"categoryName"} className={'categoryField'} />
                        </div>
                    </div>
                </Paper>

            </form>


        </>
    );
}
