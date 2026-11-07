import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { handleRegister } from "@/services/user-auth.service";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
export default function UseSelectField() {
    const [isNextSection, setIsNextSection] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectFieldFormik = useFormik<selectFieldType>({
        initialValues: {
            studentType: "student",
            examType: "exam"
        },
        onSubmit: handleSubmitFields
    })


    useEffect(() => {
        const referId = searchParams.get("referId");
        const courseId = searchParams.get("courseId");
        const testId = searchParams.get("testId");
        const id = (courseId || testId);
        if (referId && id) {
            const cleanUrl = sanitizedParamURL(referId, id, courseId ? "course" : "test");
            window.history.replaceState({}, "", cleanUrl);
        }
    }, [searchParams]);

    async function handleSubmitFields(val: selectFieldType) {
        const referId = searchParams.get("referId");
        const courseId = searchParams.get("courseId");
        const testId = searchParams.get("testId");
        const skillRef = searchParams.get("skillRef");

        const id = (courseId || testId);
        try {
            if (referId && id) {
                // const cleanUrl = sanitizedParamURL(referId);
                const resp = await handleRegister({
                    ...val,
                    userreferId: referId.split(" ").at(0),
                    [courseId ? "coursereferId" : "testreferId"]: id.split(" ").at(0)
                });
                navigate(`/signup/${resp?.data?.data?._id}?referId=${referId}&${courseId ? "courseId" : "testId"}=${id.split(" ").at(0)}`);
            } else {
                const resp = await handleRegister(val);
                // if (val?.examType === "skills") {
                //     navigate(`/pricing-plans/${resp?.data?.data?._id}`)
                // } else {
                // }
                if (skillRef) {
                    navigate(`/signup/${resp?.data?.data?._id}?skillRef=${skillRef}`)
                } else {
                    navigate(`/signup/${resp?.data?.data?._id}`)
                }
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err);
        }
    }

    // set field type Active handler Section 1st
    function fieldTypeActiveHandler(type: "student" | "institute") {
        selectFieldFormik.setFieldValue("studentType", type)
    }

    // set field type Active handler Section 1st
    function examTypeActiveHandler(type: "exam" | "skills") {
        selectFieldFormik.setFieldValue("examType", type)
    }

    // toggle next section
    function toggleNextSection() {
        setIsNextSection(true)
    }

    return {
        selectFieldFormik,
        fieldTypeActiveHandler,
        isNextSection,
        toggleNextSection,
        examTypeActiveHandler
    }
}

function sanitizedParamURL(referId: string, courseId: string, type: "course" | "test") {
    const cleanUrl = `${window.location.origin}${window.location.pathname}?referId=${referId.split(" ").at(0)}&${type === "course" ? "courseId" : "testId"}=${courseId.split(" ").at(0)}`;
    return cleanUrl;
}


export type selectFieldType = {
    studentType: string,
    examType: string,
    refer?: string
}