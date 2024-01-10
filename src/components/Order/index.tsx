import React from 'react';
import { useEffect, useState } from 'react';
import './style.scss';
import { Paper } from '@mui/material';
import Buttons from '../common/Buttons';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Search from '../common/Search/index';
import { STRING } from '../../constants/String';
import Tables from '../common/Table';
import Dialogs from '../common/Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../api/Orders';
import Selects from '../common/Selects';
import UpdateOrderStatusDialog from './UpdateOrderStatusDialog';
import { exportToCsv } from '../../constants/Helper/Csv';

export default function OrderPage() {

    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [search, setsearch] = useState('');
    const [status, setStatus] = useState<any>('');
    const [method, setMethod] = useState<any>('');


    const { data: OrdersData, isFetching, refetch } = useGetAllOrdersQuery({ search: search.trim(), status: status?.value, method: method?.value });
    const [DeleteOredr, { isLoading: deleteOrderLoading }] = useDeleteOrderMutation();
    const [rows, setRows] = useState<any[]>([]);
    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);

    const [input, setinput] = useState('');
    const [openDeleteConfirmation, setDeleteOpenConfirmation] = useState(false);

    const [UpdateOrderStatus, { isLoading: UpdateStatusLoading }] = useUpdateOrderStatusMutation();

    useEffect(() => {
        setRows([]);
        refetch();
    }, [search, refetch, status, method]);

    const statusOption = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Cancelled', label: 'Cancelled' },
        // { value: "Completed", label: "Completed" },
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Out of Delivery', label: 'Out of Delivery' },
        { value: 'Delivered', label: 'Delivered' },
    ];

    const MethodOption = [
        { value: 'Card', label: 'Card' },
        { value: 'Mobile Banking', label: 'Mobile Banking' },
        { value: 'Apple Pay', label: 'Apple Pay' },
        { value: 'Pay Pal', label: 'Pay Pal' },
        { value: 'Google Pay', label: 'Google Pay' },
    ];

    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows);
    };

    const handleDeleteOpenConfirmation = () => {
        setDeleteOpenConfirmation(true);
    };

    const handleDeleteCloseConfirmation = () => {
        setDeleteOpenConfirmation(false);
        setSelected([]);
    };

    const headCells: any[] = [
        {
            id: 'id',
            numeric: true,
            disablePadding: true,
            label: 'Order ID',
        },
        {
            id: 'userName',
            numeric: false,
            disablePadding: true,
            label: 'Customer name',
        },
        {
            id: 'createdAt',
            numeric: true,
            disablePadding: true,
            label: 'Create on',
        },
        {
            id: 'method',
            numeric: true,
            disablePadding: true,
            label: 'Method',
        },
        {
            id: 'totalAmt',
            numeric: true,
            disablePadding: true,
            label: 'Amount',
        },
        {
            id: 'status',
            numeric: true,
            disablePadding: false,
            label: 'Status',
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
        userName: any,
        createdAt: any,
        method: any,
        totalAmt: any,
        status: any,
        shippingAddress: any,
        products: any


    ): any {
        return {
            id: id,
            userName: userName,
            createdAt: createdAt,
            method: method,
            totalAmt: totalAmt,
            status: status,
            shippingAddress: shippingAddress,
            products: products
        };
    }

    useEffect(() => {
        const OrderDatas = OrdersData?.result?.data;
        const rowise = OrderDatas?.map((item: any) => {
            return createData(
                item._id,
                item.createdBy.userName,
                item.createdAt,
                item.payment.method,
                item.products?.productId?.price,
                item.status,
                item.shippingAddress,
                item.products
            );
        });
        setRows(rowise);
    }, [OrdersData]);



    const handleDelete = async () => {
        const response: any = await DeleteOredr({ ids: selectedDeleteRows });
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message);
            setSelected([]);

        } else {
            toast.error(message);
        }
        response && handleDeleteCloseConfirmation();
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
        const response: any = await DeleteOredr({ ids: selectedIdSingle });
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
            { id: 'id', label: 'Order ID' },
            { id: 'userName', label: 'User Name' },
            { id: 'createdAt', label: 'Create on' },
            { id: 'method', label: 'Method' },
            { id: 'totalAmt', label: 'Amount' },
            { id: 'status', label: 'Status' },
        ];
        exportToCsv(rows, exportColumns, 'order_data');
    };

    //edit status 
    const [UpdateselectedId, setUpdateSelectedId] = useState<any>('');
    const [selectStatus, setSelectStatus] = useState<any>('');
    const [openUpdateConfirmationSingle, setUpdateOpenConfirmationSingle] = useState(false);
    const [optionValue, setOptionValue] = useState<any>('');

    const handleUpdateOpenConfirmation = (row: any) => {
        setUpdateOpenConfirmationSingle(true);
        setUpdateSelectedId(row?.id);
        setSelectStatus({ label: row?.status, value: row?.status });
        setOptionValue({ label: row?.status, value: row?.status });
    };
    const handleUpdateCloseConfirmations = () => {
        setUpdateOpenConfirmationSingle(false);
        setSelectedIdSingle([]);
        setSelectStatus('');
    };

    const handleUpdateOrderStatus = async () => {

        const body = {
            id: UpdateselectedId,
            shipped: selectStatus.value === 'Shipped',
            outForDelivery: selectStatus.value === 'Out of Delivery',
            delivered: selectStatus.value === 'Delivered',
            pending: selectStatus.value === 'Pending',
            cancelled: selectStatus.value === 'Cancelled',
            completed: selectStatus.value === 'Completed',

        };

        const response: any = await UpdateOrderStatus(body);
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message);
        } else {
            toast.error(message);
        }

        response && handleUpdateCloseConfirmations();
    };


    return (
        <div className='productContainer'>
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
                </div>
            </Paper>

            <Paper className='paperboxshadow h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search setinput={setinput}
                    input={input}
                    setsearch={setsearch} placeholder={STRING.ORDER__SEARCH_PLACHOLDER} />
                <Selects selectedValues={method} setSelectedValues={setMethod} width={'250px'} height={'45px'} options={MethodOption} placeholder={'Method'} />
                <Selects selectedValues={status} setSelectedValues={setStatus} width={'250px'} height={'45px'} options={statusOption} placeholder={'Status'} />
            </Paper>

            <div className='mt-[1rem]'>
                <Tables handleUpdateOpenConfirmation={handleUpdateOpenConfirmation} handleDeleteOpen={handleDeleteSingleOpenConfirmation} selected={selected} setSelected={setSelected} Orders={'Orders'} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={isFetching} />
            </div>
            <Dialogs loading={deleteOrderLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={'product_delete_yes'} closeClass={'product_delete_cancel'} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmation} onClose={handleDeleteCloseConfirmation} tital={STRING.DELETE_SURE} desc={STRING.ORDER_DELETE_DESC} Action={handleDelete} />

            {/* single delete */}
            <Dialogs loading={deleteOrderLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={'product_delete_yes'} closeClass={'product_delete_cancel'} tital={STRING.DELETE_SURE} desc={STRING.ORDER_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmationSingle} onClose={handleDeleteSingleCloseConfirmations} Action={handleDeleteSingle} />

            {/* update status */}
            <UpdateOrderStatusDialog loading={UpdateStatusLoading} selectedValues={selectStatus} setSelectedValues={setSelectStatus} tital={'Update Order Status'} textClose={'Cancel'} textYes={'Edit'} yesClass={'dialog_yes'} closeClass={'dialog_cancel'} open={openUpdateConfirmationSingle} Action={handleUpdateOrderStatus} onClose={handleUpdateCloseConfirmations} optionValue={optionValue} />
        </div>
    );
}
