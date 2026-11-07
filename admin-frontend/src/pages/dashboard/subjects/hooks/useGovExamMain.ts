import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handlePublished } from "@/services/gov-exam.service";
import { handleCreateSkillCourse, handleSkillCourseById, handleUpdateSkillCourse } from "@/services/skill.service";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { initialValuesCourseForm } from "../course-form";
import type { CreateCourseFormValues } from "../gov-exam.types";

export default function UseGovExamMain() {
    const [currentPageNo, setcurrentPageNo] = useState(0); // change count
    const navigate = useNavigate();
    const { slug } = useParams();
    const [searchParams] = useSearchParams();

    // create course form
    const createCourseForm = useFormik<CreateCourseFormValues>({
        initialValues: initialValuesCourseForm,
        onSubmit: handleCreateCourse
    })

    useEffect(() => {
        if (slug && slug !== "create-course") {
            setcurrentPageNo(0)
        }
    }, [])


    // on submit
    async function handleCreateCourse(val: CreateCourseFormValues) {
        const formData = new FormData();
        formData.append("SkillName", val.courseName);
        formData.append("SkillcourseImages", val.courseImage);
        formData.append("About", val.courseDescription);
        formData.append("tagline", val.tagline);

        if (slug && slug !== "create-course") {
            formData.append("_id", slug);
            createCourseForm.setFieldValue("_id", slug);
        }

        try {
            const type = searchParams.get("type");
            if (type === "create") {
                const resp = await handleCreateSkillCourse(formData);
                const id = resp?.data?.data?._id;
                // const type = searchParams.get("type");
                // const url = type === "create" ? `/skill-course/${id}?type=create` : `/skill-course/${id}`
                navigate(`/skill-course/${id}?type=create`);
            } else {
                await handleUpdateSkillCourse(formData, slug || "");
                // const type = searchParams.get("type");
                // const url = type === "create" ? `/skill-course/${slug}?type=create` : `/skill-course/${slug}`
                navigate(`/skill-course/${slug}`);
            }
            handleSkipNext()
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    //  ====================== Edit Details Set To Form Values =============================

    async function getByIdDetails() {
        if (slug && slug !== "create-course") {
            try {
                const resp = await handleSkillCourseById(slug);
                const data = resp?.data?.data;
                // if (data?.category?._id) createCourseForm.setFieldValue("category", data?.category?._id);
                // if (data?.subcategory?._id) createCourseForm.setFieldValue("subcategory", data?.subcategory?._id);
                if (data?.SkillName) createCourseForm.setFieldValue("courseName", data?.SkillName);
                if (data?.SkillcourseImages) createCourseForm.setFieldValue("courseImage", data?.SkillcourseImages);
                // if (data?.courseValidity) createCourseForm.setFieldValue("courseValidity", data?.courseValidity);
                if (data?.tagline) createCourseForm.setFieldValue("tagline", data?.tagline);
                if (data?.About) createCourseForm.setFieldValue("courseDescription", data?.About);
                if (data?._id) createCourseForm.setFieldValue("_id", data?._id);
                // if (data?.categoryType) createCourseForm.setFieldValue("categoryType", data?.categoryType);
                // if (data?.subject?._id) createCourseForm.setFieldValue("subject", data?.subject?._id);
                // if (data?.expireDate) createCourseForm.setFieldValue("expireDate", stringToCalendarDate(data?.expireDate));
            } catch (error) {
                console.log(error);
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err)
            }
        }
    }

    useEffect(() => {
        getByIdDetails();
    }, [])

    // handle Back 
    function handleBack() {
        if (currentPageNo > 0) {
            setcurrentPageNo(a => a - 1);
        }
    }
    // handle Skip Next 
    function handleSkipNext() {
        if (currentPageNo < 3) {
            setcurrentPageNo(a => a + 1);
        }
    }

    // Back to Course List page (main page)
    function handleCancelCourse() {
        navigate("/skill-course")
    }

    // edit course 
    function EditCourse() {
        setcurrentPageNo(0);
    }

    // published api
    async function publishedCourseApi(id: string) {
        try {
            await handlePublished(id);
            toast.success("course published successfully!")
            navigate("/skill-course")
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    return {
        currentPageNo,
        handleBack,
        handleSkipNext,
        handleCancelCourse,
        createCourseForm,
        EditCourse,
        publishedCourseApi
    }
}
