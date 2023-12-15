import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/AppBar/index";
import { DrawerHeader, Main } from "../../../components/PageComonComponent.js";
import Drawers from "../../../components/Drawer";
import EditProductPage from "../../../components/Product/EditProductPage";

export default function EditProduct() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Product" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <EditProductPage />
            </Main>
        </Box>
    )
}