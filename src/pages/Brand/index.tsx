import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/AppBar";
import { DrawerHeader, Main } from "../../components/PageComonComponent.js";
import Drawers from "../../components/Drawer";
import BrandPage from "../../components/Brand";

export default function Brand() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars  haddings="Brand" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <BrandPage/>
      </Main>
    </Box>
  )
}
