import { DefaultSeo } from "next-seo";

import SEO from "../styles/seo.config";

import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
