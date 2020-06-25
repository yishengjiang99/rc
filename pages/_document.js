import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <div id="rx1"></div>
          <Main />
          <NextScript />
          <div id="debug"></div>
          <script type="module" src="./gaudio.js"></script>
          <script type="module" src="./keyboard/piano.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
