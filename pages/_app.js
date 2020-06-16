import { DefaultSeo } from "next-seo";
import SEO from "../styles/seo.config";
import "../styles/global.css";
import {
  ServerStyleSheets,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { createRef, useState, useContext, createContext } from "react";
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
  const [ctx, setCtx] = useState(null);
  const gg = createRef();
  return (
    <ThemeProvider theme={theme}>
      {css}
      <DefaultSeo {...SEO} />
      {ctx !== null ? (
        <Component {...pageProps} />
      ) : (
        <Button
          style={{ width: "80vw", height: "20em" }}
          onClick={async (e) => {
            window.gctx = await new AudioContext();
            setCtx(window.gctx);
          }}
        >
          Click to start
        </Button>
      )}
    </ThemeProvider>
  );
}
