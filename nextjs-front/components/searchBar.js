import { useState } from "react";
import { useEffect } from "react";
export default function SearchBar({ onSearch, field, className }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch(search);
  }, [search]);
  return (
    <div className={className}>
      <label>Filtra por {field} </label>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
