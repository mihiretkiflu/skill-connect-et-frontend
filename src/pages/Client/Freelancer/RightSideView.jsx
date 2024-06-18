import React from "react";
import CustomCard from "../../../components/CustomCard";
import { useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import { Launch } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/user";
import { numberFormat } from "../../../utils/misc";

export default function RightSideView() {
  const { currentUser } = useSelector((state) => state.auth);
  const { data, loading } = useQuery(GET_USER, {
    variables: { id: currentUser.id },
  });

  return (
    <CustomCard title={"Your Profile"}>
      {" "}
      <Box
        sx={{
          height: "12rem",
          width: "auto",

          borderRadius: ".5rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {currentUser?.avatar && (
          <img
            style={{ height: "100%", width: "auto" }}
            src={currentUser?.avatar}
            alt="Profile"
          />
        )}
      </Box>
      <div class="container" id="profile-overview">
        <h5 class="card-title">About</h5>
        <p class="small fst-italic">
          {currentUser?.role === "freelance" && currentUser?.bio}
        </p>

        <h5 class="card-title">Profile Details</h5>

        <div class="row">
          <div class="col-lg-3 col-md-6 label">Full Name</div>
          <div class="col-lg-9 col-md-6">
            {currentUser?.firstname + " " + currentUser.lastname}
          </div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-6 label">Phone</div>
          <div class="col-lg-9 col-md-6">{currentUser?.phone}</div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-6 label">Email</div>
          <div class="col-lg-9 col-md-6">{currentUser?.email}</div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-6 label">Address</div>
          <div class="col-lg-9 col-md-6">{currentUser?.address}</div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-6 label">Gender</div>
          <div class="col-lg-9 col-md-6">{currentUser?.gender}</div>
        </div>

        <div class="row">
          <div class="col-lg-3 col-md-6 label">Portfolio</div>
          <div class="col-lg-9 col-md-6">
            {/* {currentUser?.portfolio_dir}{" "} */}
            <IconButton
              onClick={() => {
                window.open(
                  currentUser?.portfolio_dir,
                  "_blank",
                  "rel=noopener noreferrer"
                );
              }}
            >
              <Launch />{" "}
            </IconButton>{" "}
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 label">User Balance</div>
          <div class="col-lg-9 col-md-6">
            {loading ? "" : numberFormat(data?.user?.balance?.balance) + "ETB"}{" "}
          </div>
        </div>
      </div>
    </CustomCard>
  );
}
