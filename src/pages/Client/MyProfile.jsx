import { useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { CustomTextField } from "../../components/CustomTextField";
import { GET_USER } from "../../graphql/user";
import { numberFormat } from "../../utils/misc";

export default function MyProfile() {
  const { currentUser } = useSelector((state) => state.auth);
  const { data, loading } = useQuery(GET_USER, {
    variables: { id: currentUser.id },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {},
  });

  return (
    <main id="home-main" class="home-main px-5">
      <div class="pagetitle">
        <h1>Profile</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li class="breadcrumb-item">Users</li>
            <li class="breadcrumb-item active">Profile</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section class="section profile">
        <div class="row">
          <div class="col-xl-4">
            <div class="card">
              <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <img
                  src={currentUser?.avatar}
                  alt="Profile"
                  class="rounded-circle"
                />
                <h2>{currentUser?.firstname + " " + currentUser.lastname}</h2>
                <h3>{currentUser?.role}</h3>
              </div>
            </div>
          </div>

          <div class="col-xl-8">
            <div class="card">
              <div class="card-body pt-3">
                {/* <!-- Bordered Tabs --> */}
                <ul class="nav nav-tabs nav-tabs-bordered">
                  <li class="nav-item">
                    <button
                      class="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Overview
                    </button>
                  </li>

                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
                <div class="tab-content pt-2">
                  <div
                    class="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 class="card-title">About</h5>
                    <p class="small fst-italic">
                      {currentUser?.role === "freelance" && currentUser?.bio}
                    </p>

                    <h5 class="card-title">Profile Details</h5>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Full Name</div>
                      <div class="col-lg-9 col-md-8">
                        {currentUser?.firstname + " " + currentUser.lastname}
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Phone</div>
                      <div class="col-lg-9 col-md-8">{currentUser?.phone}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Email</div>
                      <div class="col-lg-9 col-md-8">{currentUser?.email}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Address</div>
                      <div class="col-lg-9 col-md-8">
                        {currentUser?.address}
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Gender</div>
                      <div class="col-lg-9 col-md-8">{currentUser?.gender}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Portfolio</div>
                      <div class="col-lg-9 col-md-8">
                        {currentUser?.portfolio_dir}
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Skills</div>
                      <div class="col-lg-9 col-md-8">
                        {loading
                          ? ""
                          : data?.user?.skills?.map((s) => (
                              <Chip
                                size="small"
                                color="success"
                                label={s?.name}
                              />
                            ))}{" "}
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-6 label">User Balance</div>
                      <div class="col-lg-9 col-md-6">
                        {loading
                          ? ""
                          : numberFormat(data?.user?.balance?.balance) +
                            "ETB"}{" "}
                      </div>{" "}
                    </div>
                  </div>

                  <div class="tab-pane fade pt-3" id="profile-change-password">
                    {/* <!-- Change Password Form --> */}
                    <form>
                      <div class="row mb-3">
                        <CustomTextField
                          control={control}
                          name={"current_password"}
                          label={"Current Password"}
                          type={"password"}
                          InputProps={{
                            endAdornment: (
                              <IconButton>
                                <Visibility />
                              </IconButton>
                            ),
                          }}
                        />
                        <CustomTextField
                          control={control}
                          name={"new_password"}
                          label={"New Password"}
                          type={"password"}
                          InputProps={{
                            endAdornment: (
                              <IconButton>
                                <Visibility />
                              </IconButton>
                            ),
                          }}
                        />
                        <CustomTextField
                          control={control}
                          name={"confirm_new_password"}
                          label={"Confirm New Password"}
                          type={"password"}
                          InputProps={{
                            endAdornment: (
                              <IconButton>
                                <Visibility />
                              </IconButton>
                            ),
                          }}
                        />
                      </div>

                      <div class="text-center">
                        <button type="submit" class="btn btn-primary">
                          Change Password
                        </button>
                      </div>
                    </form>
                    {/* <!-- End Change Password Form --> */}
                  </div>
                </div>
                {/* <!-- End Bordered Tabs --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const validator = yupResolver(
  Yup.object().shape({
    email: Yup.string().email().required(),
    // password: Yup.string()
    //   .required("Required")
    //   .min(6)
    //   .matches(strongPasswordRegex, "Use strong passowrd"),
  })
);
