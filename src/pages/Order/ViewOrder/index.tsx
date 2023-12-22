import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/AppBar/index";
import { DrawerHeader, Main } from "../../../components/PageComonComponent.js";
import Drawers from "../../../components/Drawer";
import ViewOrderPage from "../../../components/Order/ViewOder/ViewOderPage";

export default function ViewOrder() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Order" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <ViewOrderPage />
            </Main>
        </Box>
    )
}