import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/common/AppBar";
import { DrawerHeader, Main } from "../../components/common/PageComonComponent/index";
import Drawers from "../../components/common/Drawer";

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Dashboard" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
      </Main>
    </Box>
  )
}
