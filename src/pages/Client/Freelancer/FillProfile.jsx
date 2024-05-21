import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomCard from "../../../components/CustomCard";
import { CustomTextField } from "../../../components/CustomTextField";

export default function CreateProfile() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    // resolver: validator,
    defaultValues: {},
  });

  return (
    <div className="p-2" style={{ height: "100%" }}>
      <div className="container" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-lg-8" style={{ height: "100%" }}>
            <Box
              sx={{
                maxHeight: "100%",
                overflow: "auto",
              }}
            >
              <CustomCard
                title={"Create Your Profile"}
                customStyle={{
                  "&:hover": {
                    background: "grey",
                  },
                }}
              >
                <div className=" mt-2">
                  <Divider />
                </div>

                <div className="mt-4">
                  <form
                    action="d-flex flex-direction-col"
                    style={{ gap: "5px" }}
                  >
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Profile Picture"}
                      label={"Profile Picture"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Full Name"}
                      label={"Full Name"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Category"}
                      label={"Category"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Sub Category"}
                      label={"Sub Category"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Location"}
                      label={"Location"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Title"}
                      label={"Title"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Description"}
                      label={"Description"}
                      rows={8}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Skill"}
                      label={"Skill"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Language"}
                      label={"Language"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Education"}
                      label={"Education"}
                    />{" "}
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Portfolio Link"}
                      label={"Portfolio Link"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Level"}
                      label={"Level"}
                      options={["Entry", "Intermediate", "Experts"]}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Budget"}
                      label={"Maximum Budget"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Attachment"}
                      label={"Attachment"}
                    />
                  </form>
                </div>

                <div className="d-flex mt-3 justify-content-end">
                  <Button
                    variant="contained"
                    startIcon={<CheckCircleOutlineOutlined />}
                    color="success"
                    onClick={() => {}}
                  >
                    Post a Job
                  </Button>
                </div>
              </CustomCard>
            </Box>
          </div>
          <div className="col-lg-4">
            <CustomCard
              title={"Upload Your Profile Picture"}
              customStyle={{
                "&:hover": {
                  background: "grey",
                },
              }}
            >
              <Box
                sx={{
                  height: "8rem",
                  width: "8rem",
                  border: 2,
                  borderStyle: "dashed",
                  borderColor: "gray",
                  borderRadius: ".5rem",
                  cursor: "pointer",
                }}
              ></Box>
            </CustomCard>
          </div>
        </div>
      </div>
    </div>
  );
}
