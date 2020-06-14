import Document, { Html, Head, Main, NextScript } from "next/document";
import { useContext, useReducer } from "react";

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <button id='playbackBtn'>Playback</button>
          <script type="module" src="./index.js"></script>

        </body>
      </Html>
    );
  }
}

export default MyDocument;
