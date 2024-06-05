import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CustomTextField } from "../../components/CustomTextField";
import { CREATE_USER, LOGIN_USER } from "../../graphql/user";
import { loginFinished } from "../../redux/slices/authSlice";

export default function Login() {
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
      navigate("/find-work");
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
                      Login into an Account
                    </h5>
                    <p className="text-center small">
                      Enter your personal details to login account
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
                        {loading ? "Loading..." : "Login"}
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        Not sign up yet?
                        <Link to={"/sign-up"}>Sign in</Link>
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
    email: Yup.string().required(),
    password: Yup.string().required("Required"),
  })
);
