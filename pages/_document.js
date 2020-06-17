import Document, { Html, Head, Main, NextScript } from "next/document";
import { useContext, useReducer, createRef } from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const gg = createRef();
    return (
      <Html>
        <Head>
          <script type="module" src="./index.js"></script>
        </Head>
        <body>
          <Main />

          <NextScript />
          <button id="playbackBtn">Playback</button>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
