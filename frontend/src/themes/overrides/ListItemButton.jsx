// ==============================|| OVERRIDES - LIST ITEM ICON ||============================== //

export default function ListItemButton(theme) {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 8px',
          padding: '10px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme.vars.palette.primary.lighter,
          },
          '&.Mui-selected': {
            color: theme.vars.palette.primary.main,
            backgroundColor: theme.vars.palette.primary.lighter,
            '& .MuiListItemIcon-root': {
              color: theme.vars.palette.primary.main
            },
            '&:hover': {
              backgroundColor: theme.vars.palette.primary.light,
            }
          }
        }
      }
    }
  };
}
