import DataTable, { createTheme } from "react-data-table-component";

const solarizedTheme = createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      background: {
        default: "transparent",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

export default solarizedTheme;

