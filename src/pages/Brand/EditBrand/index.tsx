import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/AppBar/index";
import { DrawerHeader, Main } from "../../../components/PageComonComponent.js";
import Drawers from "../../../components/Drawer";
import EditBrandPage from "../../../components/Brand/EditBrandPage";

export default function EditBrand() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Brand" />
      <Drawers />
      <Main open={true}  >
        <DrawerHeader />
        <EditBrandPage />
      </Main>
    </Box>
  )
}