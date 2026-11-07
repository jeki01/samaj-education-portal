import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { handleRegister, handleVerificationStatus, type handleLoginData } from "@/services/user-auth.service";
import { signupSchema } from "@/validation/signup.schema";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";
// import Cookies from "js-cookie";

export default function UseSignUp() {
    const navigate = useNavigate();
    const slug = useParams();
    const [isValidMob, setisValidMob] = useState(false);
    const [isValidEmail, setisValidEmail] = useState(false);
    const [isSendingOTP, setIsSendingOTP] = useState(false);
    const sendingRef = useRef(false);

    // toggle password 
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
    const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    function togglePassword() { setIsPasswordShow(a => !a) };
    function toggleConfirmPassword() { setIsConfirmPasswordShow(a => !a) };

    const formik = useFormik({
        initialValues: {
            // mobileNo: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signupSchema,
        onSubmit: handleSignup
    })


    // get details
    async function getDetailsUser(id: string) {
        try {
            const resp = await handleVerificationStatus(id);
            setisValidMob(resp?.data?.isMobileVerified);
            setisValidEmail(resp?.data?.isEmailVerified)
            if (resp?.data?.mobileNo) formik.setFieldValue("mobileNo", resp?.data?.mobileNo);
            if (resp?.data?.email) formik.setFieldValue("email", resp?.data?.email);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        if (slug?.slug) {
            getDetailsUser(slug?.slug)
        }
    }, [slug?.slug])


    // signup
    async function handleSignup(val: handleLoginData) {
        try {
            const skillRef = searchParams.get("skillRef");
            if (skillRef) {
                await handleRegister({ id: slug?.slug, Userskillreferid: skillRef, ...val });
            } else {
                await handleRegister({ id: slug?.slug, ...val });
            }
            // const accesstoken = resp.data?.token as string;
            // Cookies.set("buuid", accesstoken)

            const referId = searchParams.get("referId");
            const courseId = searchParams.get("courseId");
            const testId = searchParams.get("testId");
            const id = (courseId || testId);
            if (referId && id) {
                navigate(`/complete-profile/${slug?.slug}?referId=${referId}&${courseId ? "courseId" : "testId"}=${id.split(" ").at(0)}`);
            } else {
                navigate("/complete-profile/" + slug?.slug)
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    };

    // handle Verify
    async function sendOTP(type: "mobile" | "email") {
        if (sendingRef.current) return;
        sendingRef.current = true;
        setIsSendingOTP(true);
        try {
            if (slug?.slug) {
                if (type === "email" && formik.values.email) {
                    await handleRegister({
                        email: formik.values.email,
                        id: slug?.slug
                    })

                    const referId = searchParams.get("referId");
                    const courseId = searchParams.get("courseId");
                    const testId = searchParams.get("testId");
                    const skillRef = searchParams.get("skillRef");

                    const id = (courseId || testId);

                    if (referId && id) {
                        navigate(`/otp?email=${slug?.slug}&referId=${referId}&${courseId ? "courseId" : "testId"}=${id.split(" ").at(0)}`);
                    } else if (skillRef) {
                        navigate(`/otp?email=${slug?.slug}&skillRef=${skillRef}`)
                    } else {
                        navigate(`/otp?email=${slug?.slug}`)
                    }
                }
                // if (type === "email" && formik.values.email) {
                //     await handleRegister({
                //         email: formik.values.email,
                //         id: slug?.slug
                //     })
                //     navigate(`/otp?email=${slug?.slug}`)
                // }
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        } finally {
            sendingRef.current = false;
            setIsSendingOTP(false);
        }
    }

    return {
        formik,
        sendOTP,
        isSendingOTP,
        isValidMob,
        isValidEmail,
        togglePassword,
        toggleConfirmPassword,
        isConfirmPasswordShow,
        isPasswordShow
    }
}
