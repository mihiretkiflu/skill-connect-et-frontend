import { useQuery } from "@apollo/client";
import { Box, Chip, Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import CustomCard from "../../../components/CustomCard";
import { JOBS } from "../../../graphql/job";
import { seeMore } from "../../../utils/misc";
import RightSideView from "./RightSideView";
import { useTranslation } from "react-i18next";

export default function FindWork() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { data, loading } = useQuery(JOBS);

  return (
    <div className="p-2" style={{ height: "100%" }}>
      <div className="container" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div
            className="col-lg-8"
            style={{ height: "100%", overflow: "auto" }}
          >
            {!loading ? (
              data?.Jobs.map((job) => (
                <Box
                  sx={{
                    maxHeight: "20rem",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(job.name.toLowerCase().replaceAll(" ", "_"), {
                      state: { job },
                    })
                  }
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

                      <span>
                        {t("n Proposals", { count: job?.applications?.length })}
                      </span>
                    </div>

                    <div
                      className="d-flex mt-2"
                      style={{
                        gap: "1.5rem",
                        fontSize: ".9rem",
                        color: "rgb(115 129 155)",
                      }}
                    >
                      {/* <span>{job?.applications?.length} Proposals</span>
                      <span>Payment Verified</span>
                      <span>*****</span>
                      <span>98,000 ETB Spent</span>
                      <span>Addis Ababa</span> */}
                    </div>
                  </CustomCard>
                </Box>
              ))
            ) : (
              <Skeleton height={"15rem"} />
            )}
          </div>
          <div className="col-lg-4">
            <RightSideView />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
