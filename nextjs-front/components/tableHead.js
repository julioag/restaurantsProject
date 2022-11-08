import { useState } from "react";

export default function TableHead({ columns, handleSorting }) {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (field) => {
    const sortOrder = field === sortField && order === "asc" ? "desc" : "asc";
    setSortField(field);
    setOrder(sortOrder);
    handleSorting(field, sortOrder);
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.label}
            onClick={() => handleSortingChange(column.label)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
