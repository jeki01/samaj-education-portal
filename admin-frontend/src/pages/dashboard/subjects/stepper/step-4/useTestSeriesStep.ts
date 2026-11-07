import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handleCreateSkillCourse, handleSkillCourseById, handleUpdateSkillCourse } from "@/services/skill.service";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";


const initialValues: AssessmentI = {
    assessment: []
}

export default function UseTestSeriesStep() {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();

    const formik = useFormik<AssessmentI>({
        initialValues,
        onSubmit: handleSubmit
    });
    const navigate = useNavigate();

    // handle submit
    async function handleSubmit(val: AssessmentI) {

        const formData = new FormData();
        if (val?.assessment.length > 0) formData.append("assessment", JSON.stringify(val?.assessment));
        try {
            const type = searchParams.get("type");
            if (type === "create") {
                if (slug) formData.append("_id", slug);
                const resp = await handleCreateSkillCourse(formData);
                toast.success(resp?.data?.message || "created");
            } else if (slug !== "create-course") {
                const resp = await handleUpdateSkillCourse(formData, slug || "");
                toast.success(resp?.data?.message || "updated");
            }
            setTimeout(() => {
                navigate("/skill-course")
            }, 2000);
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    // get study notes details
    async function getStudyNotes(id: string) {
        try {
            const resp = await handleSkillCourseById(id);
            const data = resp?.data?.data?.assessment;
            formik.setFieldValue("assessment", data);
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    useEffect(() => {
        if (slug)
            getStudyNotes(slug)
    }, [slug])




    return {
        formik
    }
}

export interface TestTopicQuestionI {
    question: string;
    questionImage?: string;
    option1: string;
    option1Image?: string;
    option2: string;
    option2Image?: string;
    option3: string;
    option3Image?: string;
    option4: string;
    option4Image?: string;
    option5: string;
    option5Image?: string;
    answer: string;
}

interface TestSeriesI {
    topicName: string,
    topicQuestions: TestTopicQuestionI[]
}

export interface TestSeriesFormVal {
    topics: TestSeriesI[]
}

export interface TestSeriesStepInitValI extends TestSeriesFormVal {
    maximumMark: number,
    negativeMark: number,
    categoryType: string,
    testTime: number
}

// interface TestSeriesAPIDataI {
//     categoryType: "Syllabus" | "Subject" | "Topic",
//     topics: TestSeriesI[]
// }

export interface AssessmentI {
    assessment: TestTopicQuestionI[]
}