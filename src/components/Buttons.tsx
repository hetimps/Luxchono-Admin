import React from 'react'
import Button from '@mui/material/Button';

import IosShareIcon from '@mui/icons-material/IosShare';

export default function Buttons(props:any) {
  return (
    <Button {...props} >{props.text}</Button>
  )
}
