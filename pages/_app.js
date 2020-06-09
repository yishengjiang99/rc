import { DefaultSeo } from "next-seo";
import SEO from "../styles/seo.config";
import "../styles/global.css";
import { useContext, createContext } from "react";
// import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <PrimarySearchAppBar /> */}
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
