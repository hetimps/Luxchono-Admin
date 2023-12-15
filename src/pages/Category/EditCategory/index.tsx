import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/AppBar/index";
import { DrawerHeader, Main } from "../../../components/PageComonComponent.js";
import Drawers from "../../../components/Drawer";
import EditCategoryPage from "../../../components/Category/EditCategoryPage";

export default function EditCategory() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Category" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <EditCategoryPage />
            </Main>
        </Box>
    )
}