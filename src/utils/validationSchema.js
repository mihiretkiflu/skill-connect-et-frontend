import * as Yup from "yup";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const userSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  username: Yup.string().required("Required").min(6).max(12),
  email: Yup.string().email("Invalid email format").required("Required"),
  phone: Yup.string().required("Required").min(10),
  // password: Yup.string()
  //   .required("Required")
  //   .matches(strongPasswordRegex, "Use strong passowrd"),
  // role: Yup.string().required("Required"),
  // confirmPassword: Yup.string()
  //   .required("Required")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Use strong passowrd"

  //     // "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //   )
  //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const loginSchema = Yup.object({
  // companyName: Yup.string().required("Company Name Required").min(6),
  username: Yup.string().required("Username Required").min(6).max(20),
  password: Yup.string().required("Password Required").min(6),
});

export const createPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Required")
    .matches(strongPasswordRegex, "Use strong passowrd"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const loginOneSchema = Yup.object({
  username: Yup.string().required("Required").min(6).max(12),
});

export const loginTwoSchema = Yup.object({
  password: Yup.string().required("Required").min(8),
});

export const roleSchema = Yup.object({
  // product: Yup.string().required("Product must be selected"),
  key: Yup.string().required("Key is Required").min(2).max(8),
  label: Yup.string().required("Label/Name of the role is Required").min(8),
});
export const attachRoleSchema = Yup.object({
  // product: Yup.string().required("Product must be selected"),
  roleId: Yup.string().required("Role is Required"),
});

export const userAccountValidationSchema = Yup.object({
  // productId: Yup.string().required("Product must be selected"),
  // roleId: Yup.string().required("Roles is Required"),
  firstname: Yup.string().required("Firstname is Required"),
  lastname: Yup.string().required("Lastname is Required"),
  // username: Yup.string().required("Username is Required").min(6).max(12),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
  phone: Yup.string().required("Phone number is Required").min(10),
  // password: Yup.string()
  //   .required("Passdword is Required")
  //   .matches(strongPasswordRegex, "Use strong passowrd"),
  // confirmPassword: Yup.string()
  //   .required("Confirm password is Required")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Use strong passowrd"

  //     // "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //   )
  //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const NewUserAccountValidationSchema = Yup.object({
  userId: Yup.string().required("User must be selected"),
  // productId: Yup.string().required("Product must be selected"),
  roleId: Yup.string().required("Roles is Required"),
  // firstname: Yup.string().required("Firstname is Required"),
  // lastname: Yup.string().required("Lastname is Required"),
  // username: Yup.string().required("Username is Required").min(6).max(12),
  // email: Yup.string()
  //   .email("Invalid email format")
  //   .required("Email is Required"),
  // phone: Yup.string().required("Phone number is Required").min(10),
  // password: Yup.string()
  //   .required("Passdword is Required")
  //   .matches(strongPasswordRegex, "Use strong passowrd"),
  // confirmPassword: Yup.string()
  //   .required("Confirm password is Required")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Use strong passowrd"

  //     // "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //   )
  //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required("Current Passdword is Required"),
  newPassword: Yup.string()
    .required("New Password is Required")
    .matches(strongPasswordRegex, "Use strong passowrd"),
  confirmNewPassword: Yup.string()
    .required("Confirm new password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Use strong passowrd"
    )
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export const newPlanSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number("Enter a valid price").required("Price is required"),
  duration_days: Yup.number("Duration must be a valid number").required(
    "Duration is required"
  ),
});
