import type { ErrResp } from "@/config/axios-instance";
import { handleForgotOTPLogin, handleResendOtp, handleVerificationStatus } from "@/services/user-auth.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function UseForgetOTPPassword() {
    const [UserOTP, setUserOTP] = useState("");
    const [Email, setEmail] = useState("");
    const slug = useParams();

    // get details
    async function getUserDetails() {
        const id = slug?.id;
        try {
            if (id) {
                const resp = await handleVerificationStatus(id);
                setEmail(resp?.data?.email)
            }

        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [])


    async function resendOTP() {
        try {
            if (Email && slug?.id) {
                const resp = await handleResendOtp({
                    type: "email",
                    userId: slug?.id // need to check with BE
                });
                toast.success(resp?.data?.message);
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)

        }
    }

    async function VerifyOTP() {
        try {
            const resp = await handleForgotOTPLogin({
                email: Email,
                otp: UserOTP
            });
            const accesstoken = resp.data?.token as string;
            Cookies.set("buuid", accesstoken)
            window.location.href = "/home"
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }

    return {
        UserOTP,
        setUserOTP,
        resendOTP,
        VerifyOTP,
        Email
    }
}
