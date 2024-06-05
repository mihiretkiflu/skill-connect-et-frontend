import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Chip, Divider } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomCard from "../../../components/CustomCard";
import { CustomTextField } from "../../../components/CustomTextField";
import { APPLY_FOR_JOB } from "../../../graphql/job";
import RightSideView from "./RightSideView";

export default function WorkDetail() {
  const { currentUser } = useSelector((state) => state.auth);

  const { state } = useLocation();
  const [apply, setApply] = useState(false);

  const [applyToJob, { loading }] = useMutation(APPLY_FOR_JOB);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {},
  });

  const onSubmit = async (values) => {
    try {
      await applyToJob({
        variables: {
          input: {
            employer_id: state?.job?.employer_id,
            job_id: state?.job?.id,
            price_offer: parseFloat(values.price_offer || 0),
            ...values,
          },
        },
      });

      toast.success("Job Successfully Applied !", { autoClose: 500 });
      // navigate("/find-work");
      reset();
      setApply(false);
    } catch (error) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

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
                title={state?.job?.name}
                subTitle={new Date(state?.job?.createdAt).toLocaleString()}
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
                  <p>{state?.job?.description}</p>
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
                  <span>{state?.job?.applications?.length} Proposals</span>
                  <span>Payment Verified</span>
                  <span>*****</span>
                  <span>98,000 ETB Spent</span>
                  <span>Addis Ababa</span>
                </div>

                <div className=" mt-2">
                  <Divider />{" "}
                </div>

                <div className="d-flex mt-3 justify-content-start">
                  {!apply && currentUser?.role === "freelance" && (
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
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <CustomTextField
                        lf={4}
                        tf={8}
                        control={control}
                        name={"price_offer"}
                        label={"Price Offer"}
                        type={"number"}
                      />
                      {/* <CustomTextField
                        lf={4}
                        tf={8}
                        control={control}
                        name={"duration"}
                        label={"Project Duration"}
                      /> */}
                      <CustomTextField
                        lf={4}
                        tf={8}
                        control={control}
                        name={"about_freelancer"}
                        label={"Cover Letter"}
                        rows={8}
                      />
                      <div className="d-flex mt-3 justify-content-between">
                        {apply && (
                          <Button
                            variant="outlined"
                            onClick={() => setApply(false)}
                          >
                            Hide Application Detail
                          </Button>
                        )}

                        {apply && (
                          <Button
                            variant="contained"
                            startIcon={<CheckCircleOutlineOutlined />}
                            color="success"
                            type={loading ? "button" : "submit"}
                          >
                            {loading ? "Loading..." : "Apply"}
                          </Button>
                        )}
                      </div>{" "}
                    </form>
                  </div>
                )}
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

const validator = yupResolver(
  Yup.object().shape({
    price_offer: Yup.number().required(),
    about_freelancer: Yup.string().required(),
  })
);
