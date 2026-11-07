import axiosInstance from "@/config/axios-instance"
import type { initalOTPvalValues, loginInitialValues } from "@/pages/login/login.types";


export const adminLogin = (user: loginInitialValues) => {
    return axiosInstance.post("/auth/login", user);
}

export const otpVerification = (userOTP: initalOTPvalValues) => {
    return axiosInstance.post("/auth/verify-otp", userOTP);
}

export const checkAuthUser = () => {
    return axiosInstance.get("/auth/verify-token")
}