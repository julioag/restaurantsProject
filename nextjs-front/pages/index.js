import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getRestaurantData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allRestaurantData = await getRestaurantData();
  return {
    props: {
      allRestaurantData,
    },
  };
}

export default function Home({ allRestaurantData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hola, soy Julio soy ingeniero en software haciendo de prueba este
          frontend app.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Restaurantes</h2>
        <ul className={utilStyles.list}>
          {allRestaurantData.map(({ id, name, location, created_at }) => (
            <li className={utilStyles.listItem} key={id}>
              {/* <Link href={`/restaurants/${id}`}>{name}</Link> */}
              <h3>
                {id}.-
                {name}
              </h3>
              <p>{location}</p>
              <small className={utilStyles.lightText}>
                <Date dateString={created_at} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
