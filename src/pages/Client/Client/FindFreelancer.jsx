import { useQuery } from "@apollo/client";
import { Box, Button, Chip, CircularProgress } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CustomCard from "../../../components/CustomCard";
import { FRELELANCERS } from "../../../graphql/admin";
import RightSideView from "../Freelancer/RightSideView";

export default function FindFreelancer() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { data, loading } = useQuery(FRELELANCERS);

  return (
    <div className="p-2" style={{ height: "100%" }}>
      <div className="container" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div
            className="col-lg-8"
            style={{ height: "100%", overflow: "auto" }}
          >
            {!loading ? (
              data?.dashboardStats?.freelancers?.map((user) => (
                <Box
                  sx={{
                    maxHeight: "15rem",
                    cursor: "pointer",
                    mb: "5rem",
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
                          src={user?.avatar}
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
                              {user?.fullname}
                            </span>
                            <span>{user?.address} </span>
                          </div>
                        </div>
                      </div>
                    }
                    // subTitle={"Posted 2 hours ago"}
                  >
                    <div className="d-flex mt-2" style={{ gap: ".5rem" }}>
                      {user?.skills?.map((s) => (
                        <Chip size="small" label={s?.name} />
                      ))}
                    </div>

                    <div className="pt-3" style={{ height: "6rem" }}>
                      <p>{user?.bio}</p>
                    </div>
                    <div
                      className="d-flex"
                      style={{
                        gap: "1rem",
                        fontSize: ".8rem",
                        color: "#899bbd",
                      }}
                    >
                      {/* <Button>Invite</Button> */}
                      <Button
                        onClick={() =>
                          navigate(
                            "/profile/" +
                              1321 +
                              ("/" + user?.fullname)
                                .toLowerCase()
                                .replaceAll(" ", "_"),
                            { state: { user: user } }
                          )
                        }
                      >
                        View More
                      </Button>
                    </div>
                  </CustomCard>
                </Box>
              ))
            ) : (
              <CircularProgress />
            )}
          </div>
          <div className="col-lg-4">
            <RightSideView />
          </div>
        </div>
      </div>
    </div>
  );
}
