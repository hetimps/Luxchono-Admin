import React from 'react';
import { useEffect, useState } from 'react';
import './style.scss';
import { Paper } from '@mui/material';
import Buttons from '../common/Buttons';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Search from '../common/Search/index';
import { STRING } from '../../constants/String';
import Tables from '../common/Table';
import Dialogs from '../common/Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDeleteOfferMutation, useGetAllOfferQuery } from '../../api/Offer';
import { exportToCsv } from '../../constants/Helper/Csv';

export default function OfferPage() {
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [search, setsearch] = useState('');
    const [DeleteOffer, { isLoading: deleteOfferLoading }] = useDeleteOfferMutation();
    const { data: OfferData, isFetching: OfferFetching, refetch } = useGetAllOfferQuery({ search: search.trim() });
    const [rows, setRows] = useState<any[]>([]);
    const navigate = useNavigate();
    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);
    const [input, setinput] = useState('');
    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows);
    };
    const [openDeleteConfirmation, setDeleteOpenConfirmation] = useState(false);
    const handleDeleteOpenConfirmation = () => {
        setDeleteOpenConfirmation(true);
    };
    const handleDeleteCloseConfirmation = () => {
        setDeleteOpenConfirmation(false);
        setSelected([]);
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
        discountType: any,
        image: any,
        offerCode: any,
        description: any,
        brands: any,
        products: any,
        dateFrom: any,
        dateTo: any,
        defaultBrands: any,
        defaultProducts: any
    ): any {
        return {
            id: id,
            offerName: offerName,
            discount: discount,
            discountType: discountType,
            image: image,
            offerCode: offerCode,
            description: description,
            brands: brands,
            products: products,
            dateFrom: dateFrom,
            dateTo: dateTo,
            defaultBrands: defaultBrands,
            defaultProducts: defaultProducts
        };
    }

    useEffect(() => {
        const OfferDatas = OfferData?.result?.data;
        const rowise = OfferDatas?.map((item: any) => {
            const defaultBrands = item.brands.map((cat: any) => ({
                label: cat.brandName,
                value: cat._id,
            }));
            const defaultProducts = item.products.map((cat: any) => ({
                label: cat.productName,
                value: cat._id,
            }));
            return createData(
                item._id,
                item.offerName,
                item.discount,
                item.discountType,
                item.image,
                item.offerCode,
                item.description,
                item.brands,
                item.products,
                item.dateFrom,
                item.dateTo,
                defaultBrands,
                defaultProducts
            );
        });
        setRows(rowise);
    }, [OfferData]);

    useEffect(() => {
        refetch();
    }, [search, refetch]);

    const handleDelete = async () => {
        const response: any = await DeleteOffer({ ids: selectedDeleteRows });
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message);
            setSelected([]);

        } else {
            toast.error(message);
        }
        response && handleDeleteCloseConfirmation();
    };

    const AddOffer = () => {
        navigate('/addoffer');
    };

    //delete single category

    const [selectedIdSingle, setSelectedIdSingle] = useState<number[]>([]);

    const [openDeleteConfirmationSingle, setDeleteOpenConfirmationSingle] = useState(false);

    const handleDeleteSingleOpenConfirmation = (row: any) => {
        setDeleteOpenConfirmationSingle(true);
        setSelectedIdSingle([row?.id]);
    };

    const handleDeleteSingleCloseConfirmations = () => {
        setDeleteOpenConfirmationSingle(false);
        setSelectedIdSingle([]);
    };

    const handleDeleteSingle = async () => {
        const response: any = await DeleteOffer({ ids: selectedIdSingle });
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message);
        } else {
            toast.error(message);
        }
        response && handleDeleteSingleCloseConfirmations();
    };

    const handleCvsExport = () => {
        const exportColumns = [
            { id: 'offerName', label: 'Offer Name' },
            { id: 'discount', label: 'Discount' },
            { id: 'discountType' },
        ];
        exportToCsv(rows, exportColumns, 'offer_data');
    };

    return (
        <div className='offerContainer'>
            <Paper className='paperboxshadow h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem]'>
                <div className='productbtns flex justify-between'>
                    <div className='flex gap-[10px]'>
                        <Buttons onClick={handleCvsExport} startIcon={<IosShareIcon />} text={STRING.EXPORT_BUTTON} variant={'outlined'} className={'productheaderbtn1'} />
                        {/* <Buttons startIcon={<SystemUpdateAltIcon />} variant={"outlined"} text={"Import"} className={"productheaderbtn1"} /> */}
                    </div>
                </div>
                <div className='flex gap-[10px]'>
                    {(selected.length > 0 && rows?.length > 0) && <Buttons onClick={handleDeleteOpenConfirmation} startIcon={<DeleteOutlineIcon />} variant={'contained'} text={
                        selectedDeleteRows.length === 0
                            ? `${STRING.DELETE_BUTTON}`
                            : `${STRING.DELETE_BUTTON} ( ${selectedDeleteRows.length} )`
                    } className={`productheaderbtn2 ${selectedDeleteRows.length > 0 ? '!w-[135px]' : ''
                    }`} />}
                    <Buttons onClick={AddOffer} startIcon={<ControlPointIcon />} variant={'contained'} text={'Add Offer'} className="productheaderbtn2 addbtn" />
                </div>
            </Paper>
            <Paper className='paperboxshadow h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search setinput={setinput}
                    input={input}
                    setsearch={setsearch} placeholder={'Search Offer'} />
            </Paper>

            <div className='mt-[1rem]'>
                <Tables handleDeleteOpen={handleDeleteSingleOpenConfirmation} selected={selected} setSelected={setSelected} Offer={'Offer'} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={OfferFetching} />
            </div>
            <Dialogs loading={deleteOfferLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={'product_delete_yes'} closeClass={'product_delete_cancel'} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmation} onClose={handleDeleteCloseConfirmation} tital={STRING.DELETE_SURE} desc={STRING.OFFER_DELETE_DESC} Action={handleDelete} />
            {/* single delete */}
            <Dialogs loading={deleteOfferLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={'product_delete_yes'} closeClass={'product_delete_cancel'} tital={STRING.DELETE_SURE} desc={STRING.OFFER_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmationSingle} onClose={handleDeleteSingleCloseConfirmations} Action={handleDeleteSingle} />
        </div>
    );
}
