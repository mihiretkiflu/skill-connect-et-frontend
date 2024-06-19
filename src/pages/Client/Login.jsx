import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CustomTextField } from "../../components/CustomTextField";
import { LOGIN_USER, REQUEST_RESET_PWD, RESET_PWD } from "../../graphql/user";
import { loginFinished } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";
import { Alert } from "@mui/material";

export default function Login() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [newPWD, setNewPwd] = useState(false);
  const [resetToken, setResetToken] = useState(null);

  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [requestResetPWd, adf] = useMutation(REQUEST_RESET_PWD);
  const [resetPassword, aff] = useMutation(RESET_PWD);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {},
  });

  const onSubmit = async (values) => {
    const isValid = await trigger(["email", "password"]);

    if (isValid)
      try {
        const { data } = await loginUser({
          variables: {
            input: {
              email: watch("email"),
              password: watch("password"),
            },
          },
        });

        dispatch(loginFinished(data?.loginUser));

        if (data?.loginUser?.user?.role === "admin") {
          navigate("/admin");
        } else if (data?.loginUser?.user?.role === "freelance") {
          navigate("/find-work");
        } else {
          navigate("/my-jobs");
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 500,
        });
      }
  };

  const resetPwd = async (values) => {
    const isValid = await trigger(["email"]);
    if (isValid)
      try {
        const { data } = await requestResetPWd({
          variables: { email: watch("email") },
        });

        console.log(data);

        setNewPwd(true);
        //  dispatch(loginFinished(data?.loginUser));

        //   if (data?.loginUser?.user?.role === "admin") {
        //     navigate("/admin");
        //   } else if (data?.loginUser?.user?.role === "freelance") {
        //     navigate("/find-work");
        //   } else {
        //     navigate("/my-jobs");
        //   }
        toast.success("Reset Email Sent !");
      } catch (error) {
        toast.error(error.message, {
          autoClose: 500,
        });
      }
  };

  const resetNewPDS = async (values) => {
    const isValid = await trigger(["email", "resetToken", "newPassword"]);
    if (isValid)
      try {
        const { data } = await resetPassword({
          variables: {
            email: watch("email"),
            resetToken: watch("resetToken"),
            newPassword: watch("newPassword"),
          },
        });

        console.log(data);
        reset();
        setNewPwd(false);

        // setNewPwd(true);
        //  dispatch(loginFinished(data?.loginUser));

        //   if (data?.loginUser?.user?.role === "admin") {
        //     navigate("/admin");
        //   } else if (data?.loginUser?.user?.role === "freelance") {
        //     navigate("/find-work");
        //   } else {
        //     navigate("/my-jobs");
        //   }
        toast.success("Password Successfully Changed !");
        navigate("/login");
      } catch (error) {
        toast.error(error.message, {
          autoClose: 500,
        });
      }
  };

  return (
    <div className="container">
      <section className="section register d-flex flex-column align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="pt-0 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      {t("Login into an Account")}
                    </h5>
                    <p className="text-center small">
                      {t("Enter your personal details to login account")}
                    </p>
                  </div>

                  {state?.unverified && (
                    <Alert variant="filled" color="error">
                      You have to verify your email
                    </Alert>
                  )}
                  <br />
                  <form
                    className="row g-3 needs-validation"
                    // onSubmit={handleSubmit(onSubmit)}
                  >
                    <CustomTextField
                      control={control}
                      name={"email"}
                      label={"Email"}
                    />

                    {newPWD ? (
                      <>
                        <CustomTextField
                          control={control}
                          name={"resetToken"}
                          label={"Code Sent"}
                        />
                        <CustomTextField
                          control={control}
                          name={"newPassword"}
                          label={"New Password"}
                          type={"password"}
                        />
                      </>
                    ) : (
                      <CustomTextField
                        control={control}
                        name={"password"}
                        label={"Password"}
                        type={"password"}
                      />
                    )}
                    <div className="col-12">
                      {newPWD ? (
                        <button
                          className="btn btn-success w-100"
                          type={loading ? "button" : "button"}
                          onClick={resetNewPDS}
                        >
                          {t(loading ? "Loading..." : "Save New Password")}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary w-100"
                          type={loading ? "button" : "button"}
                          onClick={onSubmit}
                        >
                          {t(loading ? "Loading..." : "Login")}
                        </button>
                      )}{" "}
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        {t("Not sign up yet?")}
                        <Link to={"/sign-up"}>{t("Sign in")}</Link> <br />
                        <a href={"#"} onClick={resetPwd}>
                          {t("Reset Password")}
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const emailValidator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validator = yupResolver(
  Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .matches(emailValidator, "Invalid email format")
      .required("Email is required"),
    resetToken: Yup.string().min(6).max(6).required(" is required"),
    password: Yup.string()
      .required("Required")
      .min(6)
      .matches(strongPasswordRegex, "Use strong passowrd"),
    newPassword: Yup.string()
      .required("Required")
      .min(6)
      .matches(strongPasswordRegex, "Use strong passowrd"),
  })
);
