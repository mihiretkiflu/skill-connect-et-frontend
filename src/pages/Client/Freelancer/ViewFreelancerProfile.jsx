import { Box, Button, Chip, Divider } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import CustomCard from "../../../components/CustomCard";

export default function ViewFreelancerProfile() {
  const { t } = useTranslation();

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
              >
                <div
                  className="d-flex"
                  style={{ gap: "1rem", fontSize: ".8rem", color: "#899bbd" }}
                >
                  <span>150 ETB / Hour</span> -
                  <span>100% Job Success Rate</span> -
                  <span>10,000+ ETB earned</span>
                </div>
                <div className="pt-3">
                  Hi, I am a full-stack developer specializing in the MEAN and
                  MERN stacks. I have a BSc degree in Information Systems and
                  experience working as a software engineer. My skills include:
                  <br /> <br /> 🟢 Front-end: React | Next | Angular | Vue |
                  JavaScript | TypeScript | Redux | Tailwind | HTML5/CSS3 |
                  Electron | Three.js | Chart.js |<br /> <br /> 🟢 Back-end:
                  Node | Express | Nest | Laravel | PHP |<br /> <br /> 🟢
                  Database: MongoDB | MySQL | PostgreSQL | Mongoose | Prisma |
                  Eloquent
                  <br /> <br /> 🟢 Tools: Git, GitHub, GitLab, Jira, Docker
                  <br /> <br /> 🟢 Payment Integrations: Stripe | Google Pay |
                  PayTm | RazorPay
                  <br /> <br /> 🟢 OpenAI API Integration Contact me and lets
                  chat!
                </div>
                <b className="mt-3">Work History</b> <Divider />
                <div className="d-flex mt-2 flex-wrap" style={{ gap: ".5rem" }}>
                  <span>Work History 1</span>
                  <br />
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, in.
                  </span>
                </div>
                <b className="mt-3">Portfolio</b> <Divider />
                <div className="d-flex mt-2 flex-wrap" style={{ gap: ".5rem" }}>
                  <span>Work History 1</span>
                  <br />
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, in.
                  </span>
                </div>
                <b className="mt-3">Skills</b> <Divider />
                <div className="d-flex mt-2 flex-wrap" style={{ gap: ".5rem" }}>
                  <Chip size="small" label={"MongoDB"} />
                  <Chip size="small" label={"ExpressJS"} />
                  <Chip size="small" label={"React"} />
                  <Chip size="small" label={"Node.js"} />
                  <Chip size="small" label={"ExpressJS"} />
                  <Chip size="small" label={"React"} />
                  <Chip size="small" label={"Node.js"} />
                  <Chip size="small" label={"ExpressJS"} />
                  <Chip size="small" label={"React"} />
                  <Chip size="small" label={"Node.js"} />
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
            <CustomCard title={"Languages"}></CustomCard>
            <CustomCard title={"Education"}></CustomCard>
            <CustomCard title={"Linked Accounts"}></CustomCard>
          </div>
        </div>
      </div>
    </div>
  );
}
