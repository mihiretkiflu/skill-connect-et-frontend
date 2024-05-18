import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomCard from "../../../components/CustomCard";
import {
  CustomTextAread,
  CustomTextField,
} from "../../../components/CustomTextField";

export default function PostProject() {
  const [apply, setApply] = useState(false);

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
                title={"Post a Project"}
                customStyle={{
                  "&:hover": {
                    background: "grey",
                  },
                }}
              >
                <div className=" mt-2">
                  <Divider />{" "}
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
                      name={"headline"}
                      label={"Headline"}
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
                      name={"skills"}
                      label={"Skills"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Scope"}
                      label={"Scope"}
                      options={["Large", "Medium", "Small"]}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"duration"}
                      label={"Project Duration"}
                    />{" "}
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Project Time"}
                      label={"Project Time"}
                      options={["1 Month", "3 Month", "6 Month"]}
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
                      name={"Title"}
                      label={"Title"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Link"}
                      label={"Link"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"Attachment"}
                      label={"Attachment"}
                    />
                    <CustomTextAread
                      lf={4}
                      tf={8}
                      control={control}
                      name={"description"}
                      label={"Description"}
                      rows={8}
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
          <div className="col-lg-4">{/* <RightSideView /> */}</div>
        </div>
      </div>
    </div>
  );
}
