import { Box, Chip } from "@mui/material";
import React from "react";
import CustomCard from "../../../components/CustomCard";
import { useNavigate } from "react-router";
import RightSideView from "./RightSideView";

export default function FindWork() {
  const navigate = useNavigate();

  return (
    <div className="p-2" style={{ height: "100%" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <Box
              sx={{
                maxHeight: "20rem",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  "Experienced React developer for fixing few bugs"
                    .toLowerCase()
                    .replaceAll(" ", "_")
                )
              }
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
                <div
                  className="d-flex"
                  style={{ gap: "1rem", fontSize: ".8rem", color: "#899bbd" }}
                >
                  <span>Fixed Price</span> -<span>Intermediate</span> -
                  <span>Estimated Budget : 10000 ETB</span>
                </div>

                <div className="pt-3" style={{ height: "10rem" }}>
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
              </CustomCard>
            </Box>
          </div>
          <div className="col-lg-4">
            <RightSideView />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
