import { Box } from "@mui/material";
import React from "react";

export default function CustomCard({ title, subTitle, customStyle, children }) {
  return (
    <Box
      class="card"
      sx={{
        height: "100%",
        background: "blue",
        "&:hover": {
          backgroundColor: "red",
        },
        ...customStyle,
      }}
    >
      <div class="card-body">
        <div className="d-flex align-items-center">
          <h5 style={{ flex: 1 }} class="card-title">
            {title} {subTitle && <span>{"| " + subTitle}</span>}
          </h5>

          <div className="col-">
            <a class="icon" href="#">
              <i class="bi bi-three-dots"></i>{" "}
            </a>
          </div>
        </div>
        <div class="">{children}</div>
      </div>
    </Box>
  );
}
