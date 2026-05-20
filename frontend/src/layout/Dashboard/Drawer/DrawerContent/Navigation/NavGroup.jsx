import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import { useGetMenuMaster } from 'api/menu';
import { useAuth } from 'contexts/AuthContext';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { hasPermission } = useAuth();

  const visibleItems = item.children?.filter((menuItem) => {
    if (menuItem.type === 'collapse') {
      return menuItem.children?.some((child) => hasPermission(child.permission));
    }
    return hasPermission(menuItem.permission);
  });

  if (!visibleItems || visibleItems.length === 0) return null;

  const navCollapse = visibleItems.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return <NavCollapse key={menuItem.id} menu={menuItem} level={1} />;
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1, mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 3, height: 12, borderRadius: '2px', background: 'linear-gradient(180deg, #818cf8, #a78bfa)', flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.10em', textTransform: 'uppercase', fontSize: '0.63rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };
