import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getAllRestaurantData, deleteRestaurant } from "../lib/restaurants";
import Link from "next/link";
import Date from "../components/date";
import { useRouter } from "next/router";
import Table from "../components/table";

export async function getStaticProps() {
  const allRestaurantData = await getAllRestaurantData();
  return {
    props: {
      allRestaurantData,
    },
  };
}

export default function Home({ allRestaurantData }) {
  const router = useRouter();
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
        <Table data={allRestaurantData} />
      </section>
    </Layout>
  );
}
