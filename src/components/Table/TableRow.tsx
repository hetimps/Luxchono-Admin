import TableCell from '@mui/material/TableCell';
import { Avatar, Rating, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api/Utils';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const ProductRow = ({ row, index, handleDeleteOpen }: any) => {
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
                <div className='flex gap-[10px] items-center '>
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px] !border-header  border-[1px]' alt="p" src={`${BASE_URL}/${row?.thumbnail}`} />
                    {row?.productname}
                </div>
            </TableCell>
            <TableCell align="left" padding="none">{`${row.category}`}</TableCell>
            <TableCell align="left" padding="none">{row?.brand}</TableCell>
            <TableCell align="left" padding="none">{row?.price}</TableCell>
            <TableCell align="left" padding="none">{row?.stock}</TableCell>
            {/* <TableCell align="left" padding="none">
                <Rating className='!text-main' name="read-only" precision={0.5} value={Number(row?.review) || 0} readOnly />
            </TableCell> */}
            <TableCell align="left" padding="none">{row?.productModel}</TableCell>
            <TableCell align="left" padding="none">{row?.warranty}</TableCell>
            <TableCell align="left" padding="none">{row?.dummyPrice || "-"}</TableCell>
            <TableCell align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditOutlinedIcon className='text-black' onClick={() => navigate("/editproduct", { state: row })} />
                    <DeleteOutlineOutlinedIcon className='text-black' onClick={() => handleDeleteOpen(row)} />
                </div>
            </TableCell>
        </>
    )
}

export const CategoryRow = ({ row, index, handleDeleteOpen }: any) => {
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
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px] !border-header  border-[1px]' alt="c" src={`${BASE_URL}/${row?.image}`} />
                    {row?.categoryName}
                </div>
            </TableCell>
            <TableCell className='w-[5rem]' align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditOutlinedIcon className='text-black' onClick={() => navigate("/editcategory", { state: row })} />
                    <DeleteOutlineOutlinedIcon className='text-black' onClick={() => handleDeleteOpen(row)} />
                </div>
            </TableCell>
            {/* <Dialogs loading={isLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} tital={STRING.DELETE_SURE} desc={STRING.CATEGORY_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDelete} onClose={handleDeleteClose} Action={handleDelete} /> */}
        </>
    )
}


export const BrandRow = ({ row, index, handleDeleteOpen }: any) => {
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
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px] !border-header  border-[1px]' alt="c" src={`${BASE_URL}/${row?.image}`} />
                    {row?.brandName}
                </div>
            </TableCell>
            <TableCell className='w-[5rem]' align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditOutlinedIcon className='text-black' onClick={() => navigate("/editbrand", { state: row })} />
                    <DeleteOutlineOutlinedIcon className='text-black' onClick={() => handleDeleteOpen(row)} />
                </div>
            </TableCell>
        </>
    )

}