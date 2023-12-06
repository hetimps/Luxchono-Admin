import TableCell from '@mui/material/TableCell';
import { Avatar, Rating, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

import { STRING } from '../../constants/String';
import Dialogs from '../Dialogs';
import { useNavigate } from 'react-router-dom';


export const ProductRow = ({ row, index }: any) => {
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <>
            <TableCell
                align="left"
                component="th"
                id={labelId}
                scope="row"
                padding="none">
                <div className='flex gap-[10px] items-center '>
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px]' alt="p" src={String(row?.thumbnail)} />
                    {row?.productname}
                </div>
            </TableCell>
            <TableCell align="left" padding="none">{row.category}</TableCell>
            <TableCell align="left" padding="none">{row?.price}</TableCell>
            <TableCell align="left" padding="none">{row?.stock}</TableCell>
            <TableCell align="left" padding="none">
                <Rating className='!text-main' name="read-only" precision={0.5} value={Number(row?.review) || 0} readOnly />
            </TableCell>
            <TableCell align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditIcon className='text-light' />
                    <RemoveRedEyeIcon className='text-light' />
                </div>
            </TableCell>
        </>
    )

}

export const CategoryRow = ({ row, index, handleDeleteOpen}: any) => {
    const navigate = useNavigate();
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <>
            <TableCell
                align="left"
                component="th"
                id={labelId}
                scope="row"
                padding="none">

                <div className='flex gap-[10px] items-center'>
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px]' alt="c" src={String(row?.image)} />
                    {row?.categoryName}
                </div>
            </TableCell>
            <TableCell className='w-[5rem]' align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditIcon className='text-light' onClick={() => navigate("/editcategory",{state:row})} />
                    <DeleteIcon className='text-light' onClick={() => handleDeleteOpen(row)} />
                </div>
            </TableCell>
            {/* <Dialogs loading={isLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} tital={STRING.DELETE_SURE} desc={STRING.CATEGORY_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDelete} onClose={handleDeleteClose} Action={handleDelete} /> */}
        </>
    )

}