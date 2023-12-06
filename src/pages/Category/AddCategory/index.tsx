import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/AppBar/index";
import { DrawerHeader, Main } from "../../../components/PageComonComponent.js";
import Drawers from "../../../components/Drawer";
import AddCategoryPage from "../../../components/Category/AddCategoryPage";


export default function AddCategory() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Category" />
      <Drawers />
      <Main open={true}  >
        <DrawerHeader />
        <AddCategoryPage />
      </Main>
    </Box>
  )
}