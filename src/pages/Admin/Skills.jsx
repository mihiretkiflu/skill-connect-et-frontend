import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { SKILLS } from "../../graphql/admin";

export default function Skills() {
  const { data, loading } = useQuery(SKILLS);

  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "lastname",
      headerName: "Description",
      flex: 1,
    },
  ];

  return (
    <Box height={"100%"}>
      <DataGrid columns={columns} rows={data?.skills || []} loading={loading} />
    </Box>
  );
}
