// ==============================|| OVERRIDES - DRAWER ||============================== //

export default function Drawer() {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          borderRight: 'none',
          backgroundColor: '#161637',
          color: '#ffffff',
          boxShadow: 'none',
          borderRadius: 0,
          border: 'none'
        }
      }
    }
  };
}
