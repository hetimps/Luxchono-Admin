import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/AppBar";
import { DrawerHeader, Main } from "../../components/PageComonComponent.js";
import Drawers from "../../components/Drawer";
import CategoryPage from "../../components/Category";

export default function Category() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Category" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <CategoryPage />
      </Main>
    </Box>
  )
}