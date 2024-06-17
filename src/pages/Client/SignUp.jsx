import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CustomTextField } from "../../components/CustomTextField";
import { CREATE_USER } from "../../graphql/user";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [createUser, { loading }] = useMutation(CREATE_USER);

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
    delete values.confirm_password;

    try {
      await createUser({ variables: { input: values } });

      navigate("/login");

      toast.success(t("User Successfully Added!"), { autoClose: 500 });
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
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="pt-0 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      {t("Create an Account")}
                    </h5>
                    <p className="text-center small">
                      {t("Enter your personal details to create account")}
                    </p>
                  </div>

                  <form
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <CustomTextField
                      size={"small"}
                      control={control}
                      name={"firstname"}
                      label={"First Name"}
                    />
                    <CustomTextField
                      size={"small"}
                      control={control}
                      name={"lastname"}
                      label={"Last Name"}
                    />
                    <CustomTextField
                      size={"small"}
                      control={control}
                      name={"email"}
                      label={"Email"}
                    />
                    <CustomTextField
                      size={"small"}
                      control={control}
                      name={"username"}
                      label={"Username"}
                    />
                    <CustomTextField
                      size={"small"}
                      control={control}
                      name={"role"}
                      label={"Role"}
                      options={roles}
                    />
                    <CustomTextField
                      size={"small"}
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
                        {t(loading ? "Loading..." : "Create Account")}
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        {t("Already have an account?")}
                        <Link to={"/login"}>{t("Log in")}</Link>
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
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    username: Yup.string().required(),
    role: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("Required")
      .min(6)
      .matches(strongPasswordRegex, "Use strong passowrd"),
  })
);

export const roles = [
  {
    label: "Freelancer",
    value: "freelance",
  },
  {
    label: "Client",
    value: "employer",
  },
];
