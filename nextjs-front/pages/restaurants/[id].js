import Head from "next/head";
import Layout from "../../components/layout";
import { getAllRestaurantIds, getRestaurantData } from "../../lib/restaurants";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
  const restaurantData = await getRestaurantData(params.id);
  return {
    props: {
      restaurantData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllRestaurantIds();
  return {
    paths,
    fallback: false,
  };
}

export default function RestaurantDetail({ restaurantData }) {
  return (
    <Layout>
      <Head>
        <title>{restaurantData.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{restaurantData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={restaurantData.created_at} />
          <p>{restaurantData.location}</p>
        </div>
      </article>
    </Layout>
  );
}
