import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomCard from "../../../components/CustomCard";
import {
  CustomAutoComplete,
  CustomTextField,
} from "../../../components/CustomTextField";
import { POST_PROJECT, POST_PROJECT_LOOKUPS } from "../../../graphql/job";
import { useTranslation } from "react-i18next";

export default function PostProject() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const lookups = useQuery(POST_PROJECT_LOOKUPS);

  const [createJob, { loading }] = useMutation(POST_PROJECT);

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
      await createJob({ variables: { input: values } });

      reset();
      toast.success(t("Your Project is Successfully Posted!"), {
        autoClose: 500,
      });
      navigate("/my-jobs");
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
              <CustomCard title={"Post a Project"}>
                <div className=" mt-2">
                  <Divider />{" "}
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
                      name={"name"}
                      label={"Headline"}
                    />
                    <CustomAutoComplete
                      lf={4}
                      tf={8}
                      control={control}
                      name={"skill_id"}
                      label={"Skill"}
                      loading={lookups.loading}
                      options={lookups.data?.skills}
                    />
                    <CustomTextField
                      lf={4}
                      tf={8}
                      control={control}
                      name={"description"}
                      label={"Description"}
                      rows={8}
                    />
                    <div className="d-flex mt-3 justify-content-end">
                      <Button
                        variant="contained"
                        startIcon={<CheckCircleOutlineOutlined />}
                        color="success"
                        type={loading ? "button" : "submit"}
                      >
                        {t(loading ? "Loading..." : "Post a Job")}
                      </Button>
                    </div>{" "}
                  </form>
                </div>
              </CustomCard>
            </Box>
          </div>
          <div className="col-lg-4">{/* <RightSideView /> */}</div>
        </div>
      </div>
    </div>
  );
}

const stringWithOutNumber = /^[A-Za-z]*$/;

const validator = yupResolver(
  Yup.object().shape({
    name: Yup.string()
      .matches(
        stringWithOutNumber,
        "The field should not contain numbers or special characters"
      )
      .required(),
    skill_id: Yup.number().required(),
    description: Yup.string().required(),
  })
);
