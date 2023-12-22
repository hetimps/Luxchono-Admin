import React from 'react'
import { useEffect, useState } from 'react'
import "./style.scss"
import { Icon, Paper } from '@mui/material';
import Buttons from '../Buttons';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Search from '../Search.js';
import { STRING } from '../../constants/String';
import Tables from '../Table';
import Dialogs from '../Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDeleteBrandMutation, useGetAllBrandApiQuery } from '../../api/Brand';
import { exportToCsv } from '../../api/Utils';
import { useGetAllOfferQuery } from '../../api/Offer';

export default function OfferPage() {
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [search, setsearch] = useState("");
    const [DeleteBrand, { isLoading: deleteBrandLoading }] = useDeleteBrandMutation();



    const { data: OfferData, isFetching: OfferFetching, refetch } = useGetAllOfferQuery({})


    const [rows, setRows] = useState<any[]>([]);
    const navigate = useNavigate();

    const [OfferDatas, setOfferDatas] = useState([]);


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
            id: 'offerName',
            numeric: false,
            disablePadding: true,
            label: 'Offer Name',
        },
        {
            id: 'discount',
            numeric: true,
            disablePadding: false,
            label: 'Discount',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            // label: 'Action',
        },
    ];

    function createData(
        id: string | number,
        offerName: any,
        discount: any,
        discountType: any

    ): any {
        return {
            id: id,
            offerName: offerName,
            discount: discount,
            discountType: discountType
        };
    }

    useEffect(() => {
        const OfferDatas = OfferData?.result?.data;
        setOfferDatas(OfferDatas)
        const rowise = OfferDatas?.map((item: any) => {
            return createData(
                item._id,
                item.offerName,
                item.discount,
                item.discountType
            );
        });
        setRows(rowise)
    }, [OfferData])

    useEffect(() => {
        refetch()
    }, [search, refetch])

    console.log(rows, "rows")

    const handleDelete = async () => {
        const response: any = await DeleteBrand({ ids: selectedDeleteRows })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)
            setSelected([])

        } else {
            toast.error(message)
        }
        response && handleDeleteCloseConfirmation()
    }

    const AddOffer = () => {
        navigate("/addoffer")
    }

    //delete single category

    const [selectedIdSingle, setSelectedIdSingle] = useState<number[]>([])

    const [openDeleteConfirmationSingle, setDeleteOpenConfirmationSingle] = useState(false);

    const handleDeleteSingleOpenConfirmation = (row: any) => {
        setDeleteOpenConfirmationSingle(true);
        setSelectedIdSingle([row?.id]);
    };

    const handleDeleteSingleCloseConfirmations = () => {
        setDeleteOpenConfirmationSingle(false);
        setSelectedIdSingle([])
    };

    const handleDeleteSingle = async () => {
        const response: any = await DeleteBrand({ ids: selectedIdSingle })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)

        } else {
            toast.error(message)
        }
        response && handleDeleteSingleCloseConfirmations()
    }

    const handleCvsExport = () => {
        const exportColumns = [
            { id: 'brandName', label: 'Brand Name' },
        ];
        exportToCsv(rows, exportColumns, 'Brand_data');
    }

    return (

        <div className='productContainer'>
            <Paper className='!shadow-none h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem]'>
                <div className='productbtns flex justify-between'>
                    <div className='flex gap-[10px]'>
                        <Buttons onClick={handleCvsExport} startIcon={<IosShareIcon />} text={STRING.EXPORT_BUTTON} variant={"outlined"} className={"productheaderbtn1"} />
                        {/* <Buttons startIcon={<SystemUpdateAltIcon />} variant={"outlined"} text={"Import"} className={"productheaderbtn1"} /> */}
                    </div>
                </div>
                <div className='flex gap-[10px]'>
                    {(selected.length > 0 && rows?.length > 0) && <Buttons onClick={handleDeleteOpenConfirmation} startIcon={<DeleteOutlineIcon />} variant={"contained"} text={
                        selectedDeleteRows.length === 0
                            ? `${STRING.DELETE_BUTTON}`
                            : `${STRING.DELETE_BUTTON} ( ${selectedDeleteRows.length} )`
                    } className={`productheaderbtn2 ${selectedDeleteRows.length > 0 ? '!w-[135px]' : ''
                        }`} />}
                    <Buttons onClick={AddOffer} startIcon={<ControlPointIcon />} variant={"contained"} text={"Add Offer"} className="productheaderbtn2 addbtn" />
                </div>
            </Paper>

            <Paper className='!shadow-none h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search setinput={setinput}
                    input={input}
                    setsearch={setsearch} placeholder={"Search Offer"} />
            </Paper>

            <div className='mt-[1rem]'>
                <Tables handleDeleteOpen={handleDeleteSingleOpenConfirmation} selected={selected} setSelected={setSelected} Offer={"Offer"} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={OfferFetching} />
            </div>
            <Dialogs loading={deleteBrandLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmation} onClose={handleDeleteCloseConfirmation} tital={STRING.DELETE_SURE} desc={STRING.BRAND_DELETE_DESC} Action={handleDelete} />

            {/* single delete */}
            <Dialogs loading={deleteBrandLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} tital={STRING.DELETE_SURE} desc={STRING.BRAND_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmationSingle} onClose={handleDeleteSingleCloseConfirmations} Action={handleDeleteSingle} />
        </div>
    )
}
