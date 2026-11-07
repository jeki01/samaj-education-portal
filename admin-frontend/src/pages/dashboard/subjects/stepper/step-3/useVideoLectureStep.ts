import { handleCreateSkillCourse, handleSkillCourseById, handleUpdateSkillCourse } from "@/services/skill.service";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";


const initialValues: LectureStepInitValI = {
    lectures: []
}

export default function UseVideoLectureStep(handleSkipNext: () => void) {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();

    const formik = useFormik<LectureStepInitValI>({
        initialValues,
        onSubmit: handleSubmit
    })

    async function handleSubmit(val: LectureStepInitValI) {
        // const apiFormattedData = convertUserDataToApiData(val);
        const formData = new FormData();
        if (val?.lectures.length > 0) formData.append("lectures", JSON.stringify(val?.lectures));
        try {
            const type = searchParams.get("type");
            if (type === "create") {
                if (slug) formData.append("_id", slug);
                await handleCreateSkillCourse(formData);
            } else if (slug !== "create-course") {
                await handleUpdateSkillCourse(formData, slug || "");
            }
            handleSkipNext()
        } catch (error) {
            console.log(error);
        }
    }

    // get study notes details
    async function getStudyNotes(id: string) {
        try {
            const resp = await handleSkillCourseById(id);
            const data = resp?.data?.data?.lectures;
            formik.setFieldValue("lectures", data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (slug && slug !== "create-course")
            getStudyNotes(slug)
    }, [slug])


    return {
        formik
    }
}


interface LecturesI {
    name: string;
    about: string;
    link: string;
    time: string;
}
export interface LectureStepInitValI {
    lectures: LecturesI[]
}