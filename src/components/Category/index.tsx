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
import { useGetAllCategoryQuery } from '../../api/Category';



export default function CategoryPage() {


    const { data: CategoryData, isFetching: CategoryFetching } = useGetAllCategoryQuery({});

    const [rows, setRows] = React.useState(null);

    const [categoryData, setCategoryData] = useState([]);

    const headCells: any[] = [
        {
            id: 'categoryName',
            numeric: false,
            disablePadding: true,
            label: 'Category name',
        },

    ];

    function createData(
        id: string | number,
        categoryName: any,

    ): any {
        return {
            id: id,
            productname: categoryName,

        };
    }


    useEffect(() => {
        const categoryData = CategoryData?.result?.data;
        setCategoryData(categoryData)
        const rowise = categoryData?.map((item: any) => {
            return createData(
                item._id,
                item.categoryName,
            );
        });
        setRows(rowise)
    }, [CategoryData])

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
                    <Buttons startIcon={<DeleteOutlineIcon />} variant={"contained"} text={"Delete"} className={`productheaderbtn2`} />
                    <Buttons startIcon={<ControlPointIcon />} variant={"contained"} text={STRING.CATEGORYADD} className="productheaderbtn2 addbtn" />
                </div>
            </Paper>

            <Paper className='!shadow-none h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search placeholder={STRING.CATEGORY_SEARCH_PLACHOLDER} />


            </Paper>

            <div className='mt-[1rem]'>
                {/* <Tables headCells={headCells} rows={rows} isFetching={CategoryFetching} /> */}
            </div>
        </div>
    )
}
