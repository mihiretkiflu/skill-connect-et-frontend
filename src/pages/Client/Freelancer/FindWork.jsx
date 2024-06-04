import { Box, Chip, Skeleton } from "@mui/material";
import React from "react";
import CustomCard from "../../../components/CustomCard";
import { useNavigate } from "react-router";
import RightSideView from "./RightSideView";
import { useQuery } from "@apollo/client";
import { JOBS } from "../../../graphql/job";
import { seeMore } from "../../../utils/misc";

export default function FindWork() {
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
                    customStyle={{
                      "&:hover": {
                        background: "grey",
                      },
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{
                        gap: "1rem",
                        fontSize: ".8rem",
                        color: "#899bbd",
                      }}
                    >
                      <span>Fixed Price</span> -<span>Intermediate</span> -
                      <span>Estimated Budget : 10000 ETB</span>
                    </div>

                    <div className="pt-3" style={{ height: "10rem" }}>
                      <p>
                        {job.description.length > 350
                          ? seeMore(job.description, 350)
                          : job.description}
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
                      <span>{job?.applications?.length} Proposals</span>
                      <span>Payment Verified</span>
                      <span>*****</span>
                      <span>98,000 ETB Spent</span>
                      <span>Addis Ababa</span>
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
