import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { type createExamI } from "../course-form";
// import type { CreateCourseFormValues } from "../gov-exam.types";
import { handleCompetitionExamById, handleCreateCompetitionExam, handlePublishedCompetition } from "@/services/gov-exam.service";
import type { ErrResp } from "@/config/axios-instance";
import { toast } from "react-toastify";
import { checkAuthUserHelper, formatDateToDDMMYYYY, parseTimeString, stringToCalendarDate } from "@/helper/global.helper";
import type { DateValue } from "@react-types/calendar";

const initValTest: createExamI = {
    examName: "",
    examPrice: "",
    totalExamTime: "",
    marksPerQuestion: "",
    negativeMarkings: 0,
    scheduleDate: null as DateValue | null,
    testSeries: [],
    scheduleTime: null
}

export default function UseGovExamMain() {
    const [currentPageNo, setcurrentPageNo] = useState(0); // change count
    const navigate = useNavigate();
    const { slug } = useParams();

    // create course form
    const createCourseForm = useFormik<createExamI>({
        initialValues: initValTest,
        onSubmit: handleCreateCourse
    })

    // console.log("createCourseForm", (createCourseForm.values.examTime).toString());


    useEffect(() => {
        if (slug && slug !== "create-course") {
            setcurrentPageNo(2)
        }
    }, [])


    // on submit
    async function handleCreateCourse(val: createExamI) {
        const formData = new FormData();
        formData.append("examName", val.examName);
        formData.append("examPrice", val.examPrice);
        formData.append("totalExamTime", val.totalExamTime);
        formData.append("marksPerQuestion", val.marksPerQuestion);
        formData.append("negativeMarkings", val.negativeMarkings.toString());
        if (val.scheduleDate) formData.append("scheduleDate", formatDateToDDMMYYYY(val.scheduleDate.toString()));
        if (val.scheduleTime) formData.append("scheduleTime", val.scheduleTime.toString());
        // formData.append("categoryType", val.categoryType);
        // if (val.expireDate) formData.append("expireDate", formatDateToDDMMYYYY(val.expireDate.toString()));
        // if (val?.subject) formData.append("subject", val.subject);

        if (slug && slug !== "create-course") {
            formData.append("_id", slug);
            createCourseForm.setFieldValue("_id", slug);
        }

        try {
            const resp = await handleCreateCompetitionExam(formData);
            const id = resp?.data?.data?._id;
            navigate(`/competition-exam/${id}`)
            // if (val?.categoryType === "Topic") {
            //     setcurrentPageNo(3)
            // } else {
            // }
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
                const resp = await handleCompetitionExamById(slug);
                const data = resp?.data?.data;
                if (data?.examName) createCourseForm.setFieldValue("examName", data?.examName);
                if (data?.examPrice) createCourseForm.setFieldValue("examPrice", data?.examPrice);
                if (data?.totalExamTime) createCourseForm.setFieldValue("totalExamTime", data?.totalExamTime);
                if (data?.marksPerQuestion) createCourseForm.setFieldValue("marksPerQuestion", data?.marksPerQuestion);
                if (data?.negativeMarkings) createCourseForm.setFieldValue("negativeMarkings", data?.negativeMarkings);
                if (data?.scheduleTime) createCourseForm.setFieldValue("scheduleTime", parseTimeString(data?.scheduleTime));
                // if (data?.courseDescription) createCourseForm.setFieldValue("courseDescription", data?.courseDescription);
                if (data?._id) createCourseForm.setFieldValue("_id", data?._id);
                // if (data?.categoryType) createCourseForm.setFieldValue("categoryType", data?.categoryType);
                // if (data?.subject?._id) createCourseForm.setFieldValue("subject", data?.subject?._id);
                if (data?.scheduleDate) createCourseForm.setFieldValue("scheduleDate", stringToCalendarDate(data?.scheduleDate));
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
        navigate("/competition-exam")
    }

    // edit course 
    function EditCourse() {
        setcurrentPageNo(0);
    }

    // published api
    async function publishedCourseApi(id: string) {
        try {
            await handlePublishedCompetition(id);
            toast.success("Exam test published successfully!")
            navigate("/competition-exam")
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
