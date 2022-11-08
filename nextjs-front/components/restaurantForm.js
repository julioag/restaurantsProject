export default function RestaurantForm({
  name,
  food_type,
  location,
  rating,
  checkbox,
  handleSubmit,
  error,
  loading,
}) {
  return (
    <div className="Form-restaurant">
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
