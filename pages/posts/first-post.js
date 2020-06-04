import Link from 'next/Link';
import Head from 'next/head';
import Layout from '../../components/layout.js';
export default function firstPost(){

    return(
        <Layout>
            <Head>
                <title>Create Next Aaapp</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2>
            <Link href="/">
                <a>Back to home</a>
            </Link>
            </h2>
            <h1>First Post</h1>
   
      </Layout>
      )
}