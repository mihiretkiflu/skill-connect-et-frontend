import { Box } from "@mui/material";
import React from "react";

export default function CustomCard({ title, subTitle, customStyle, children }) {
  return (
    <Box
      className="card"
      sx={{
        height: "100%",
        // background: "blue",
        "&:hover": {
          // backgroundColor: "smokewhite",
        },
        ...customStyle,
      }}
    >
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 style={{ flex: 1 }} className="card-title">
            {title} {subTitle && <span>{"| " + subTitle}</span>}
          </h5>

          <div className="col-">
            <a className="icon" href="#">
              <i className="bi bi-three-dots"></i>{" "}
            </a>
          </div>
        </div>
        <div className="">{children}</div>
      </div>
    </Box>
  );
}
