import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getAllRestaurantData } from "../lib/restaurants";
import Table from "../components/table";

export async function getStaticProps() {
  const allRestaurantData = await getAllRestaurantData();
  const columns = Object.keys(allRestaurantData[0]).map((key) => {
    return { label: key };
  });
  return {
    props: {
      allRestaurantData,
      columns,
    },
  };
}

export default function Home({ allRestaurantData, columns }) {
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
        <button onClick={() => router.push("restaurants/new")}>
          Crear nuevo restaurant
        </button>
        <Table data={allRestaurantData} columns={columns} />
      </section>
    </Layout>
  );
}
