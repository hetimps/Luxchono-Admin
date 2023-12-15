import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/AppBar/index";
import { DrawerHeader, Main } from "../../../components/PageComonComponent.js";
import Drawers from "../../../components/Drawer";
import AddproductPage from "../../../components/Product/AddProductPage";


export default function AddProduct() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Product" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <AddproductPage />
            </Main>
        </Box>
    )
}