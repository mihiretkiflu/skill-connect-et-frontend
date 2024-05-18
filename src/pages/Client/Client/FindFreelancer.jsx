import { Box, Chip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import CustomCard from "../../../components/CustomCard";
import RightSideView from "../Freelancer/RightSideView";

export default function FindFreelancer() {
  const navigate = useNavigate();

  return (
    <div className="p-2" style={{ height: "100%" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <Box
              sx={{
                maxHeight: "15rem",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  "/profile/" +
                    1321 +
                    "/Abrham Abate".toLowerCase().replaceAll(" ", "_")
                )
              }
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
                      src="https://www.upwork.com/profile-portraits/c1-8rrcPHdYNsQXZFukadv1WiBUnakvD1Hh9TY7B7-XpktzC_3LJfABuhtKdfqpJwn"
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
                          Abrham Abate{" "}
                        </span>
                        <span>Addis Ababa, Ethipia </span>
                      </div>

                      <span
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Full Stack Developer | React | Express | Next | Angular
                        | Vue | Nest |
                      </span>
                    </div>
                  </div>
                }
                // subTitle={"Posted 2 hours ago"}
                customStyle={{
                  "&:hover": {
                    background: "grey",
                  },
                }}
              >
                <div
                  className="d-flex"
                  style={{ gap: "1rem", fontSize: ".8rem", color: "#899bbd" }}
                >
                  <span>150 ETB / Hour</span> -
                  <span>100% Job Success Rate</span> -
                  <span>10,000+ ETB earned</span>
                </div>

                <div className="d-flex mt-2" style={{ gap: ".5rem" }}>
                  <Chip size="small" label={"MongoDB"} />
                  <Chip size="small" label={"ExpressJS"} />
                  <Chip size="small" label={"React"} />
                  <Chip size="small" label={"Node.js"} />
                </div>

                <div className="pt-3" style={{ height: "6rem" }}>
                  <p>
                    Hi, I am a full-stack developer specializing in the MEAN and
                    MERN stacks. I have a BSc degree in Information Systems and
                    experience working as a software engineer. My skills
                    include:
                  </p>
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
