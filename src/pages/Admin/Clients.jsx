import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { EMPLOYERS } from "../../graphql/admin";

export default function Clients() {
  const { data, loading } = useQuery(EMPLOYERS);
  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 1,
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];
  return (
    <Box height={"100%"}>
      <DataGrid
        columns={columns}
        rows={data?.employers || []}
        loading={loading}
      />
    </Box>
  );
}
