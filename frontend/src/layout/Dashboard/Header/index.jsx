import { useMemo } from 'react';

// material-ui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// project imports
import HeaderContent from './HeaderContent';
import IconButton from 'components/@extended/IconButton';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const headerContent = useMemo(() => <HeaderContent />, []);

  const mainHeader = (
    <Toolbar>
      <IconButton
        aria-label="open drawer"
        onClick={() => handlerDrawerOpen(!drawerOpen)}
        edge="start"
        color="secondary"
        variant="light"
        sx={{
          color: 'text.primary',
          bgcolor: drawerOpen ? 'transparent' : 'grey.100',
          ml: { xs: 0, lg: -2 }
        }}
      >
        {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      {headerContent}
    </Toolbar>
  );

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        top: 0,
        width: '100%',
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderBottomColor: 'divider',
        zIndex: 100
      }}
    >
      {mainHeader}
    </AppBar>
  );
}
