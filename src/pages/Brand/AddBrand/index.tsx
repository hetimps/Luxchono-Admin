import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/AppBar/index";
import { DrawerHeader, Main } from "../../../components/PageComonComponent.js";
import Drawers from "../../../components/Drawer";
import AddBrandPage from "../../../components/Brand/AddBrandPage";

export default function AddBrand() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Brand" />
      <Drawers />
      <Main open={true}  >
        <DrawerHeader />
        <AddBrandPage/>
      </Main>
    </Box>
  )
}