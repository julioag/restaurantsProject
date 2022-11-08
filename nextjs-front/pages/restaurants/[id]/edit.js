import Head from "next/head";
import React, { useState } from "react";
import Layout from "../../../components/layout";
import {
  getAllRestaurantIds,
  getRestaurantData,
} from "../../../lib/restaurants";
import { useRouter } from "next/router";

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

export default function EditRestaurant({ restaurantData }) {
  const router = useRouter();
  const [name, setName] = useState(restaurantData.name);
  const [food_type, setFoodType] = useState(restaurantData.food_type);
  const [location, setLocation] = useState(restaurantData.location);
  const [rating, setRating] = useState(restaurantData.rating);
  const [checkbox, setCheckbox] = useState(restaurantData.checkbox);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const restaurant = { name, location, food_type, rating, checkbox };
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    });
    if (response.ok) {
      router.push("/");
    } else {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="Form-restaurant">
        <h2>Add a New Restaurant</h2>
        <form onSubmit={handleSubmit}>
          <label>Restaurant name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Tipo de comida</label>
          <input
            type="text"
            required
            value={food_type}
            onChange={(e) => setFoodType(e.target.value)}
          />
          <label>Location:</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Rating:</label>
          <input
            type="number"
            required
            value={rating === null ? "" : rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <label>Checkbox:</label>
          <input
            type="checkbox"
            value={checkbox}
            checked={checkbox}
            onChange={(e) => setCheckbox(e.currentTarget.checked)}
          />
          <p>Aquí esta el checkbox: </p>
          {!loading && <button>Edit Restaurant</button>}
          {loading && <button disabled>Editting Restaurant...</button>}
          {error && <div>{error}</div>}
        </form>
      </div>
    </Layout>
  );
}
