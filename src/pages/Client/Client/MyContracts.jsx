import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, ButtonGroup, Chip, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CustomCard from "../../../components/CustomCard";
import {
  ACCEPT_REJECT_CONTRACT,
  GET_EMPLOYER_CONTRACTS,
} from "../../../graphql/contract";
import { seeMore } from "../../../utils/misc";
import RightSideView from "../Freelancer/RightSideView";

export default function MyContracts() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [contracts, setContracts] = useState([]);
  const [filter, setFilter] = useState("Pending Acceptance");

  const { data, loading, refetch } = useQuery(GET_EMPLOYER_CONTRACTS);
  const [acceptRejectContract, acceptRejectContractMut] = useMutation(
    ACCEPT_REJECT_CONTRACT
  );

  useEffect(() => {
    if (filter === "all") {
      setContracts(data?.employerContracts);
    } else {
      setContracts(
        data?.employerContracts?.filter((fc) => fc?.status === filter)
      );
    }
  }, [filter, data, loading]);

  const contractResponse = async (contract_id, accepted) => {
    try {
      await acceptRejectContract({
        variables: {
          input: {
            contract_id,
            accepted,
          },
        },
      });

      refetch();

      toast.success(
        t("Contract Successfully " + (accepted ? "accepted" : "rejected")) + "!"
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                  onClick={() => setFilter("Pending Acceptance")}
                  variant={
                    filter === "Pending Acceptance" ? "contained" : "outlined"
                  }
                >
                  {t("Pending Acceptance")}
                </Button>
                <Button
                  onClick={() => setFilter("Pending Payment")}
                  variant={
                    filter === "Pending Payment" ? "contained" : "outlined"
                  }
                >
                  {t("Pending Payment")}
                </Button>
                <Button
                  onClick={() => setFilter("accepted")}
                  variant={filter === "accepted" ? "contained" : "outlined"}
                >
                  {t("Accepted")}
                </Button>
                <Button
                  onClick={() => setFilter("Cancelled")}
                  variant={filter === "Cancelled" ? "contained" : "outlined"}
                >
                  {t("Cancelled")}
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div
            className="col-lg-8"
            style={{ height: "100%", overflow: "auto" }}
          >
            {!loading ? (
              contracts?.map((contract) => (
                <Box
                  sx={{
                    maxHeight: "20rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // navigate(
                    //   (contract?.id)
                    //     .toString()
                    //     .toLowerCase()
                    //     .replaceAll(" ", "_"),
                    //   {
                    //     state: { contract },
                    //   }
                    // );
                  }}
                >
                  <CustomCard
                    title={contract?.job?.name}
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
                        {contract?.job.description.length > 350
                          ? seeMore(contract?.job.description, 350)
                          : contract?.job.description}
                      </p>
                    </div>
                    {contract?.status === "Pending Payment" ? (
                      <div className="d-flex" style={{ gap: ".5rem" }}>
                        <Button
                          onClick={() => {
                            window.open(
                              contract?.payment?.checkout_url,
                              "_blank",
                              "rel=noopener noreferrer"
                            );
                          }}
                        >
                          {t("Pay to Put on Escrow")}
                        </Button>
                      </div>
                    ) : (
                      <Chip label={t(contract?.status)} color="info" />
                    )}

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
