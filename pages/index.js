import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";
import FileSystemNavigator from "../components/tree";
import EnvelopConfig from "../components/envelop-config";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Grep|Awk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <FileSystemNavigator />
      <EnvelopConfig
        defaults={{
          attack: 0.5,
          decay: 0.5,
          release: 0.1,
          sustain: 0.5,
        }}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
