import React, { useEffect, useRef, useState } from 'react'
import ReactDateRangePicker from '../../common/DateRangePicker'
import { Avatar, IconButton, Paper, Typography } from '@mui/material';
import Buttons from '../../common/Buttons';
import { STRING } from '../../../constants/String';
import TextFields from '../../common/TextFields';
import Selects from '../../common/Selects';
import Textareas from '../../common/Textarea';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetAllBrandApiQuery } from '../../../api/Brand';
import { useGetAllProductQuery } from '../../../api/Product';
import { useAddOfferMutation, useEditOfferMutation } from '../../../api/Offer';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';
import { BASE_URL } from '../../../api/Utils';
import { Discount } from '../../../constants/Array';

export default function EditOfferPage() {
    const location = useLocation();
    const { state } = location;

    const { data: BrandData, isFetching: BrandFetching } = useGetAllBrandApiQuery({});
    const { data: ProductData, isFetching: ProductFetching, refetch } = useGetAllProductQuery({});
    const [EditProduct, { isLoading }] = useEditOfferMutation();
    const navigate = useNavigate();
    const [filteredBrand, setFilteredBrand] = useState<any[]>([]);
    const [selectedBrandValues, setSelectedBrandValues] = useState<any[]>([]);
    const [filteredProduct, setFilteredProduct] = useState<any[]>([]);
    const [selectedProductValues, setSelectedProductValues] = useState<any[]>([]);
    const [selectedDiscountTypeValues, setSelectedDiscountTypeValues] = useState<any>();
    const [OfferId, setOfferId] = useState()
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [imagePreview, setImagePreview] = useState<any>(null);
    const [OfferImage, setOfferImage] = useState();

    const offer = () => {
        navigate("/offer")
    }

    useEffect(() => {
        AddOffer.setFieldValue("offerName", state?.offerName)
        AddOffer.setFieldValue("offerCode", state?.offerCode)
        AddOffer.setFieldValue("description", state?.description)
        AddOffer.setFieldValue("discount", state?.discount)
        setFromDate(state?.dateFrom)
        setToDate(state?.dateTo)
        setOfferImage(state?.image)
        setOfferId(state?.id)
        AddOffer.setFieldValue("image", state?.image)
        setSelectedDiscountTypeValues({ label: state?.discountType, value: state?.discountType })
        setSelectedBrandValues(state?.defaultBrands)
        setSelectedProductValues(state?.defaultProducts)
    }, [state])

    //product api
    useEffect(() => {
        const filterProducts = ProductData?.result?.data && (ProductData?.result?.data as any[]).map((product: any) => ({
            label: product.productName,
            value: product._id
        }))
        setFilteredProduct(filterProducts)
        const ProductValues = selectedProductValues?.map(product => product.value);
        AddOffer.setFieldValue("products", ProductValues)
    }, [ProductData, selectedProductValues])

    //brand api 
    useEffect(() => {
        const filterBrands = BrandData?.result?.data && (BrandData?.result?.data as any[]).map((brand: any) => ({
            label: brand.brandName,
            value: brand._id
        }))
        setFilteredBrand(filterBrands)
        const BrandValues = selectedBrandValues?.map(brand => brand.value);
        AddOffer.setFieldValue("brands", BrandValues)
    }, [BrandData, selectedBrandValues])

    //form data
    const AddOffer = useFormik({
        initialValues: {
            image: "",
            offerName: "",
            offerCode: "",
            description: "",
            discount: "",
            discountType: "",
            dateFrom: "",
            dateTo: "",
            brands: [],
            products: []
        },
        validationSchema: Yup.object().shape({
            offerName: Yup.string().trim().required(STRING.OFFER_OFFERNAME_REQUIRED).min(3, STRING.OFFER_OFFERNAME_FORMATE),
            discountType: Yup.string().required(STRING.OFFER_DISCOUNTTYPE_REQUIRED),
            offerCode: Yup.string().trim().required(STRING.OFFER_OFFERCODE_REQUIRED),
            discount: Yup.string().trim().required(STRING.OFFER_DISOUNT_REQUIRED),
            brands: Yup.array().min(1, STRING.OFFER_BRANDS_REQUIRED),
            products: Yup.array().min(1, STRING.OFFER_PRODUCTS_REQUIRED),
            image: Yup.mixed().required(STRING.OFFER_IMAGE_REQUIRED).test("fileFormat", STRING.IMAGE_FORMATES, (value: any) => {
                if (value) {
                    const acceptedFormats = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"].includes(value.type);
                    const accepteDefaltFormats = typeof value === 'string' && value.endsWith(".png") || typeof value === 'string' && value.endsWith(".jpeg") ||
                        typeof value === 'string' && value.endsWith(".jpg") || typeof value === 'string' && value.endsWith(".svg");
                    return acceptedFormats || accepteDefaltFormats;
                }
                return true;
            }),
        }),

        onSubmit: async (values: any) => {
            values.id = OfferId;
            const response: any = await EditProduct(values);
            const { message, statusCode } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                navigate("/offer")
            } else {
                toast.error(message);
            }
        },
    })

    //image uplaod 
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            AddOffer.setFieldValue("image", file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(imagePreview);
        }
    };

    const AddOfferImg = () => {
        document.getElementById("fileInput")?.click()
    };

    //date range
    const wrapperRef = useRef(null);
    const [states, setStates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [prevDate, setPrevDate] = useState(states);

    const [showDateRangePicker, setShowDateRangePicker] = useState(false);

    //date and discount type
    useEffect(() => {
        AddOffer.setFieldValue("discountType", selectedDiscountTypeValues?.value)
    }, [selectedDiscountTypeValues])

    useEffect(() => {
        AddOffer.setFieldValue("dateFrom", fromDate)
        AddOffer.setFieldValue("dateTo", toDate)
    }, [fromDate, toDate])


    useEffect(() => {
        AddOffer.setFieldValue("dateFrom", fromDate)
        AddOffer.setFieldValue("dateTo", toDate)
    }, [fromDate, toDate])

    return (
        <>
            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={offer}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.OFFER_EDIT}
                </Typography>
            </div>

            <form onSubmit={AddOffer.handleSubmit} className='add_product'>
                <Paper className='mt-[1.5rem] h-[800px] !shadow-none'>
                    <div className='flex justify-end'>
                        {isLoading ? (<Loader />) : (<Buttons type={"submit"} className={'category_add_button'} startIcon={<BookmarkIcon />} variant={'contained'} text={STRING.SAVE} />)}
                    </div>
                    <div className='flex !flex-col mt-[1rem] pl-[3rem] pr-[3rem] '>

                        <div className='flex item-center !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_IMAGE}
                                </Typography>
                            </div>

                            <TextFields
                                name={"image"}
                                values={AddOffer.values.image}
                                onChange={handleFileChange}
                                id={'fileInput'}
                                type={'file'}
                                accept={'image/png'}
                                style={{ display: 'none' }} />

                            <div className='flex-col'>

                                <Avatar
                                    src={imagePreview === null ? `${BASE_URL}/${OfferImage}` : `${imagePreview}`}
                                    onClick={AddOfferImg}
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>
                            </div>
                            <div className='flex items-end' >
                                {AddOffer.touched.image && AddOffer.errors.image && (
                                    <Typography variant='caption' className='!font-bold ' color='error'>
                                        {AddOffer.errors.image.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_NAME}
                                </Typography>
                            </div>
                            <TextFields error={AddOffer.touched.offerName && Boolean(AddOffer.errors.offerName)}
                                helperText={AddOffer.touched.offerName && AddOffer.errors.offerName} onChange={AddOffer.handleChange} value={AddOffer.values.offerName} autoComplete={'off'} placeholder={STRING.OFFER_NAME_PLACHOLDER}
                                name={"offerName"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DATE}
                                </Typography>
                            </div>
                            <div className='flex-col' style={{ width: '70rem' }}>
                                <ReactDateRangePicker
                                    wrapperRef={wrapperRef}
                                    state={states}
                                    setState={setStates}
                                    prevDate={prevDate}
                                    setPrevDate={setPrevDate}
                                    fromDate={fromDate}
                                    setFromDate={setFromDate}
                                    toDate={toDate}
                                    setToDate={setToDate}
                                    showDateRangePicker={showDateRangePicker}
                                    setShowDateRangePicker={setShowDateRangePicker}
                                />
                                {(AddOffer.submitCount > 0 && !fromDate && !toDate) && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {STRING.OFFER_DISCOUNT_REQUIRED}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_BRANDS}
                                </Typography>
                            </div>
                            <div className='flex-col'>
                                <Selects options={filteredBrand} selectedValues={selectedBrandValues} setSelectedValues={setSelectedBrandValues} placeholder={STRING.OFFER_BRANDS_PLACHOLDER} width={"70rem"} height={"45px"} isMulti={true} />
                                {AddOffer.touched.brands && AddOffer.errors.brands && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {AddOffer.errors.brands.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>


                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_PRODUCT}
                                </Typography>
                            </div>
                            <div className='flex-col'>
                                <Selects options={filteredProduct} selectedValues={selectedProductValues} setSelectedValues={setSelectedProductValues} placeholder={STRING.OFFER_PRODUCTS_PLACHOLDER} width={"70rem"} height={"45px"} isMulti={true} />
                                {AddOffer.touched.products && AddOffer.errors.products && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {AddOffer.errors.products.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_CODE}
                                </Typography>
                            </div>
                            <TextFields error={AddOffer.touched.offerCode && Boolean(AddOffer.errors.offerCode)}
                                helperText={AddOffer.touched.offerCode && AddOffer.errors.offerCode} onChange={AddOffer.handleChange} value={AddOffer.values.offerCode} autoComplete={'off'} placeholder={STRING.OFFER_OFFERCODE_PLACHOLDER}
                                name={"offerCode"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DISCOUNT}
                                </Typography>
                            </div>
                            <TextFields error={AddOffer.touched.discount && Boolean(AddOffer.errors.discount)}
                                helperText={AddOffer.touched.discount && AddOffer.errors.discount} onChange={AddOffer.handleChange} value={AddOffer.values.discount} type={"number"} autoComplete={'off'} placeholder={STRING.OFFER_DISCOUNT_PLACHOLDER}
                                name={"discount"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DISCOUNT_TYPE}
                                </Typography>
                            </div>
                            <div className='flex-col'>
                                <Selects
                                    options={Discount}
                                    selectedValues={selectedDiscountTypeValues}
                                    setSelectedValues={setSelectedDiscountTypeValues}
                                    placeholder={STRING.OFFER_DISCOUNTTYPE_PLACHOLDER}
                                    width={"70rem"}
                                    height={"45px"} />

                                {(AddOffer.submitCount > 0 && AddOffer.errors.discountType) && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {AddOffer.errors.discountType.toString()}
                                    </Typography>
                                )}
                            </div>

                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DESCRIPTION}
                                </Typography>
                            </div>
                            <Textareas error={AddOffer.touched.description && Boolean(AddOffer.errors.description)}
                                helperText={AddOffer.touched.description && AddOffer.errors.description} onChange={AddOffer.handleChange} value={AddOffer.values.description} name={"description"} width={"70rem"} rows={3} placeholder={STRING.OFFER_DESCRIPTION_PLACHOLDER} />
                        </div>
                        <div>
                        </div>
                    </div>
                </Paper>
            </form>
        </>



    )
}

