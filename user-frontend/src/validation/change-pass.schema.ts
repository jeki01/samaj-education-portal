import { object, string, ref } from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?~`])[A-Za-z\d!@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?~`]{8,}$/;

export default object({
    password: string().matches(passwordRegex, "must be 8 letter including uppercase, lowercase, number and special character")
        .required("this field is required"),
    confirmPassword: string().oneOf([ref('password')], "Password must match").required("confirm password is required")
})