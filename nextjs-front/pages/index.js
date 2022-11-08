import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getAllRestaurantData } from "../lib/restaurants";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allRestaurantData = await getAllRestaurantData();
  return {
    props: {
      allRestaurantData,
    },
  };
}

const TableRow = function ({ restaurant }) {
  return (
    <tr>
      <td>{restaurant.id}</td>
      <td>{restaurant.name}</td>
      <td>{restaurant.location}</td>
      <td>
        <Date dateString={restaurant.created_at} />
      </td>
      <td>{restaurant.rating ? restaurant.rating : "Sin rating"}</td>
      <td>{restaurant.checkbox ? "Visitado" : "No visitado"}</td>
      <td>
        <Link href={`/restaurants/${restaurant.id}`}>
          <button>Detalle</button>
        </Link>
      </td>
      <td>
        <Link href={`/restaurants/${restaurant.id}/edit`}>
          <button>Editar</button>
        </Link>
      </td>
      <td>
        <button
          onClick={() =>
            console.log("acá debería llamarse a la api para eliminar")
          }
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

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
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Fecha de creación</th>
              <th>Rating</th>
              <th>Visitado</th>
            </tr>
          </thead>
          <tbody>
            {allRestaurantData.map((restaurant) => (
              <TableRow key={restaurant.id} restaurant={restaurant} />
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
