import { useMutation, useQuery } from "@apollo/client";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { CustomTextField } from "../../components/CustomTextField";
import { CREATE_SKILL, SKILLS } from "../../graphql/admin";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Skills() {
  const { t } = useTranslation();

  const { data, loading, refetch } = useQuery(SKILLS);

  const [addSkill, addSkillMut] = useMutation(CREATE_SKILL);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    // resolver: validator,
    defaultValues: {},
  });

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

  const onSave = async (values) => {
    console.log({ values });

    if (watch("name"))
      try {
        const { data } = await addSkill({ variables: { name: watch("name") } });

        refetch();
        reset();
        toast.success("Skill Successfully Added!", { autoClose: 500 });
      } catch (error) {
        toast.error(error.message, {
          autoClose: 500,
        });
      }
  };

  return (
    <Box height={"100%"} position={"relative"}>
      <Button
        sx={{
          position: "absolute",
          top: "-3rem",
          right: "1rem",
          zIndex: 100000000,
        }}
        variant="contained"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add New
      </Button>
      <DataGrid columns={columns} rows={data?.skills || []} loading={loading} />

      <NewContractModal t={t} control={control} onSave={onSave} />
    </Box>
  );
}

function NewContractModal({ t, control, onSave }) {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {t("New Skill")}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3 needs-validation">
              <CustomTextField control={control} name={"name"} label={"Name"} />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {t("Close")}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onSave();
              }}
            >
              {t("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
