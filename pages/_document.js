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
<<<<<<< HEAD
=======
          <script type="module" src="./gaudio.js"></script>
          <div id="console">loading console</div>
          <script type="module" src="./_console.js"></script>
>>>>>>> d415feed1faca14a924231e52e9f4a360ca1c803
        </body>
      </Html>
    );
  }
}

export default MyDocument;
