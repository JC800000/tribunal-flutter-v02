import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

// material-ui
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { useAuth } from 'contexts/AuthContext';

export default function NavCollapse({ menu, level }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { hasPermission } = useAuth();

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const { pathname } = useLocation();

  const visibleChildren = menu.children?.filter((item) => hasPermission(item.permission));

  const isSelected = visibleChildren?.some((item) => !!matchPath({ path: item?.link ? item.link : item.url, end: false }, pathname));

  if (!visibleChildren || visibleChildren.length === 0) return null;

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} />
  ) : (
    false
  );

  const textColor = 'rgba(255,255,255,0.55)';
  const iconSelectedColor = '#fff';

  const navCollapse = visibleChildren.map((item) => {
    switch (item.type) {
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse Item
          </Typography>
        );
    }
  });

  return (
    <>
      <ListItemButton
        disableRipple
        selected={isSelected}
        onClick={handleClick}
        sx={{
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            borderRadius: '12px',
            mx: 2,
            mb: 0.5,
            color: textColor,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.07)' },
            '&.Mui-selected': {
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              boxShadow: 'none',
              '& .MuiListItemIcon-root': { 
                color: '#fff',
                bgcolor: '#5a67d8',
                minWidth: '32px',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px'
              },
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#fff',
              }
            }
          }),
          ...(!drawerOpen && {
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' }
          })
        }}
      >
        {menuIcon && (
          <ListItemIcon
            sx={{
              minWidth: 42,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
              })
            }}
          >
            {menuIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            sx={{ overflow: 'hidden' }}
            primary={
              <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {menu.title}
              </Typography>
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          open ? <UpOutlined style={{ fontSize: '0.625rem', marginLeft: 1, color: 'rgba(255,255,255,0.35)' }} /> : <DownOutlined style={{ fontSize: '0.625rem', marginLeft: 1, color: 'rgba(255,255,255,0.35)' }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ position: 'relative', '&:after': { content: '""', position: 'absolute', left: '32px', top: 0, height: '100%', width: '1px', opacity: 1, background: 'rgba(255,255,255,0.1)' } }}>
          {navCollapse}
        </List>
      </Collapse>
    </>
  );
}

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number
};
