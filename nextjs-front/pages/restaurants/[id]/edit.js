import Head from "next/head";
import React, { useState } from "react";
import Layout from "../../../components/layout";
import {
  getAllRestaurantIds,
  getRestaurantData,
} from "../../../lib/restaurants";
import { useRouter } from "next/router";
import url from "../../../config/url";
import RestaurantForm from "../../../components/restaurantForm";

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
    const response = await fetch(`${url}/${restaurantData.id}`, {
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
      <h1>Edita el restaurant {name}</h1>
      <RestaurantForm
        name={name}
        food_type={food_type}
        location={location}
        rating={rating}
        checkbox={checkbox}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </Layout>
  );
}
