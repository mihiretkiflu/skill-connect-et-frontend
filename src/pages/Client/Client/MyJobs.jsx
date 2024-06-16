import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Chip, Divider, Skeleton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CustomCard from "../../../components/CustomCard";
import { MY_JOBS } from "../../../graphql/job";
import { seeMore } from "../../../utils/misc";
import { SEND_MESSAGE } from "../../../graphql/message";
import { toast } from "react-toastify";

export default function MyJobs() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [application, setApplication] = useState([]);
  const [job, setJob] = useState({});

  const { loading, data } = useQuery(MY_JOBS);
  const [sendMessageMut, { ...sendMessageMutation }] =
    useMutation(SEND_MESSAGE);

  const sendMessage = async (app) => {
    try {
      await sendMessageMut({
        variables: {
          input: {
            content: "Interview Invitation for Role : " + job?.name,
            receiver_id: app?.freelancer?.id,
          },
        },
      });

      navigate("/messages", {
        state: {
          freelancer: app.freelancer,
          job: job,
          application: app,
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-2" style={{ height: "100%" }}>
      <div className="container" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div
            className="col-lg-8"
            style={{ height: "100%", overflow: "auto" }}
          >
            {!loading ? (
              data?.myJobs.map((job) => (
                <Box
                  key={job.id}
                  sx={{
                    maxHeight: "25rem",
                    cursor: "pointer",
                  }}
                >
                  <CustomCard
                    title={job.name}
                    subTitle={new Date(job.createdAt).toLocaleString()}
                  >
                    {/* <div
                      className="d-flex"
                      style={{
                        gap: "1rem",
                        fontSize: ".8rem",
                        color: "#899bbd",
                      }}
                    >
                      <span>Fixed Price</span> -<span>Intermediate</span> -
                      <span>Estimated Budget : 10000 ETB</span>
                    </div> */}

                    <div className="pt-3" style={{ height: "10rem" }}>
                      <p>
                        {job.description.length > 350
                          ? seeMore(job.description, 350)
                          : job.description}
                      </p>
                    </div>
                    <div className="d-flex" style={{ gap: ".5rem" }}>
                      <Chip size="small" label={job?.skill?.name} />

                      <span>{job?.applications?.length} Proposals</span>
                    </div>

                    <div
                      className="d-flex mt-2"
                      style={{
                        gap: "1.5rem",
                        fontSize: ".9rem",
                        color: "rgb(115 129 155)",
                      }}
                    >
                      {/* <span>{job?.applications?.length} Proposals</span> */}
                      {/* <span>Payment Verified</span>
                      <span>*****</span>
                      <span>98,000 ETB Spent</span>
                      <span>Addis Ababa</span> */}
                    </div>

                    <div className=" mt-2">
                      <Divider />
                    </div>

                    <div className="d-flex mt-3 justify-content-start">
                      <Button
                        variant="outlined"
                        onClick={async () => {
                          setApplication(job?.applications);
                          setJob({
                            id: job?.id,
                            employer_id: job?.employer_id,
                            name: job?.name,
                          });
                        }}
                      >
                        {t("View Applications")}
                      </Button>
                    </div>
                  </CustomCard>
                </Box>
              ))
            ) : (
              <Skeleton height={"15rem"} />
            )}
          </div>
          <div className="col-lg-4">
            <CustomCard title={"Applications"}>
              {application?.map((app) => (
                <Stack
                  key={app.id}
                  borderBottom={1}
                  borderColor={"divider"}
                  pb={1}
                >
                  <Stack direction={"row"}>
                    <span style={{ fontWeight: "bold" }}>
                      {t("Frelancer Name")} :
                    </span>
                    <span>{app?.freelancer?.fullname}</span>
                  </Stack>
                  <Stack direction={"row"}>
                    <span style={{ fontWeight: "bold" }}>
                      {t("Price Offer")} :
                    </span>
                    <span>{app.price_offer} ETB</span>
                  </Stack>
                  <Stack direction={"row"}>
                    <span style={{ fontWeight: "bold" }}>
                      {t("Applied At")} :
                    </span>
                    <span>{new Date(app.createdAt).toLocaleString()} </span>
                  </Stack>
                  <Stack>
                    <span style={{ fontWeight: "bold" }}>
                      {t("Cover Letter")}
                    </span>
                    {/* <span>{app.about_freelancer}</span> */}
                  </Stack>

                  <div className="d-flex mt-3 justify-content-start">
                    <Button variant="outlined" onClick={() => sendMessage(app)}>
                      {t("Invite for Interview")}
                    </Button>
                  </div>
                </Stack>
              ))}
            </CustomCard>
          </div>
        </div>
      </div>
    </div>
  );
}
