import { useRouter } from "next/router";
import { useState } from "react";
export default function RestaurantForm(props) {
  const router = useRouter();
  const [name, setName] = useState(props.name ? props.name : "");
  const [food_type, setFoodType] = useState(
    props.food_type ? props.food_type : ""
  );
  const [location, setLocation] = useState(
    props.location ? props.location : ""
  );
  const [rating, setRating] = useState(props.rating ? props.rating : "");
  const [checkbox, setCheckbox] = useState(
    props.checkbox ? props.checkbox : false
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const Submitting = async (e) => {
    e.preventDefault();
    setLoading(true);
    const restaurant = { name, location, food_type, rating, checkbox };
    const status = await props.handleSubmit(restaurant);
    if (status) {
      router.push("/");
    } else {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="Form-restaurant">
      <form onSubmit={Submitting}>
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
