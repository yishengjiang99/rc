import { DefaultSeo } from "next-seo";
import SEO from "../styles/seo.config";
import "../styles/global.css";
import {
  ServerStyleSheets,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import { useContext, createContext } from "react";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,

    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  status: {
    danger: "orange",
  },
});

const sheets = new ServerStyleSheets();

// import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
export default function App({ Component, pageProps }) {
  const sheets = new ServerStyleSheets();
  const css = sheets.toString();

  return (
    <ThemeProvider theme={theme}>
      {css}
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
