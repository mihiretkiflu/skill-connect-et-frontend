import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const new_accountant_schema = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Accountant group name is required."),
    accountant_id: Yup.number().integer().optional(),
    accountant_name: Yup.string().required("Accountant name is required."),
    senior_accountant_group_id: Yup.number()
      .integer()
      .required("Senior accountant group ID is required."),
  })
);

export default new_accountant_schema;
