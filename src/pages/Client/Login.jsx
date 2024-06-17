import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CustomTextField } from "../../components/CustomTextField";
import { LOGIN_USER } from "../../graphql/user";
import { loginFinished } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

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

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser({ variables: { input: values } });

      dispatch(loginFinished(data?.loginUser));

      if (data?.loginUser?.user?.role === "admin") navigate("/admin");
      else navigate("/find-work");
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

                  <form
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <CustomTextField
                      control={control}
                      name={"email"}
                      label={"Email"}
                    />

                    <CustomTextField
                      control={control}
                      name={"password"}
                      label={"Password"}
                      type={"password"}
                    />

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
                        type={loading ? "button" : "submit"}
                      >
                        {t(loading ? "Loading..." : "Login")}
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        {t("Not sign up yet?")}
                        <Link to={"/sign-up"}>{t("Sign in")}</Link>
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

const validator = yupResolver(
  Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("Required")
      .min(6)
      .matches(strongPasswordRegex, "Use strong passowrd"),
  })
);
