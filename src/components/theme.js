import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5", // Customize background color
    },
    primary: {
      main: "#1976d2", // Customize primary color
      dark: "#115293", // Customize primary dark color
    },
    success: {
      main: "#4caf50", // Customize success color
      dark: "#388e3c", // Customize success dark color
    },
  },
  typography: {
    fontWeightBold: 700, // Customize typography
  },
  spacing: 8, // Customize spacing scale
});

export default theme;
