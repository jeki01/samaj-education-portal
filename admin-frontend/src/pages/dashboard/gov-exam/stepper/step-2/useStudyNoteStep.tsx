import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handleCreateGovCourse, handleGovCourseById } from "@/services/gov-exam.service";
import { useFormik } from "formik"
import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const initialValues: StudyNoteStepInitValI = {
    studyNoteFile: ""
}


export default function UseStudyNoteStep(handleSkipNext: () => void) {
    const { slug } = useParams();
    const formik = useFormik<StudyNoteStepInitValI>({
        initialValues,
        onSubmit: handleSubmit
    })

    // handle submit
    async function handleSubmit(val: StudyNoteStepInitValI) {
        // const fileNameOnly = convertUserDataToApiData(val);
        // const filesOnly = convertToFilesArray(val);
        const formData = new FormData();
        if (val?.studyNoteFile) formData.append("studyNoteFile", val?.studyNoteFile);
        // if (filesOnly.length > 0) {
        //     filesOnly.forEach((studyNoteFile) => {
        //         if (studyNoteFile !== null) {
        //             formData.append("studyNoteFile", studyNoteFile);
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
            const data = resp?.data?.data?.studyNotes;
            formik.setFieldValue("studyNoteFile", data)
            // convertApiDataToUserData(data);
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


    // function convertApiDataToUserData(data: StudyNoteAPIDataI[]) {
    //     data.forEach((value) => {
    //         if (value.categoryType === "Syllabus") {
    //             formik.setFieldValue("syllabus", value.notes)
    //         }
    //         if (value.categoryType === "Subject") {
    //             formik.setFieldValue("subject", value.notes)
    //         }
    //         if (value.categoryType === "Topic") {
    //             formik.setFieldValue("topic", value.notes)
    //         }
    //     })
    // }

    return {
        formik
    }
}


// for file only
// function convertToFilesArray(userData: StudyNoteStepInitValI) {
//     const apiDataFormate = [];

//     if (userData.syllabus.length > 0) {
//         const files = userData.syllabus.map(item => item.studyNoteFile);
//         apiDataFormate.push(...files)
//     }

//     if (userData.subject.length > 0) {
//         const files = userData.subject.map(item => item.studyNoteFile);
//         apiDataFormate.push(...files)
//     }

//     if (userData.topic.length > 0) {
//         const files = userData.topic.map(item => item.studyNoteFile);
//         apiDataFormate.push(...files)
//     }

//     return apiDataFormate;
// }

// for file Names only
// function convertUserDataToApiData(userData: StudyNoteStepInitValI) {
//     const apiDataFormate: {
//         categoryType: string;
//         studyNoteNames: string[];
//     }[] = [];

//     if (userData.syllabus.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Syllabus",
//             studyNoteNames: userData.syllabus.map(item => item.studyNoteName),
//         });
//     }

//     if (userData.subject.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Subject",
//             studyNoteNames: userData.subject.map(item => item.studyNoteName),
//         });
//     }

//     if (userData.topic.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Topic",
//             studyNoteNames: userData.topic.map(item => item.studyNoteName),
//         });
//     }

//     return apiDataFormate;
// }


// type studyNoteObj = {
//     studyNoteName: string,
//     studyNoteFile: string | File | null
// }

export interface StudyNoteStepInitValI {
    studyNoteFile: string | File | null
}

// interface StudyNoteAPIDataI {
//     categoryType: "Syllabus" | "Subject" | "Topic",
//     notes: studyNoteObj[]
// }