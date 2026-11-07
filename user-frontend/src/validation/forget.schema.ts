import { object, string } from "yup";

export const forgetSchema = object({
    email: string().required("email is required").email("must be a valid email"),
})