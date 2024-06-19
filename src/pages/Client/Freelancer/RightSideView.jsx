import React, { useState } from "react";
import CustomCard from "../../../components/CustomCard";
import { useSelector } from "react-redux";
import { Box, Button, IconButton } from "@mui/material";
import { Launch, Watch } from "@mui/icons-material";
import { useMutation, useQuery } from "@apollo/client";
import { DEPOSIT_MONEY, GET_USER } from "../../../graphql/user";
import { numberFormat } from "../../../utils/misc";
import { CustomTextField } from "../../../components/CustomTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function RightSideView() {
  const { currentUser } = useSelector((state) => state.auth);
  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: { id: currentUser.id },
  });

  const [depositMoney, dmMut] = useMutation(DEPOSIT_MONEY);

  const [clicked, setClicked] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {},
  });

  const depositMny = async (values) => {
    const isValid = await trigger(["phone_number", "amount"]);

    if (isValid)
      try {
        const { data } = await depositMoney({
          variables: {
            input: {
              user_id: currentUser?.id,
              phone_number: watch("phone_number"),
              last_name: currentUser?.lastname,
              email: currentUser?.email,
              first_name: currentUser?.firstname,
              callBackUrl: "http://localhost:3000/payment-success/yes",
              amount: parseFloat(watch("amount")),
            },
          },
        });

        if (data?.depositMoney) {
          window.open(data?.depositMoney, "_blank", "rel=noopener noreferrer");
        }

        refetch();
        reset({});
        setClicked(false);
        // toast.success("Money Successfully Deposited!", { autoClose: 500 });
      } catch (error) {
        toast.error(error.message, {
          autoClose: 500,
        });
      }
  };

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
        </div>{" "}
        <div class="row">
          <div class="col-lg-3 col-md-6 label">Email</div>
          <div class="col-lg-9 col-md-6">{currentUser?.email}</div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 label">User Balance</div>
          <div class="col-lg-9 col-md-6">
            {loading ? "" : numberFormat(data?.user?.balance?.balance) + "ETB"}{" "}
          </div>
        </div>
        {currentUser?.role === "freelance" && (
          <>
            {" "}
            <div class="row">
              <div class="col-lg-3 col-md-6 label">Phone</div>
              <div class="col-lg-9 col-md-6">{currentUser?.phone}</div>
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
          </>
        )}
        {currentUser?.role === "employer" && (
          <div class="row">
            <Button onClick={() => setClicked(!clicked)}>Diposit Money</Button>

            {clicked && (
              <>
                <CustomTextField
                  control={control}
                  name={"phone_number"}
                  label={"Phone Number"}
                />
                <CustomTextField
                  control={control}
                  name={"amount"}
                  label={"Amount"}
                />

                <Button onClick={depositMny}>Save</Button>
              </>
            )}
          </div>
        )}
      </div>
    </CustomCard>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    phone_number: Yup.string().min(10).required(),
    amount: Yup.number().required("Required").min(1),
  })
);
