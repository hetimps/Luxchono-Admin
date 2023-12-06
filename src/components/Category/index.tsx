import React from 'react'
import { useEffect, useState } from 'react'
import "./style.scss"
import { IconButton, InputAdornment, Paper, useEventCallback } from '@mui/material';
import Buttons from '../Buttons';
import IosShareIcon from '@mui/icons-material/IosShare';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Search from '../Search.js';
import { STRING } from '../../constants/String';
import Tables from '../Table';
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../../api/Category';
import Dialogs from '../Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function CategoryPage() {

    const [selected, setSelected] = React.useState<readonly number[]>([]);

    const [search, setsearch] = useState("");

    const [DeleteCategory, { isLoading: deleteCategoryLoading }] = useDeleteCategoryMutation()

    console.log(search, "search")
    const { data: CategoryData, isFetching: CategoryFetching, refetch } = useGetAllCategoryQuery({
        search: search,
    });

    const [rows, setRows] = React.useState(null);
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState([]);

    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);


    const [input, setinput] = useState("");


    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows)
    }

    const [openDeleteConfirmation, setDeleteOpenConfirmation] = useState(false);

    const handleDeleteOpenConfirmation = () => {
        setDeleteOpenConfirmation(true);
    };
    const handleDeleteCloseConfirmation = () => {
        setDeleteOpenConfirmation(false);
        setSelected([])
    };

    const headCells: any[] = [

        {
            id: 'categoryName',
            numeric: false,
            disablePadding: true,
            label: 'Category name',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            label: 'Action',
        },

    ];

    function createData(
        id: string | number,
        categoryName: any,
        image: any,


    ): any {
        return {
            id: id,
            categoryName: categoryName,
            image: image
        };
    }


    useEffect(() => {
        const categoryData = CategoryData?.result?.data;
        setCategoryData(categoryData)
        const rowise = categoryData?.map((item: any) => {
            return createData(
                item._id,
                item.categoryName,
                item.image
            );
        });
        setRows(rowise)
    }, [CategoryData])

    useEffect(() => {
        refetch()
    }, [search, refetch])

    console.log(rows, "rows")

    const handleDelete = async () => {
        const response: any = await DeleteCategory({ ids: selectedDeleteRows })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)
            setSelected([])

        } else {
            toast.error(message)
        }
        response && handleDeleteCloseConfirmation()
    }

    const AddCategory = () => {
        navigate("/addcategory")
    }

    //delete single category

    const [selectedCategoryIdSingle, setSelectedCategoryIdSingle] = useState<number[]>([])

    const [openDeleteConfirmationSingle, setDeleteOpenConfirmationSingle] = useState(false);


    const handleDeleteSingleOpenConfirmation = (row: any) => {
        setDeleteOpenConfirmationSingle(true);
        setSelectedCategoryIdSingle([row?.id]);

    };

    const handleDeleteSingleCloseConfirmations = () => {
        setDeleteOpenConfirmationSingle(false);
        setSelectedCategoryIdSingle([])
    };

    const handleDeleteSingle = async () => {
        const response: any = await DeleteCategory({ ids: selectedCategoryIdSingle })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)

        } else {
            toast.error(message)
        }
        response && handleDeleteSingleCloseConfirmations()
    }

    return (


        <div className='productContainer'>
            <Paper className='!shadow-none h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem]'>
                <div className='productbtns flex justify-between'>
                    <div className='flex gap-[10px]'>
                        <Buttons startIcon={<IosShareIcon />} text={"Export"} variant={"outlined"} className={"productheaderbtn1"} />
                        {/* <Buttons startIcon={<SystemUpdateAltIcon />} variant={"outlined"} text={"Import"} className={"productheaderbtn1"} /> */}
                    </div>

                </div>

                <div className='flex gap-[10px]'>
                    {/* <Buttons startIcon={<DeleteOutlineIcon />} variant={"contained"} text={"Delete"} className={`productheaderbtn2`} /> */}
                    {selected.length > 0 && <Buttons onClick={handleDeleteOpenConfirmation} startIcon={<DeleteOutlineIcon />} variant={"contained"} text={
                        selectedDeleteRows.length === 0
                            ? "Delete"
                            : `Delete ${selectedDeleteRows.length}`
                    } className={`productheaderbtn2 ${selectedDeleteRows.length > 0 ? '!w-[135px]' : ''
                        }`} />}
                    <Buttons onClick={AddCategory} startIcon={<ControlPointIcon />} variant={"contained"} text={STRING.CATEGORYADD} className="productheaderbtn2 addbtn" />
                </div>
            </Paper>

            <Paper className='!shadow-none h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search setinput={setinput}
                    input={input}
                    setsearch={setsearch} placeholder={STRING.CATEGORY_SEARCH_PLACHOLDER} />
            </Paper>

            <div className='mt-[1rem]'>
                <Tables handleDeleteOpen={handleDeleteSingleOpenConfirmation} selected={selected} setSelected={setSelected} Category={"Category"} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={CategoryFetching} />
            </div>
            <Dialogs loading={deleteCategoryLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmation} onClose={handleDeleteCloseConfirmation} tital={STRING.DELETE_SURE} desc={STRING.CATEGORY_DELETE_DESC} Action={handleDelete} />

            {/* single delete */}
            <Dialogs loading={deleteCategoryLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} tital={STRING.DELETE_SURE} desc={STRING.CATEGORY_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmationSingle} onClose={handleDeleteSingleCloseConfirmations} Action={handleDeleteSingle} />
        </div>
    )
}
