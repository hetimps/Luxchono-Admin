import TableCell from '@mui/material/TableCell';
import { Avatar, Rating } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

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