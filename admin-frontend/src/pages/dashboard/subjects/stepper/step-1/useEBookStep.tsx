import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handleCreateSkillCourse, handleSkillCourseById, handleUpdateSkillCourse } from "@/services/skill.service";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";

const initialValues: EBookStepInitValI = {
    ebookFile: ""
}

export default function UseEBookStep(handleSkipNext: () => void) {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const formik = useFormik<EBookStepInitValI>({
        initialValues,
        onSubmit: handleSubmit
    })

    // handle submit
    async function handleSubmit(val: EBookStepInitValI) {
        const formData = new FormData();
        if (val?.ebookFile) formData.append("ebook", val?.ebookFile);

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
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    // get study notes details
    async function getStudyNotes(id: string) {
        try {
            const resp = await handleSkillCourseById(id);
            // console.log(resp?.data?.data)
            const data = resp?.data?.data?.ebook;
            formik.setFieldValue("ebookFile", data)
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    useEffect(() => {
        if (slug && slug !== "create-course")
            getStudyNotes(slug)
    }, [slug])


    // function convertApiDataToUserData(data: EBookAPIDataI[]) {
    //     data.forEach((value) => {
    //         if (value.categoryType === "Syllabus") {
    //             formik.setFieldValue("syllabus", value.ebooks)
    //         }
    //         if (value.categoryType === "Subject") {
    //             formik.setFieldValue("subject", value.ebooks)
    //         }
    //         if (value.categoryType === "Topic") {
    //             formik.setFieldValue("topic", value.ebooks)
    //         }
    //     })
    // }

    return {
        formik
    }
}

// for file only
// function convertToFilesArray(userData: EBookStepInitValI) {
//     const apiDataFormate = [];

//     if (userData.syllabus.length > 0) {
//         const files = userData.syllabus.map(item => item.ebookFile);
//         apiDataFormate.push(...files)
//     }

//     if (userData.subject.length > 0) {
//         const files = userData.subject.map(item => item.ebookFile);
//         apiDataFormate.push(...files)
//     }

//     if (userData.topic.length > 0) {
//         const files = userData.topic.map(item => item.ebookFile);
//         apiDataFormate.push(...files)
//     }

//     return apiDataFormate;
// }

// for file Names only
// function convertUserDataToApiData(userData: EBookStepInitValI) {
//     const apiDataFormate: {
//         categoryType: string;
//         ebookNames: string[];
//     }[] = [];

//     if (userData.syllabus.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Syllabus",
//             ebookNames: userData.syllabus.map(item => item.ebookName),
//         });
//     }

//     if (userData.subject.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Subject",
//             ebookNames: userData.subject.map(item => item.ebookName),
//         });
//     }

//     if (userData.topic.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Topic",
//             ebookNames: userData.topic.map(item => item.ebookName),
//         });
//     }

//     return apiDataFormate;
// }

// type eBookObj = {
//     ebookName: string,
//     ebookFile: string | File | null
// }

export interface EBookStepInitValI {
    ebookFile: string | File | null
}

// interface EBookAPIDataI {
//     categoryType: "Syllabus" | "Subject" | "Topic",
//     ebooks: eBookObj[]
// }