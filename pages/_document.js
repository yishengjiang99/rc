import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script type="module" src="./gaudio.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="console">loading console</div>
          <script type="module" src="./_console.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
