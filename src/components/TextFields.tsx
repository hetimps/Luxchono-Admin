
// import { TextField, InputAdornment, IconButton } from '@mui/material';


// export default function TextFields(props: any) {
//   const { type, endAdornment, ...restProps } = props;

//   return (
//     <TextField
//       {...restProps}



//       type={type}

//     />
//   );
// }

import { InputAdornment, IconButton } from '@mui/material';

import React from 'react';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

export default function TextFields(props: any) {
  const { type, endAdornment, action, icons, ...restProps } = props;

  return (
    <TextField
      {...restProps}
      type={type}


      InputProps={{
        endAdornment: endAdornment && (
          <InputAdornment position="end">
            {restProps.value && (
              <IconButton disableRipple onClick={action}>
                {icons}
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}


    />
  );
}
