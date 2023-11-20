import * as React from "react";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useState } from "react";
import Typography from "@mui/material/Typography";

const column = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 200,
    editable: true,
    filterable: true,
    resizable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 200,
    editable: true,
    filterable: true,
    resizable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 200,
    editable: true,
    filterable: true,
    resizable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    filterable: true,
    resizable: true,

    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 20 },
  { id: 6, lastName: "Melisandre", firstName: "nully", age: 50 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 47, lastName: "Turner", firstName: "Chloe", age: 27 },
  { id: 48, lastName: "Harrison", firstName: "Mason", age: 32 },
  { id: 49, lastName: "Dixon", firstName: "Aria", age: 23 },
  { id: 50, lastName: "Morris", firstName: "Ethan", age: 41 },
  { id: 51, lastName: "Spencer", firstName: "Sophie", age: 36 },
  { id: 52, lastName: "Chapman", firstName: "Logan", age: 29 },
  { id: 53, lastName: "Henderson", firstName: "Lily", age: 34 },
  { id: 54, lastName: "Wells", firstName: "Jackson", age: 42 },
  { id: 55, lastName: "Black", firstName: "Olivia", age: 27 },
  { id: 56, lastName: "Barnett", firstName: "Aiden", age: 38 },
  { id: 57, lastName: "Fox", firstName: "Sophia", age: 31 },
  { id: 58, lastName: "Gill", firstName: "Liam", age: 35 },
  { id: 59, lastName: "Sharp", firstName: "Ella", age: 26 },
  { id: 60, lastName: "Wright", firstName: "Ava", age: 35 },
  { id: 61, lastName: "Hanson", firstName: "Noah", age: 40 },
  { id: 62, lastName: "Hickman", firstName: "Emma", age: 25 },
  { id: 63, lastName: "Craft", firstName: "Charlotte", age: 30 },
  { id: 64, lastName: "Diaz", firstName: "Lucas", age: 28 },
  { id: 65, lastName: "Hart", firstName: "Mia", age: 32 },
  { id: 66, lastName: "Perry", firstName: "Lucy", age: 24 },
  { id: 67, lastName: "Mcdowell", firstName: "Oliver", age: 28 },
  { id: 68, lastName: "Cobb", firstName: "Caden", age: 26 },
  { id: 69, lastName: "Ross", firstName: "Harper", age: 22 },
  { id: 70, lastName: "Blair", firstName: "Aaliyah", age: 30 },
  { id: 71, lastName: "Byrd", firstName: "William", age: 24 },
  { id: 72, lastName: "Hopkins", firstName: "Isabella", age: 27 },
  { id: 73, lastName: "Rasmussen", firstName: "Evelyn", age: 31 },
  { id: 74, lastName: "Castro", firstName: "James", age: 36 },
  { id: 75, lastName: "Aguilar", firstName: "Lily", age: 30 },
  { id: 76, lastName: "Acosta", firstName: "Ava", age: 34 },
  { id: 77, lastName: "Rodriguez", firstName: "Sophia", age: 29 },
  { id: 78, lastName: "Nguyen", firstName: "Elijah", age: 25 },
  { id: 79, lastName: "Tran", firstName: "Benjamin", age: 38 },
  { id: 80, lastName: "Nguyen", firstName: "Amelia", age: 22 },
  { id: 81, lastName: "Le", firstName: "Jacob", age: 32 },
  { id: 82, lastName: "Nguyen", firstName: "Aubrey", age: 26 },
  { id: 83, lastName: "Nguyen", firstName: "Olivia", age: 20 },
  { id: 84, lastName: "Nguyen", firstName: "Liam", age: 35 },
  { id: 85, lastName: "Nguyen", firstName: "Charlotte", age: 39 },
  { id: 86, lastName: "Nguyen", firstName: "Emma", age: 33 },
  { id: 87, lastName: "Nguyen", firstName: "Mia", age: 43 },
  { id: 88, lastName: "Nguyen", firstName: "Emily", age: 27 },
  { id: 89, lastName: "Nguyen", firstName: "Clara", age: 31 },
  { id: 90, lastName: "Nguyen", firstName: "Gracie", age: 25 },
  { id: 91, lastName: "Nguyen", firstName: "Ella", age: 45 },
  { id: 92, lastName: "Nguyen", firstName: "Harper", age: 29 },
  { id: 93, lastName: "Nguyen", firstName: "Avery", age: 33 },
  { id: 94, lastName: "Nguyen", firstName: "Nora", age: 37 },
  { id: 95, lastName: "Nguyen", firstName: "Zoe", age: 41 },
  { id: 96, lastName: "Nguyen", firstName: "Audrey", age: 25 },
  { id: 97, lastName: "Nguyen", firstName: "Natalie", age: 39 },
  { id: 98, lastName: "Nguyen", firstName: "Sadie", age: 33 },
];

const pageSize = 10;

export default function Data() {
  const [filterText, setFilterText] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [columns, setColumns] = useState(column);
  const [currentPage, setCurrentPage] = useState(1);

  //for the global search
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setCurrentPage(1);
  };

  //for the column wise search
  const handleColumnFilterChange = (field, value) => {
    setColumnFilters((prevFilters) => {
      const newColumnFilters = { ...prevFilters, [field]: value };
      const combinedFilters = Object.values(newColumnFilters)
        .join("")
        .toLowerCase();

      setFilterText(combinedFilters);

      setCurrentPage(1);

      return newColumnFilters;
    });
  };

  const renderHeader = (params) => (
    <div>
      <input
        type="text"
        value={columnFilters[params.field] || ""}
        placeholder={`Search by ${params.field}`}
        onChange={(e) => handleColumnFilterChange(params.field, e.target.value)}
        style={{
          marginLeft: "8px",
          color: "GrayText",
          backgroundColor: "#333541",
          borderRadius: "5px",
          border: "1px solid #555561",
        }}
      />
    </div>
  );

  const filteredRows = rows.filter((row) => {
    return Object.entries(row).some(([key, value]) => {
      const lowerCaseValue = value ? value.toString().toLowerCase() : "";
      const globalFilterMatch = lowerCaseValue.includes(
        filterText.toLowerCase()
      );

      const columnFilterValue = columnFilters[key];
      const columnFilterMatch = columnFilterValue
        ? lowerCaseValue.includes(columnFilterValue.toLowerCase())
        : true;

      return globalFilterMatch && columnFilterMatch;
    });
  });

    // Pagination
    const totalPages = Math.ceil(filteredRows.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRows = filteredRows.slice(startIndex, endIndex);
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        width: "100vw",
        marginTop: "25px",
      }}
    >
      <Typography sx={{ color: "white" }}>DATA TABLE</Typography>
      <input
        type="text"
        placeholder="Search Datas here..."
        value={filterText}
        onChange={handleFilterChange}
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          height: "30px",
          width: "25%",
          backgroundColor: "#333541",
          borderRadius: "5px",
          border: "1px solid #555561",
          color: "white",
        }}
      />
      <div sx={{ display: "grid" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          {columns.map((col) => (
            <div
              key={col.field}
              style={{
                marginLeft: "100px",
                marginTop: "25px",
                marginBottom: "10px",
              }}
            >
              {renderHeader(col)}
            </div>
          ))}
        </div>
        <div sx={{ display: "grid", width: "90%" }}>
          <DataGridPro
            rows={paginatedRows}
            columns={columns.map((col) => ({
              ...col,
              key: col.field,
              headerAlign: "center",
              align: "center",
              resizable: true,
            }))}
            pagination
            pageSizeOptions={[pageSize]}
            checkboxSelection
            disableRowSelectionOnClick
            page={currentPage}
            onPageChange={handlePageChange}
            rowCount={filteredRows.length}
            sx={{ color: "white", height: "60vh", width: "90vw" }}
          />
        </div>
      </div>
    </Box>
  );
}
