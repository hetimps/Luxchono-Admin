import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material'
import logo from "../../assets/imag/logo.svg";
import { useLocation, useNavigate } from 'react-router';
import { createTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import { DrawerHeader } from '../PageComonComponent.js';
import "./style.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
export default function Drawers() {
    const navigate = useNavigate();
    const location = useLocation();

    const theme = createTheme();

    const Navigate = (path: string) => {
        navigate(path)
    }


    return (
        <ThemeProvider theme={theme}>
            <Drawer
                sx={{
                    width: 280,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 280,
                        boxSizing: 'border-box',
                        // boxShadow : ""

                        boxShadow: "#e8e8eb 1px 1px 10px 1px"
                    }
                }}
                variant="persistent"
                anchor="left"
                open={true}>
                <DrawerHeader className='!flex !justify-center mt-[0.9rem]'  >
                    <img src={logo} alt="logo"></img>
                </DrawerHeader>
                <List className='!mt-[1rem] !p-[0.5rem]' >
                    <ListItem disablePadding onClick={() => Navigate("/dashboard")} className={`draewr_dashboard_item ${location.pathname === "/dashboard" || location.pathname === "/Addquality" || location.pathname === "/Editquality" || location.pathname === "/Viewquality" ? "active" : ""}`}  >
                        <ListItemButton component="a" disableRipple>
                            <ListItemIcon className='draewr_dashboard_icon'  >
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText className='draewr_dashboard_text' primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => Navigate("/product")} className={`draewr_dashboard_item ${location.pathname === "/product" ? "active" : ""}`}   >
                        <ListItemButton component="a" disableRipple >
                            <ListItemIcon className='draewr_dashboard_icon'>
                                <ProductionQuantityLimitsIcon />
                            </ListItemIcon>
                            <ListItemText className='draewr_dashboard_text' primary="Product" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => Navigate("/order")} className={`draewr_dashboard_item ${location.pathname === "/order" ? "active" : ""}`}>
                        <ListItemButton component="a" disableRipple >
                            <ListItemIcon className='draewr_dashboard_icon'>
                                <SportsVolleyballIcon />
                            </ListItemIcon>
                            <ListItemText className='draewr_dashboard_text' primary="Order" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => Navigate("/category")} className={`draewr_dashboard_item ${location.pathname === "/category" ? "active" : ""}`} >
                        <ListItemButton component="a" disableRipple >
                            <ListItemIcon className='draewr_dashboard_icon'>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText className='draewr_dashboard_text' primary="Category" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => Navigate("/offer")} className={`draewr_dashboard_item ${location.pathname === "/offer" ? "active" : ""}`} >
                        <ListItemButton component="a" disableRipple >
                            <ListItemIcon className='draewr_dashboard_icon'>
                                <LocalOfferIcon />
                            </ListItemIcon>
                            <ListItemText className='draewr_dashboard_text' primary="Offer" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => Navigate("/customer")} className={`draewr_dashboard_item ${location.pathname === "/customer" ? "active" : ""}`} >
                        <ListItemButton component="a" disableRipple >
                            <ListItemIcon className='draewr_dashboard_icon'>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText className='draewr_dashboard_text' primary="Customer" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => Navigate("/setting")} className={`draewr_dashboard_item ${location.pathname === "/setting" ? "active" : ""}`} >
                        <ListItemButton component="a" disableRipple >
                            <ListItemIcon className='draewr_dashboard_icon'>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText className='draewr_dashboard_text' primary="Setting" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </ThemeProvider>
    )
}
