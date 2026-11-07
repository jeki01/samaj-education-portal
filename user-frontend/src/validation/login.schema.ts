import { object, string } from "yup";

export const loginSchema = object({
    type: string().required("phone / email is required field"),
    password: string().required(),
})