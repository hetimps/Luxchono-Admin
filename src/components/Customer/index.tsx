import React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Buttons from '../common/Buttons';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Search from '../common/Search/index';
import { STRING } from '../../constants/String';
import Tables from '../common/Table';
import { useGetAllCustomerQuery } from '../../api/Customer';
import { exportToCsv } from '../../constants/Helper/Csv';

export default function CustomerPage() {
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [search, setsearch] = useState('');
    const [rows, setRows] = useState<any[]>([]);
    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);
    const [input, setinput] = useState('');
    const { data: CustomerData, isFetching: CustomerFetching, refetch } = useGetAllCustomerQuery({
        search: search,
    });
    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows);
    };
    const headCells: any[] = [
        {
            id: 'userName',
            numeric: false,
            disablePadding: true,
            label: 'Customer name',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: true,
            label: 'Email',
        },
        {
            id: 'phone',
            numeric: true,
            disablePadding: true,
            label: 'Mobile number',
        },
        // {
        //     id: 'action',
        //     numeric: true,
        //     disablePadding: false,
        //     // label: 'Action',
        // },
    ];

    function createData(
        id: string | number,
        userName: any,
        email: any,
        phone: any,
        profilePic: any
    ): any {
        return {
            id: id,
            userName: userName,
            email: email,
            phone: phone,
            profilePic: profilePic
        };
    }

    useEffect(() => {
        const CustomerDatas = CustomerData?.result?.data;
        const rowise = CustomerDatas?.map((item: any) => {
            return createData(
                item._id,
                item.userName,
                item.email,
                item.phone,
                item.profilePic
            );
        });
        setRows(rowise);
    }, [CustomerData]);

    useEffect(() => {
        refetch();
    }, [search, refetch]);


    const handleCvsExport = () => {
        const exportColumns = [
            { id: 'userName', label: 'User Name' },
            { id: 'email', label: 'mail' },
            { id: 'phone', label: 'Mobile number' },
        ];
        exportToCsv(rows, exportColumns, 'Customer_data');
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
                    {(selected.length > 0 && rows?.length > 0) && <Buttons startIcon={<DeleteOutlineIcon />} variant={'contained'} text={
                        selectedDeleteRows.length === 0
                            ? `${STRING.DELETE_BUTTON}`
                            : `${STRING.DELETE_BUTTON} ( ${selectedDeleteRows.length} )`
                    } className={`productheaderbtn2 ${selectedDeleteRows.length > 0 ? '!w-[135px]' : ''
                    }`} />}
                    {/* <Buttons onClick={AddCategory} startIcon={<ControlPointIcon />} variant={"contained"} text={"Add Customer"} className="productheaderbtn2 addcustomerbtn" /> */}
                </div>
            </Paper>

            <Paper className='paperboxshadow h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search setinput={setinput}
                    input={input}
                    setsearch={setsearch} placeholder={'Search Customer'} />
            </Paper>
            

            <div className='mt-[1rem]'>
                <Tables selected={selected} setSelected={setSelected} Customer={'Customer'} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={CustomerFetching} />
            </div>

        </div>
    );
}
