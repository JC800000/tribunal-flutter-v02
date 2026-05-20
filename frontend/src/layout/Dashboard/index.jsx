import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project imports
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// Color del marco exterior — índigo oscuro del sidebar
const FRAME_COLOR = '#1B1936';
const FRAME_SIZE = '10px';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    handlerDrawerOpen(!downXL);
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: FRAME_COLOR,
        p: downSM ? 0 : FRAME_SIZE,
        boxSizing: 'border-box'
      }}
    >
      {/* Sidebar — mismo color que el fondo, se funde visualmente */}
      <Drawer />

      {/* Área de contenido principal — tarjeta blanca flotante */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          borderRadius: downSM ? 0 : '24px',
          overflow: 'hidden',
          minHeight: downSM ? '100vh' : `calc(100vh - ${FRAME_SIZE} * 2)`,
          boxShadow: downSM ? 'none' : '0 8px 48px 0 rgba(0,0,0,0.28)'
        }}
      >
        {/* Header sticky dentro de la tarjeta blanca */}
        <Header />

        {/* Contenido scrolleable */}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Breadcrumbs />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
