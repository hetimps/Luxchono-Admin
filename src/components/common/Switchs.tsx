import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Switch, SwitchProps } from '@mui/material';

export default function Switchs() {

    const [checked, setChecked] = React.useState(true);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const customSmallSize = 20;

    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible"
            size="small"
            disableRipple
            {...props}
            // Add the onChange handler
            checked={checked} // Add the checked state
        />
    ))(({ theme }) => ({
        width: customSmallSize + 18, // Adjust width based on your preference
        height: customSmallSize + 4,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#964315' : '#964315',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 15,
            height: 15,
            margin: "2px",

        },
        '& .MuiSwitch-track': {
            borderRadius: (customSmallSize + 4) / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#964315',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));
    return (
        <IOSSwitch />
    )
}

