import { object, string, ref } from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?~`])[A-Za-z\d!@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?~`]{8,}$/;

export const signupSchema = object({
    email: string().required("Email is required").email("Invalid email format"),
    password: string().matches(passwordRegex, "must be 8 letters including uppercase, lowercase, number and special character")
        .required(),
    confirmPassword: string().oneOf([ref('password')], "Password must match").required("confirm password is required")
})


export const completeProSchema = object({
    country: string(),
    state: string(),
    city: string(),
    firstName: string().required("First name is required"),
    middleName: string(),
    lastName: string().required("Last name is required"),
    pincode: string(),
    email: string()
})