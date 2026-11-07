import type { ErrResp } from "@/config/axios-instance";
import { handleForgetPassword, type handleLoginData } from "@/services/user-auth.service";
import { forgetSchema } from "@/validation/forget.schema";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function UseForgetPassword() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: forgetSchema,
        onSubmit: handleForget
    });

    async function handleForget(val: handleLoginData) {
        try {
            const resp = await handleForgetPassword(val);
            navigate("/forget-password/" + resp?.data?.userId)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }
    return {
        formik
    }
}
