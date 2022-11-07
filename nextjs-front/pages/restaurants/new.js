import React, { useState } from "react";
import url from "../../config/url";
import { useRouter } from "next/router";

export default function NewRestaurant() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [food_type, setFoodType] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
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
    <div className="new-restaurant">
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
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <label>Checkbox:</label>
        <input
          type="checkbox"
          value={checkbox}
          onChange={(e) => setCheckbox(e.currentTarget.checked)}
        />
        {!loading && <button>Add Restaurant</button>}
        {loading && <button disabled>Adding Restaurant...</button>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
