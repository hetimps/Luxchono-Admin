import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Buttons from "../../Buttons";
import Select from 'react-select';
import { useState } from 'react';
import { ReactSelectStyle } from '../../Selects/ReactSelect';
import Loader from '../../Loader';
export default function UpdateOrderStatusDialog({ open, onClose, yesClass, closeClass, tital, textClose, textYes, selectedValues, setSelectedValues, Action, loading, defaultUpdateStatus }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  console.log(defaultUpdateStatus, "defaultUpdateStatusdefaultUpdateStatus")

  const EditStatusOption = [
    { value: "Pending", label: "Pending" },
    { value: "Cancelled", label: "Cancelled" },
    // { value: "Completed", label: "Completed" },
    { value: "Shipped", label: "Shipped" },
    { value: "Out of Delivery", label: "Out of Delivery" },
    { value: "Delivered", label: "Delivered" },
  ]

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedValues(selectedOptions);
  };

  return (
    <Dialog className="UpdateDialog" open={open} >
      <Box className="flex flex-col items-center  w-full " >
        <DialogTitle className='!mt-[7px]' >
          <span className='!font-bold !text-[22px]'>
            {tital}
          </span>
        </DialogTitle>

        <div className='mb-[20px]' style={{ height: isMenuOpen ? '30vh' : 'auto' }}>
          <Select
            value={selectedValues}
            onChange={handleSelectChange}
            options={EditStatusOption}
            styles={ReactSelectStyle("350px", "45px")}
            isClearable={false}
            closeMenuOnSelect={true}
            onMenuClose={() => setIsMenuOpen(false)}
            onMenuOpen={() => setIsMenuOpen(true)}
            menuIsOpen={isMenuOpen}
            placeholder={"Select Order Status"}
          />

        </div>

        <DialogActions >

          {loading ? <Loader /> : (
            <Box className="!flex !gap-[8px] mt-[0.5rem]">
              <Buttons text={textClose} className={closeClass} variant={"outlined"} onClick={onClose} />
              <Buttons text={textYes} className={yesClass} variant={"contained"} onClick={Action} />
            </Box>
          )}

        </DialogActions>
      </Box>
    </Dialog>
  )
}
