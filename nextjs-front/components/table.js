import { useEffect, useState } from "react";
import TableBody from "./tableBody";
import TableHead from "./tableHead";
import SearchBar from "../components/searchBar";

export default function Table({ data, columns, deleteMethod }) {
  const [tableData, setTableData] = useState(data);
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };
  const handleSearch = (search) => {
    const filter = data.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(search.toLowerCase());
    });
    setTableData(filter);
  };
  const handleLocationSearch = (search) => {
    const filter = data.filter((restaurant) => {
      return restaurant.location.toLowerCase().includes(search.toLowerCase());
    });
    setTableData(filter);
  };
  return (
    <>
      <SearchBar onSearch={handleLocationSearch} field="location" />
      <SearchBar onSearch={handleSearch} field="name" />
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody
          columns={columns}
          tableData={tableData}
          deleteMethod={deleteMethod}
        />
      </table>
    </>
  );
}
