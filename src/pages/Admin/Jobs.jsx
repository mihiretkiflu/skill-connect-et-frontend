import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { JOBS } from "../../graphql/admin";

export default function Jobs() {
  const { data, loading } = useQuery(JOBS);

  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Headline",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Posted at",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: "employer",
      headerName: "Employer Name",
      flex: 1,
      renderCell: ({ value }) => value?.fullname,
    },
  ];
  return (
    <Box height={"100%"}>
      <DataGrid columns={columns} rows={data?.Jobs || []} loading={loading} />
    </Box>
  );
}
