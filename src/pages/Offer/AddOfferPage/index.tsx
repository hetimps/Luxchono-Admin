import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/AppBar/index";
import { DrawerHeader, Main } from "../../../components/PageComonComponent.js";
import Drawers from "../../../components/Drawer";

import AddOfferPage from "../../../components/Offer/AddOfferPage";

export default function AddOffer() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Offer" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <AddOfferPage />
            </Main>
        </Box>
    )
}