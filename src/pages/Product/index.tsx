import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/AppBar";
import { DrawerHeader, Main } from "../../components/PageComonComponent.js";
import Drawers from "../../components/Drawer";
import ProductPage from "../../components/Product";

export default function Product() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars  haddings="Product" />
      <Drawers />
      <Main open={true} >
        <DrawerHeader />
        <ProductPage/>
      </Main>
    </Box>
  )
}
