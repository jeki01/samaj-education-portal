import { object, string } from "yup";

export default object({
    email: string().email().required(),
    password: string().required()
})

export const otpSchema = object({
    otp: string().required(),
    email: string().email()
})