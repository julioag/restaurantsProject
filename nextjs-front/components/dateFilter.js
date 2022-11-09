import { useState } from "react";

export default function ApiFilter({ field, handleSubmit }) {
  const [date, setDate] = useState("");

  return (
    <div className="FilterContainer">
      <label>Filtra por {field} (API) </label>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        min="2022-08-11"
      />
      <button onClick={() => handleSubmit(date)}>Filtrar</button>
    </div>
  );
}
