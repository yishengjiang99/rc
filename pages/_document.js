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
          <script src="https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js"></script>
          <script src="https://www.gstatic.com/firebasejs/7.15.1/firebase-firestore.js"></script>
          <script type="module" src="./db.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script type="module" src="./gaudio.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
