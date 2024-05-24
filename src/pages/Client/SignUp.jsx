import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CustomTextField } from "../../components/CustomTextField";
import { CREATE_USER } from "../../graphql/user";

export default function SignUp() {
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

      toast.success("User Successfully Added!", { autoClose: 500 });
    } catch (error) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  return (
    <div class="container">
      <section class="section register d-flex flex-column align-items-center justify-content-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="card mb-0">
                <div class="card-body">
                  <div class="pt-0 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                    <p class="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>

                  <form
                    class="row g-3 needs-validation"
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
                      name={"role"}
                      label={"Role"}
                      options={["freelance", "employer"]}
                    />
                    <CustomTextField
                      size={"small"}
                      control={control}
                      name={"password"}
                      label={"Password"}
                      type={"password"}
                    />
                    {/* <CustomTextField
                      size={"small"}
                      control={control}
                      name={"confirm_password"}
                      label={"Confirm Password"}
                      type={"password"}
                    /> */}

                    <div class="col-12">
                      <button
                        class="btn btn-primary w-100"
                        type={loading ? "button" : "submit"}
                      >
                        {loading ? "Loading..." : "Create Account"}
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">
                        Already have an account?
                        <Link to={"/login"}>Log in</Link>
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

const validator = yupResolver(
  Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().required(),
    role: Yup.string().required(),
    password: Yup.string().required("Required"),
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
