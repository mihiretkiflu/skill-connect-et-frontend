import { Launch } from "@mui/icons-material";
import { Box, Button, Chip, Divider, IconButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import CustomCard from "../../../components/CustomCard";

export default function ViewFreelancerProfile() {
  const { t } = useTranslation();

  const { state } = useLocation();

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
                title={
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ gap: "1rem" }}
                  >
                    <img
                      style={{
                        height: "4rem",
                        width: "4rem",
                        borderRadius: "50%",
                        border: "2px solid lightgray",
                      }}
                      src={state?.user?.avatar}
                      alt="profile-"
                    />

                    <div
                      className="d-flex flex-column align-item-center"
                      style={{ flex: 1, gap: "4px" }}
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "20px" }}
                      >
                        <span style={{ color: "black", fontSize: "1rem" }}>
                          {state?.user?.fullname}
                        </span>
                        <span>{state?.user?.address} </span>
                      </div>

                      <span
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        {/* Full Stack Developer | React | Express | Next | Angular
                        | Vue | Nest | */}
                      </span>
                    </div>
                  </div>
                }
                // subTitle={"Posted 2 hours ago"}
              >
                <div
                  className="d-flex"
                  style={{ gap: "1rem", fontSize: ".8rem", color: "#899bbd" }}
                >
                  {/* <span>150 ETB / Hour</span> -
                  <span>100% Job Success Rate</span> -
                  <span>10,000+ ETB earned</span> */}
                </div>
                <div className="pt-3">{state?.user?.bio}</div>
                <b className="mt-3">Work History</b> <Divider />
                <br />
                {/* <div className="d-flex mt-2 flex-wrap" style={{ gap: ".5rem" }}>
                  <span>Work History</span>
                  <br />
                  <span>{state?.user?.jobs?.map((job) => job.name)}</span>
                </div> */}
                <br />
                <b className="mt-3">
                  Portfolio
                  <IconButton
                    onClick={() => {
                      window.open(
                        state?.user?.portfolio_dir,
                        "_blank",
                        "rel=noopener noreferrer"
                      );
                    }}
                  >
                    <Launch />{" "}
                  </IconButton>{" "}
                </b>{" "}
                <Divider />
                <br />
                {/* <div className="d-flex mt-2 flex-wrap" style={{ gap: ".5rem" }}>
                  <span>Work History 1</span>
                  <br />
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, in.
                  </span>
                </div> */}
                <b className="mt-3">Skills</b> <Divider />
                <div className="d-flex mt-2 flex-wrap" style={{ gap: ".5rem" }}>
                  {state?.user?.skills?.map((s) => (
                    <Chip size="small" label={s?.name} />
                  ))}
                </div>
                <div className="d-flex mt-3 justify-content-between">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {}}
                  >
                    Invite
                  </Button>
                </div>
              </CustomCard>
            </Box>
          </div>
          <div className="col-lg-4">
            <CustomCard title={"Earnings"}></CustomCard>
            {/* <CustomCard title={"Languages"}></CustomCard>
            <CustomCard title={"Education"}></CustomCard>
            <CustomCard title={"Linked Accounts"}></CustomCard> */}
          </div>
        </div>
      </div>
    </div>
  );
}
