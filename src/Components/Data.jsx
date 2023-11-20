import * as React from "react";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import data from "../assets/data";

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

const rows = data

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
  const endIndex = Math.min(startIndex + pageSize, filteredRows.length);
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
