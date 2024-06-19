import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, ButtonGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { EMPLOYERS } from "../../graphql/admin";
import { BAN_USER } from "../../graphql/user";
import { toast } from "react-toastify";

export default function Clients() {
  const { data, loading, refetch } = useQuery(EMPLOYERS);

  const [banUser, banUserMut] = useMutation(BAN_USER);

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
    {
      field: "banned",
      headerName: "Banned",
      flex: 1,
      renderCell: ({ value }) => (value ? "banned" : "active"),
    },
    {
      field: "",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <ButtonGroup>
          <Button
            onClick={async () => {
              try {
                await banUser({
                  variables: {
                    userId: row?.id,
                    ban: row?.banned ? false : true,
                  },
                });
                refetch();
                toast.success("User Successfully Banned !");
              } catch (error) {
                toast.error(error?.message);
              }
            }}
          >
            {row?.banned ? "Unban" : "Ban"}
          </Button>
        </ButtonGroup>
      ),
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
