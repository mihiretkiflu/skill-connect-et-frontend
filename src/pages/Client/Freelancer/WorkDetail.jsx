import { Box, Button, Chip, Divider } from "@mui/material";
import React, { useState } from "react";
import CustomCard from "../../../components/CustomCard";
import RightSideView from "./RightSideView";
import {
  CustomTextAread,
  CustomTextField,
} from "../../../components/CustomTextField";
import { useForm } from "react-hook-form";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";

export default function WorkDetail() {
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
                title={"Experienced React developer for fixing few bugs"}
                subTitle={"Posted 2 hours ago"}
                customStyle={{
                  "&:hover": {
                    background: "grey",
                  },
                }}
              >
                <div className="mb-3">
                  <Chip size="medium" label={"Front End Developer"} />
                </div>
                <div
                  className="d-flex"
                  style={{ gap: "1rem", fontSize: ".8rem", color: "#899bbd" }}
                >
                  <span>Fixed Price</span> -<span>Intermediate</span> -
                  <span>Estimated Budget : 10000 ETB</span>
                </div>

                <div className="pt-3">
                  <p>
                    Hi guys we have a MERN stack website spillword.com. We would
                    like to add the following functionalities within the
                    subdomain app.spillword.com Add fireflies.ai: Same design,
                    functionalities, credit system etc as fireflies.ai. Nothing
                    needs to change. Including the left sidebar. You can use the
                    html and page ripper to develop the frontend.
                  </p>
                  <p>
                    Hi guys we have a MERN stack website spillword.com. We would
                    like to add the following functionalities within the
                    subdomain app.spillword.com Add fireflies.ai: Same design,
                    functionalities, credit system etc as fireflies.ai. Nothing
                    needs to change. Including the left sidebar. You can use the
                    html and page ripper to develop the frontend.
                  </p>
                </div>

                <div className="d-flex" style={{ gap: ".5rem" }}>
                  <Chip size="small" label={"MongoDB"} />
                  <Chip size="small" label={"ExpressJS"} />
                  <Chip size="small" label={"React"} />
                  <Chip size="small" label={"Node.js"} />
                </div>

                <div
                  className="d-flex mt-2"
                  style={{
                    gap: "1.5rem",
                    fontSize: ".9rem",
                    color: "rgb(115 129 155)",
                  }}
                >
                  <span>50 Proposals</span>
                  <span>Payment Verified</span>
                  <span>*****</span>
                  <span>98,000 ETB Spent</span>
                  <span>Addis Ababa</span>
                </div>

                <div className=" mt-2">
                  <Divider />{" "}
                </div>

                <div className="d-flex mt-3 justify-content-start">
                  {!apply && (
                    <Button variant="outlined" onClick={() => setApply(true)}>
                      View Application Detail
                    </Button>
                  )}
                </div>

                {apply && (
                  <div className="mt-4">
                    <form
                      action="d-flex flex-direction-col"
                      style={{ gap: "5px" }}
                    >
                      <CustomTextField
                        lf={4}
                        tf={8}
                        control={control}
                        name={"bid"}
                        label={"Bid"}
                      />
                      <CustomTextField
                        lf={4}
                        tf={8}
                        control={control}
                        name={"duration"}
                        label={"Project Duration"}
                      />
                      <CustomTextAread
                        lf={4}
                        tf={8}
                        control={control}
                        name={"cover_letter"}
                        label={"Cover Letter"}
                        rows={8}
                      />
                    </form>
                  </div>
                )}

                <div className="d-flex mt-3 justify-content-between">
                  {apply && (
                    <Button variant="outlined" onClick={() => setApply(false)}>
                      Hide Application Detail
                    </Button>
                  )}

                  {apply && (
                    <Button
                      variant="contained"
                      startIcon={<CheckCircleOutlineOutlined />}
                      color="success"
                      onClick={() => {}}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </CustomCard>
            </Box>
          </div>
          <div className="col-lg-4">
            <RightSideView />
          </div>
        </div>
      </div>
    </div>
  );
}
