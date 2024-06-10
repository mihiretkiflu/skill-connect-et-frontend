import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function Jobs() {
  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 1,
    },
    {
      field: "firstname",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "lastname",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Posted at",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Employer Name",
      flex: 1,
    },
  ];
  return (
    <Box height={"100%"}>
      <DataGrid columns={columns} rows={[]} />
    </Box>
  );
}
