import React, { useState } from "react";
import url from "../../config/url";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import RestaurantForm from "../../components/restaurantForm";

export default function NewRestaurant() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [food_type, setFoodType] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("2.5");
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const restaurant = { name, location, food_type, rating, checkbox };
    const response = await fetch(url, {
      method: "POST",
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
      <h1>Crea un nuevo restaurant</h1>
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
