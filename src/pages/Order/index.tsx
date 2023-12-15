import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/AppBar";
import { DrawerHeader, Main } from "../../components/PageComonComponent.js";
import Drawers from "../../components/Drawer";
import OrderPage from "../../components/Order";

export default function Order() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars  haddings="Order" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <OrderPage/>
      </Main>
    </Box>
  )
}


