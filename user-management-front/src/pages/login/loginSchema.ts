import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("The email is required")
    .email("Invalid email format"),
  password: yup.string().required("The password is required"),
})
