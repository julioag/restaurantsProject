import { useState } from "react";
import TableBody from "./tableBody";
import TableHead from "./tableHead";
import SearchBar from "../components/searchBar";
import DateFilter from "../components/dateFilter";
import { getRestaurantsByDate } from "../lib/restaurants";
import styles from "../styles/table.module.css";

export default function Table({ data, columns, deleteMethod }) {
  const [tableData, setTableData] = useState(data);
  const [currentData, setCurrentData] = useState(data);
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
    const filter = currentData.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(search.toLowerCase());
    });
    setTableData(filter);
  };
  const handleLocationSearch = (search) => {
    const filter = currentData.filter((restaurant) => {
      return restaurant.location.toLowerCase().includes(search.toLowerCase());
    });
    setTableData(filter);
  };

  const getDateFilter = async (date) => {
    const filter = await getRestaurantsByDate(date);
    setCurrentData(filter);
    setTableData(filter);
  };
  return (
    <>
      <SearchBar
        className={styles.filter}
        onSearch={handleLocationSearch}
        field="location"
      />
      <SearchBar
        className={styles.filter}
        onSearch={handleSearch}
        field="name"
      />
      <DateFilter
        className={styles.filter}
        handleSubmit={getDateFilter}
        field="date"
      />
      <table className={styles.table}>
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
