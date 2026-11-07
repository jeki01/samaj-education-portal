import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { initialValuesCourseForm } from "../course-form";
import type { CreateCourseFormValues } from "../gov-exam.types";
import { handleCreateGovCourse, handleGovCourseById, handlePublished } from "@/services/gov-exam.service";
import type { ErrResp } from "@/config/axios-instance";
import { toast } from "react-toastify";
import { checkAuthUserHelper, formatDateToDDMMYYYY, stringToCalendarDate } from "@/helper/global.helper";

export default function UseGovExamMain() {
    const [currentPageNo, setcurrentPageNo] = useState(0); // change count
    const navigate = useNavigate();
    const { slug } = useParams();

    // create course form
    const createCourseForm = useFormik<CreateCourseFormValues>({
        initialValues: initialValuesCourseForm,
        onSubmit: handleCreateCourse
    })   

    useEffect(() => {
        if (slug && slug !== "create-course") {
            setcurrentPageNo(5)
        }
    }, [])


    // on submit
    async function handleCreateCourse(val: CreateCourseFormValues) {
        const formData = new FormData();
        formData.append("category", val.category);
        formData.append("subcategory", val.subcategory);
        formData.append("courseName", val.courseName);
        formData.append("courseImages", val.courseImages);
        formData.append("courseDescription", val.courseDescription);
        formData.append("courseValidity", val.courseValidity);
        formData.append("coursePrice", val.coursePrice);
        formData.append("categoryType", val.categoryType);
        if(val.expireDate) formData.append("expireDate", formatDateToDDMMYYYY(val.expireDate.toString()));
        if(val?.subject) formData.append("subject", val.subject);

        if (slug && slug !== "create-course") {
            formData.append("_id", slug);
            createCourseForm.setFieldValue("_id", slug);
        }

        try {
            const resp = await handleCreateGovCourse(formData);
            const id = resp?.data?.data?._id;
            navigate(`/gov-exam/${id}`)
            if (val?.categoryType === "Topic") {
                setcurrentPageNo(3)
            }else{
                handleSkipNext()
            }
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
                const resp = await handleGovCourseById(slug);
                const data = resp?.data?.data;
                if (data?.category?._id) createCourseForm.setFieldValue("category", data?.category?._id);
                if (data?.subcategory?._id) createCourseForm.setFieldValue("subcategory", data?.subcategory?._id);
                if (data?.courseName) createCourseForm.setFieldValue("courseName", data?.courseName);
                if (data?.courseImages) createCourseForm.setFieldValue("courseImages", data?.courseImages);
                if (data?.courseValidity) createCourseForm.setFieldValue("courseValidity", data?.courseValidity);
                if (data?.coursePrice) createCourseForm.setFieldValue("coursePrice", data?.coursePrice);
                if (data?.courseDescription) createCourseForm.setFieldValue("courseDescription", data?.courseDescription);
                if (data?._id) createCourseForm.setFieldValue("_id", data?._id);
                if (data?.categoryType) createCourseForm.setFieldValue("categoryType", data?.categoryType);
                if (data?.subject?._id) createCourseForm.setFieldValue("subject", data?.subject?._id);
                if (data?.expireDate) createCourseForm.setFieldValue("expireDate", stringToCalendarDate(data?.expireDate));
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
        if (currentPageNo < 5) {
            setcurrentPageNo(a => a + 1);
        }
    }

    // Back to Course List page (main page)
    function handleCancelCourse() {
        navigate("/gov-exam")
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
            navigate("/gov-exam")
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
