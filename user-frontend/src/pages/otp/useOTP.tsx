import type { ErrResp } from "@/config/axios-instance";
import { handleResendOtp, handleVerificationStatus, handleVerifyOtpEmail } from "@/services/user-auth.service";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export default function UseOTP() {
    const [MobileNo, setMobileNo] = useState("");
    const [EmailId, setEmailId] = useState("");
    const [UserOTP, setUserOTP] = useState("");

    const [searchParams] = useSearchParams();
    const mobile = searchParams.get('mobile');
    const email = searchParams.get('email');

    const navigate = useNavigate();

    // get details
    async function getUserDetails() {
        const id = mobile || email;
        try {
            if (id) {
                const resp = await handleVerificationStatus(id);
                setMobileNo(resp?.data?.mobileNo)
                setEmailId(resp?.data?.email)
            }

        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [])


    // handleVerifyOtp
    async function VerifyOTP() {
        try {
            // if (mobile) {
            //     await handleVerifyOtp({
            //         email: MobileNo,
            //         otp: UserOTP
            //     });

            //     const referId = searchParams.get("referId");
            //     const courseId = searchParams.get("courseId");
            //     if (referId && courseId) {
            //         navigate(`/signup/${mobile}?referId=${referId}&courseId=${courseId}`);
            //     } else {
            //         navigate(`/signup/${mobile}`);
            //     }
            // }
            if (email) {
                await handleVerifyOtpEmail({
                    email: EmailId,
                    otp: UserOTP
                });
                const referId = searchParams.get("referId");
                const courseId = searchParams.get("courseId");
                const testId = searchParams.get("testId");
                const skillRef = searchParams.get("skillRef");
                const id = (courseId || testId);
                if (referId && id) {
                    navigate(`/signup/${email}?referId=${referId}&${courseId ? "courseId" : "testId"}=${id.split(" ").at(0)}`);
                } else if (skillRef) {
                    navigate(`/signup/${email}?skillRef=${skillRef}`);
                } else {
                    navigate(`/signup/${email}`);
                }
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }

    // resend otp
    async function resendOTP() {
        try {
            if (mobile) {
                const resp = await handleResendOtp({
                    type: "mobile",
                    userId: mobile
                });
                toast.success(resp?.data?.message);
            }
            if (email) {
                const resp = await handleResendOtp({
                    type: "email",
                    userId: email
                });
                toast.success(resp?.data?.message);
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)

        }
    }

    return {
        MobileNo,
        VerifyOTP,
        setUserOTP,
        UserOTP,
        EmailId,
        email,
        resendOTP
    }
}
