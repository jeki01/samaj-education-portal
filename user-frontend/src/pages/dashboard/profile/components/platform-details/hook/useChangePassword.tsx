import type { ErrResp } from "@/config/axios-instance";
import { handleChangePass, type ChangePassData } from "@/services/profile.service";
import changePassSchema from "@/validation/change-pass.schema";
import { useFormik } from "formik"
import { toast } from "react-toastify";

export default function UseChangePassword(onClose: () => void) {
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: changePassSchema,
        onSubmit: handleChangePasswordSubmit
    })

    async function handleChangePasswordSubmit(val: ChangePassData) {
        try {
            await handleChangePass(val);
            toast.success("password changed sucessfully!");
            onClose()
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }
    return {
        formik
    }
}
