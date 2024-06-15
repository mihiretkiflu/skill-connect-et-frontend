import { useQuery } from "@apollo/client";
import { Box, Button, ButtonGroup, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import CustomCard from "../../../components/CustomCard";
import { GET_CONTRACTS } from "../../../graphql/contract";
import RightSideView from "./RightSideView";
import { useTranslation } from "react-i18next";

export default function MyContractOffers() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");

  const { data, loading } = useQuery(GET_CONTRACTS);

  return (
    <div className="p-2" style={{ height: "100%" }}>
      <div className="container" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-lg-8">
            <div
              className="pb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                  onClick={() => setFilter("all")}
                  variant={filter === "all" ? "contained" : "outlined"}
                >
                  {t("All")}
                </Button>
                <Button
                  onClick={() => setFilter("accepted")}
                  variant={filter === "accepted" ? "contained" : "outlined"}
                >
                  {t("Accepted")}
                </Button>
                <Button
                  onClick={() => setFilter("rejected")}
                  variant={filter === "rejected" ? "contained" : "outlined"}
                >
                  {t("Rejected")}
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div
            className="col-lg-8"
            style={{ height: "100%", overflow: "auto" }}
          >
            {!loading ? (
              data?.contracts.map((contract) => (
                <Box
                  sx={{
                    maxHeight: "20rem",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      (contract?.id)
                        .toString()
                        .toLowerCase()
                        .replaceAll(" ", "_"),
                      {
                        state: { contract },
                      }
                    )
                  }
                >
                  <CustomCard
                    title={contract?.name}
                    subTitle={new Date(contract.createdAt).toLocaleString()}
                  >
                    <div
                      className="d-flex"
                      style={{
                        gap: "1rem",
                        fontSize: ".8rem",
                        color: "#899bbd",
                      }}
                    >
                      <span>
                        {t("Start Date")}: {contract?.start_date}
                      </span>{" "}
                      -
                      <span>
                        {t("Deadline Date")} : {contract?.deadline_date}
                      </span>{" "}
                      -
                      <span>
                        {t("Offered Budget")} : {contract?.offered_amount} ETB
                      </span>
                    </div>

                    <div className="pt-3" style={{ height: "10rem" }}>
                      <p>
                        {/* {job.description.length > 350
                          ? seeMore(job.description, 350)
                          : job.description} */}
                      </p>
                    </div>

                    <div className="d-flex" style={{ gap: ".5rem" }}>
                      {/* <Chip size="small" label={job?.skill?.name} /> */}

                      {/* <span>{job?.applications?.length} Proposals</span> */}
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
