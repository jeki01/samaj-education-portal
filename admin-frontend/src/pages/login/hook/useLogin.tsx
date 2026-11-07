import loginSchema, { otpSchema } from "@/validations/login.schema";
import { useFormik } from "formik";
import type { initalOTPvalValues, loginInitialValues } from "../login.types";
import { useNavigate } from "react-router";
import { adminLogin, otpVerification } from "@/services/admin.service";
import type { ErrResp } from "@/config/axios-instance";
import { useState } from "react";
import Cookies from "js-cookie";

const initialValues: loginInitialValues = {
    email: "",
    password: ""
}

const initalOTPval: initalOTPvalValues = {
    otp: '',
    email: ""
}

const initalStatus = { success: null, message: null }

export default function useLogin() {
    const navigate = useNavigate();
    const [apiStatus, setApiStatus] = useState<{ success: boolean | null, message: string | null }>(initalStatus);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: handleLogin,
    });
    const otp = useFormik({
        initialValues: initalOTPval,
        validationSchema: otpSchema,
        onSubmit: otpVerify,
    });

    // Admin Login API
    async function handleLogin(values: loginInitialValues) {
        setIsLoading(true)
        const user = {
            email: values.email,
            password: values.password
        }
        try {
            const resp = await adminLogin(user);
            sessionStorage.setItem("uid-ba", values.email)
            setIsLoading(false)
            setApiStatus({ ...resp.data, success: true })
            setTimeout(() => {
                navigate("/otp")
            }, 2000);
        } catch (error) {
            setIsLoading(false)
            const { response } = error as ErrResp;
            console.log("err", response.data);
            setApiStatus(response.data)
            setTimeout(() => {
                setApiStatus(initalStatus)
            }, 10000);
        }
    }

    // OTP verify API
    async function otpVerify(values: initalOTPvalValues) {
        setIsLoading(true)
        try {
            const userOtp = {
                email: sessionStorage.getItem("uid-ba") as string,
                otp: values.otp.toString()
            }
            const resp = await otpVerification(userOtp);
            const accesstoken = resp.data?.token as string;
            Cookies.set("bauid", accesstoken)
            sessionStorage.removeItem("uid-ba");
            setIsLoading(false)
            setApiStatus({ ...resp.data, success: true })
            setTimeout(() => {
                window.location.href = "/course"
            }, 2000);
        } catch (error) {
            setIsLoading(false)
            const { response } = error as ErrResp;
            console.log("otp err", response.data);
            setApiStatus(response.data)
            setTimeout(() => {
                setApiStatus(initalStatus)
            }, 10000);
        }
    }

    return { login, otp, IsOtpSent: false, apiStatus, isLoading }
}
