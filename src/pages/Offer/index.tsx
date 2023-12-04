import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/AppBar";
import { DrawerHeader, Main } from "../../components/PageComonComponent.js";
import Drawers from "../../components/Drawer";

export default function Offer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars  haddings="Offer"/>
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
      </Main>
    </Box>
  )
}
