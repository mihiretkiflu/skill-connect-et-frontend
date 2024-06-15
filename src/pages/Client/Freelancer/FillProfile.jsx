import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomCard from "../../../components/CustomCard";
import {
  CustomAutoComplete,
  CustomTextField,
} from "../../../components/CustomTextField";
import { POST_PROJECT_LOOKUPS } from "../../../graphql/job";
import { FILL_FREELANCER_PROFILE } from "../../../graphql/user";
import { fillFProfile } from "../../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function CreateProfile() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const lookups = useQuery(POST_PROJECT_LOOKUPS);

  const [fillProfile, { loading }] = useMutation(FILL_FREELANCER_PROFILE);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {
      fullname: currentUser.firstname + " " + currentUser.lastname,
      phone: currentUser?.phone,
      gender: currentUser?.gender,
      bio: currentUser?.bio,
      avatar: currentUser?.avatar,
      address: currentUser?.address,
      portfolio_dir: currentUser?.portfolio_dir,
      // skills: Yup.array().of(Yup.number().required()).required(),
    },
  });

  const onSubmit = async (values) => {
    console.log({ values });

    delete values.fullname;
    try {
      const { data } = await fillProfile({
        variables: { input: { ...values, id: currentUser.id } },
      });

      dispatch(fillFProfile({ ...currentUser, ...values }));

      // refetch();
      // props.onHide();
      // reset();
      toast.success(t("Profile Successfully Created!"), { autoClose: 500 });
    } catch (error) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  return (
    <div className="p-2" style={{ height: "100%" }}>
      <div className="container" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-lg-8" style={{ height: "100%" }}>
            <Box
              sx={{
                maxHeight: "100%",
                overflow: "auto",
              }}
            >
              <CustomCard title={"Create Your Profile"}>
                <div className=" mt-2">
                  <Divider />
                </div>

                <div className="mt-4">
                  <form
                    action="d-flex flex-direction-col"
                    style={{ gap: "5px" }}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"fullname"}
                      label={"Full Name"}
                      disabled
                    />{" "}
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"avatar"}
                      label={"Profile Picture Link"}
                      type={"url"}
                    />
                    <CustomAutoComplete
                      lf={4}
                      tf={8}
                      control={control}
                      name={"skills"}
                      label={"Select Your Skills"}
                      loading={lookups.loading}
                      options={lookups.data?.skills}
                      multiple
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"address"}
                      label={"Address"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"phone"}
                      label={"Phone"}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"gender"}
                      label={"Gender"}
                      options={["Male", "Female"]}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"portfolio_dir"}
                      label={"Portfolio Address Link"}
                      type={"url"}
                    />{" "}
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"bio"}
                      label={"Bio"}
                      rows={8}
                    />
                    <div className="d-flex mt-3 justify-content-end">
                      <Button
                        variant="contained"
                        startIcon={<CheckCircleOutlineOutlined />}
                        color="success"
                        type="submit"
                      >
                        {"Save"}
                      </Button>
                    </div>
                  </form>
                </div>
              </CustomCard>
            </Box>
          </div>
          <div className="col-lg-4">
            <CustomCard title={"Upload Your Profile Picture"}>
              <Box
                sx={{
                  height: "12rem",
                  width: "auto",
                  border: 2,
                  borderStyle: "dashed",
                  borderColor: "gray",
                  borderRadius: ".5rem",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {watch("avatar") && (
                  <img
                    style={{ height: "100%", width: "auto" }}
                    src={watch("avatar")}
                    alt="Profile"
                  />
                )}
              </Box>
            </CustomCard>
          </div>
        </div>
      </div>
    </div>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    phone: Yup.string().required(),
    gender: Yup.string().required(),
    bio: Yup.string().required(),
    avatar: Yup.string().required(),
    address: Yup.string().required(),
    portfolio_dir: Yup.string().required(),
    skills: Yup.array().of(Yup.number().required()).required(),
  })
);
