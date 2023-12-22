import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/AppBar";
import { DrawerHeader, Main } from "../../components/PageComonComponent.js";
import Drawers from "../../components/Drawer";
import CustomerPage from "../../components/Customer";

export default function Customer() {
  return ( 
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Customer" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <CustomerPage />
      </Main>
    </Box>
  )
}
