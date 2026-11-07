import type { ErrResp } from "@/config/axios-instance";
import { handleLogin, handleGetUserAccountMode, type handleLoginData } from "@/services/user-auth.service";
import { loginSchema } from "@/validation/login.schema";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

export default function UseLogin() {
    const [isShowPass, setIsShowPass] = useState(false)
    const [searchParams] = useSearchParams();
    const [signUpLink, setSignUpLink] = useState("");

    const formik = useFormik({
        initialValues: {
            type: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: handleLoginUser
    });

    useEffect(() => {
        const referId = searchParams.get("referId");
        const courseId = searchParams.get("courseId");
        const testId = searchParams.get("testId");
        const skillRef = searchParams.get("skillRef");
        const id = (courseId || testId);
        if (referId && id) {
            const cleanUrl = sanitizedParamURL(referId, id, courseId ? "course" : "test");
            window.history.replaceState({}, "", cleanUrl);
            setSignUpLink(`/?referId=${referId.split(" ").at(0)}&${courseId ? "courseId" : "testId"}=${id.split(" ").at(0)}`);
        }
        else if (skillRef) {
            // const cleanUrl = `${window.location.origin}${window.location.pathname}?skillRef=${skillRef}`;
            // window.history.replaceState({}, "", cleanUrl);
            setSignUpLink(`/?skillRef=${skillRef}`);
        }
        else {
            setSignUpLink(`/`);
        }
    }, [searchParams]);

    async function handleLoginUser(val: handleLoginData) {
        const referId = searchParams.get("referId");
        const courseId = searchParams.get("courseId");
        const testId = searchParams.get("testId");
        const skillRef = searchParams.get("skillRef");

        const id = (courseId || testId);
        try {
            if (referId && id) {
                const resp = await handleLogin({
                    ...val,
                    userreferId: referId.split(" ").at(0),
                    [courseId ? "coursereferId" : "testreferId"]: id.split(" ").at(0)
                });
                const accessToken = resp.data?.token as string;
                Cookies.set("buuid", accessToken);
                window.location.href = `/${courseId ? "home" : "competitions"}?referId=${referId.split(" ").at(0)}&${courseId ? "courseId" : "testId"}=${id.split(" ").at(0)}`;
            } else if (skillRef) {
                const resp = await handleLogin({
                    ...val,
                    Userskillreferid: skillRef
                });
                const accessToken = resp.data?.token as string;
                Cookies.set("buuid", accessToken);
                window.location.href = "/overview";
            } else {
                const resp = await handleLogin(val);
                const accessToken = resp.data?.token as string;
                Cookies.set("buuid", accessToken);
                const modeResp = await handleGetUserAccountMode();
                const mode = modeResp?.data?.data?.AccountMode;
                window.location.href = mode === "exam" ? "/home" : "/overview";
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }

    // toggle password field
    function togglePasswordVisibility() {
        setIsShowPass((a) => !a)
    }
    return {
        formik,
        togglePasswordVisibility,
        isShowPass,
        signUpLink
    }
}

function sanitizedParamURL(referId: string, courseId: string, type: "course" | "test") {
    const cleanUrl = `${window.location.origin}${window.location.pathname}?referId=${referId.split(" ").at(0)}&${type === "course" ? "courseId" : "testId"}=${courseId.split(" ").at(0)}`;
    return cleanUrl;
}
