import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handleCreateGovCourse, handleGovCourseById } from "@/services/gov-exam.service";
import { useFormik } from "formik"
import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const initialValues: EBookStepInitValI = {
    ebookFile: ""
}

export default function UseEBookStep(handleSkipNext: () => void) {
    const { slug } = useParams();
    const formik = useFormik<EBookStepInitValI>({
        initialValues,
        onSubmit: handleSubmit
    })

    // handle submit
    async function handleSubmit(val: EBookStepInitValI) {
        // const fileNameOnly = convertUserDataToApiData(val);
        // const filesOnly = convertToFilesArray(val);
        const formData = new FormData();
        if (val?.ebookFile) formData.append("ebookFile", val?.ebookFile);
        // if (filesOnly.length > 0) {
        //     filesOnly.forEach((ebookFile) => {
        //         if (ebookFile !== null) {
        //             formData.append("ebookFile", ebookFile);
        //         }
        //     });
        // }
        if (slug) formData.append("_id", slug);
        try {
            await handleCreateGovCourse(formData);
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
            const resp = await handleGovCourseById(id);
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