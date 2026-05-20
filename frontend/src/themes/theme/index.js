// ==============================|| PRESET THEME - DEFAULT ||============================== //

export default function Default(colors) {
  const { blue, red, gold, cyan, green, grey } = colors;
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };
  const contrastText = '#fff';

  return {
    primary: {
      lighter: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      light: '#a5b4fc',
      400: '#818cf8',
      main: '#0A19FF',
      dark: '#0814CC',
      700: '#060F99',
      darker: '#040A66',
      900: '#020533',
      contrastText: '#fff'
    },
    secondary: {
      lighter: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      light: '#cbd5e1',
      400: '#94a3b8',
      main: '#1A1F71',
      600: '#475569',
      dark: '#0f172a',
      800: '#1e293b',
      darker: '#020617',
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: '#fff'
    },
    error: {
      lighter: '#fef2f2',
      light: '#fecaca',
      main: '#ef4444',
      dark: '#b91c1c',
      darker: '#7f1d1d',
      contrastText
    },
    warning: {
      lighter: '#fefce8',
      light: '#fef08a',
      main: '#facc15',
      dark: '#a16207',
      darker: '#713f12',
      contrastText: greyColors[100]
    },
    info: {
      lighter: '#eff6ff',
      light: '#bfdbfe',
      main: '#3b82f6',
      dark: '#1d4ed8',
      darker: '#1e3a8a',
      contrastText
    },
    success: {
      lighter: '#f0fdf4',
      light: '#bbf7d0',
      main: '#22c55e',
      dark: '#15803d',
      darker: '#14532d',
      contrastText
    },
    grey: greyColors
  };
}
