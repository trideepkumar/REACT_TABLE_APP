import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
    filterable: true,
    resizable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
    filterable: true,
    resizable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
    filterable: true,
    resizable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
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
];

export default function Data() {
  const [filterText, setFilterText] = useState("");
  const [columnFilters, setColumnFilters] = useState({});

  //for the global search
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  //for the column wise search
  const handleColumnFilterChange = (field, value) => {
    setColumnFilters((prevFilters) => {
      const newColumnFilters = { ...prevFilters, [field]: value };
      const combinedFilters = Object.values(newColumnFilters)
        .join("")
        .toLowerCase();

      setFilterText(combinedFilters);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 450,
        width: "100%",
        marginTop: "25px",
      }}
    >
      <Typography sx={{color:"white"}}>DATA TABLE</Typography>
      <input
        type="text"
        placeholder="Search Datas here..."
        value={filterText}
        onChange={handleFilterChange}
        style={{
          marginBottom: "10px",
          height: "30px",
          width: "60%",
          backgroundColor: "#333541",
          borderRadius: "5px",
          border: "1px solid #555561",
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
            <div key={col.field} style={{ marginRight: "16px" }}>
              {renderHeader(col)}
            </div>
          ))}
        </div>
        <DataGrid
          rows={filteredRows}
          //   columns={columns}
          columns={columns.map((col) => ({
            ...col,
            headerAlign: "center",
            align: "center",
            resizable: true,
            width: 155,
          }))}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{color:'white'}}
        />
      </div>
    </Box>
  );
}
