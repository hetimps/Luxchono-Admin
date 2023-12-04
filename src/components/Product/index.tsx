import React, { useEffect, useState } from 'react'
import "./style.scss"
import Buttons from '../Buttons'
import IosShareIcon from '@mui/icons-material/IosShare';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { IconButton, InputAdornment, Paper, useEventCallback } from '@mui/material';
import Search from '../Search.js';
import Selects from '../Selects';
import Tables from '../Table';
import { useDeleteProductMutation, useGetAllProductQuery } from '../../api/Product';
import { useGetAllCategoryQuery } from '../../api/Category';
import { useGetAllBrandApiQuery } from '../../api/Brand';
import { STRING } from '../../constants/String';
import TextFields from '../TextFields';
import { Box } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Dialogs from '../Dialogs';

import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

export default function ProductPage() {

    const [search, setsearch] = useState("");

    const { data: CategoryData, isFetching: CategoryFetching } = useGetAllCategoryQuery({});
    const { data: BrandData, isFetching: BrandFetching } = useGetAllBrandApiQuery({});
    const [DeleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
    const [producData, setProductData] = useState([]);
    // const [categoryData, setCategoryData] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState<any[]>([]);
    const [selectedCategoryValues, setSelectedCategoryValues] = useState<any[]>([]);
    const [searchCategoryValues, setSearchCategoryValues] = useState<any[]>([]);


    const [filteredBrand, setFilteredBrand] = useState<any[]>([]);
    const [selectedBrandValues, setSelectedBrandValues] = useState<any[]>([]);
    const [searchBrandValues, setSearchBrandValues] = useState<any[]>([]);

    console.log(searchBrandValues, "searchBrandValues")
    const [rows, setRows] = React.useState(null);
    const [input, setinput] = useState("");

    const [startPrice, setStartPrice] = useState("");

    const [endPrice, setEndPrice] = useState("");

    const [startStock, setStartStock] = useState("");

    const [endStock, setEndStock] = useState("");


    const { data, isFetching, refetch } = useGetAllProductQuery({
        search: search, category: searchCategoryValues, brands: searchBrandValues, startPrice: startPrice, endPrice: endPrice, startStockRange: startStock, endStockRange: endStock


    }, { refetchOnMountOrArgChange: true, });

    const [openDeleteConfirmation, setDeleteOpenConfirmation] = useState(false);

    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);

    console.log(selectedDeleteRows, "selectedDeleteRows")

    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows)
    }

    const handleDeleteOpenConfirmation = () => {
        setDeleteOpenConfirmation(true);
    };
    const handleDeleteCloseConfirmation = () => {
        setDeleteOpenConfirmation(false);
    };

    function createData(
        id: string | number,
        productname: any,
        category: any,
        price: number,
        stock: any,
        review: any,
        thumbnail: any,
    ): any {
        return {
            id: id,
            productname: productname,
            category: category,
            price: price,
            stock: stock,
            review: review,
            thumbnail: thumbnail
        };
    }


    useEffect(() => {
        const producData = data?.result?.data;
        setProductData(producData)
        const rowise = producData?.map((item: any) => {
            const category = item.category.map((cat: any) => cat.categoryName).join(', ');
            return createData(
                item._id,
                item.productName,
                category,
                item.price,
                item.stock,
                item.rating,
                item.thumbnail
            );
        });
        setRows(rowise)
    }, [data])

    useEffect(() => {
        //set select option value 
        const filteredCategories = CategoryData?.result?.data && (CategoryData?.result?.data as any[]).map((category: any) => ({
            label: category.categoryName,
            value: category._id
        }));
        setFilteredCategory(filteredCategories);

        // set serach api value 
        const values = selectedCategoryValues.map(category => category.value);
        setSearchCategoryValues(values);

    }, [CategoryData, selectedCategoryValues])


    useEffect(() => {
        const filterBrands = BrandData?.result?.data && (BrandData?.result?.data as any[]).map((brand: any) => ({
            label: brand.brandName,
            value: brand._id
        }))
        setFilteredBrand(filterBrands)
        const values = selectedBrandValues.map(brand => brand.value);
        setSearchBrandValues(values)
    }, [BrandData, selectedBrandValues])



    useEffect(() => {
        refetch()
    }, [search, refetch, searchCategoryValues, searchBrandValues, startPrice, endPrice, startStock, endStock]);

    const handleDelte = async () => {
        const response: any = await DeleteProduct({ ids: selectedDeleteRows })

        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)
        } else {
            toast.error(message)
        }

        response && handleDeleteCloseConfirmation()

        console.log(response, "response")
    }


    const headCells: any[] = [
        {
            id: 'productname',
            numeric: false,
            disablePadding: true,
            label: 'Product name',
        },
        {
            id: 'category',
            numeric: true,
            disablePadding: false,
            label: 'Category',
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price',
        },
        {
            id: 'stock',
            numeric: true,
            disablePadding: false,
            label: 'Stock',
        },
        {
            id: 'review',
            numeric: true,
            disablePadding: false,
            label: 'Review',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            label: 'Action',
        },
    ];


    return (
        <div className='productContainer'>
            <Paper className='!shadow-none h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem]'>
                <div className='productbtns flex justify-between'>
                    <div className='flex gap-[10px]'>
                        <Buttons startIcon={<IosShareIcon />} text={"Export"} variant={"outlined"} className={"productheaderbtn1"} />
                        <Buttons startIcon={<SystemUpdateAltIcon />} variant={"outlined"} text={"Import"} className={"productheaderbtn1"} />
                    </div>

                </div>

                <div className='flex gap-[10px]'>
                    <Buttons onClick={handleDeleteOpenConfirmation} startIcon={<DeleteOutlineIcon />} variant={"contained"} text={
                        selectedDeleteRows.length === 0
                            ? "Delete"
                            : `Delete ${selectedDeleteRows.length}`
                    } className={`productheaderbtn2 ${selectedDeleteRows.length > 0 ? '!w-[144px]' : ''
                        }`} />
                    <Buttons startIcon={<ControlPointIcon />} variant={"contained"} text={"Add Product"} className="productheaderbtn2 addbtn" />
                </div>
            </Paper>

            <Paper className='!shadow-none h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search
                    placeholder={STRING.PRODUCT_SEARCH_PLACHOLDER}
                    setinput={setinput}
                    input={input}
                    setsearch={setsearch} />
                <Selects width={"250px"} height={"45px"} placeholder={"Category"} options={filteredCategory} selectedValues={selectedCategoryValues} setSelectedValues={setSelectedCategoryValues} isMulti={true} />
                <Selects width={"250px"} height={"45px"} placeholder={"Brand"} options={filteredBrand} selectedValues={selectedBrandValues} setSelectedValues={setSelectedBrandValues} isMulti={true} />


                <Box className="prices">
                    <TextFields action={() => setStartPrice('')} icons={<ClearIcon className='!text-[1.2rem] ' />} endAdornment={true} type={"number"} onChange={(e: any) => setStartPrice(e.target.value)} value={startPrice} className="price" placeholder={"Start Price"} autoComplete={'off'} />
                    <SyncAltIcon className='text-black' />
                    <TextFields action={() => setEndPrice('')} icons={<ClearIcon className='!text-[1.2rem] ' />} endAdornment={true} type={"number"} onChange={(e: any) => setEndPrice(e.target.value)} value={endPrice} className="price" placeholder={"End Price"} autoComplete={'off'} />
                </Box>


                <Box className="prices" >
                    <TextFields action={() => setStartStock('')} icons={<ClearIcon className='!text-[1.2rem] ' />} endAdornment={true} type={"number"} onChange={(e: any) => setStartStock(e.target.value)} value={startStock} className="price" placeholder={"Start Stock"} autoComplete={'off'} />
                    <SyncAltIcon className='text-black' />
                    <TextFields action={() => setEndStock('')} icons={<ClearIcon className='!text-[1.2rem] ' />} endAdornment={true} type={"number"} onChange={(e: any) => setEndStock(e.target.value)} value={endStock} className="price" placeholder={"End Stock"} autoComplete={'off'} />
                </Box>
            </Paper>

            <div className='mt-[1rem]'>
                <Tables getSelectedDeleteRows={getSelectedDeleteRows} search={search} headCells={headCells} rows={rows} isFetching={isFetching} />
            </div>

            <Dialogs loading={deleteProductLoading} textClose={STRING.PRODUCT_CLOSE_BUTTON} textYes={STRING.PRODUCT_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmation} onClose={handleDeleteCloseConfirmation} tital={STRING.PRODUCT_DELETE_DESC} Action={handleDelte} />
        </div>
    )
}
