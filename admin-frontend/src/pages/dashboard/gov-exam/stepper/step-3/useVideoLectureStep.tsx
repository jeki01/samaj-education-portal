import { handleCreateGovCourse, handleGovCourseById } from "@/services/gov-exam.service";
import { useFormik } from "formik"
import { useEffect } from "react";
import { useParams } from "react-router";


const initialValues: VideoLectureInitValI = {
    videoLectureGroups: [],
    categoryType: ""
}

export default function UseVideoLectureStep(handleSkipNext: () => void) {
    const { slug } = useParams();
    const formik = useFormik<VideoLectureInitValI>({
        initialValues,
        onSubmit: handleSubmit
    })

    async function handleSubmit(val: VideoLectureInitValI) {
        // const apiFormattedData = convertUserDataToApiData(val);
        const formData = new FormData();
        if (val?.videoLectureGroups.length > 0) formData.append("videoLectureGroups", JSON.stringify(val?.videoLectureGroups));
        if (slug) formData.append("_id", slug);
        try {
            await handleCreateGovCourse(formData);
            handleSkipNext()
        } catch (error) {
            console.log(error);
        }
    }

    // get study notes details
    async function getStudyNotes(id: string) {
        try {
            const resp = await handleGovCourseById(id);
            const data = resp?.data?.data?.videoLectures;
            formik.setFieldValue("videoLectureGroups", data)
            formik.setFieldValue("categoryType", resp?.data?.data?.categoryType)
            // convertApiDataToUserData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (slug && slug !== "create-course")
            getStudyNotes(slug)
    }, [slug])


    // function convertApiDataToUserData(data: VideoLectureAPIDataI[]) {
    //     data.forEach((value) => {
    //         if (value.categoryType === "Syllabus") {
    //             formik.setFieldValue("syllabus", value.lectures)
    //         }
    //         if (value.categoryType === "Subject") {
    //             formik.setFieldValue("subject", value.lectures)
    //         }
    //         if (value.categoryType === "Topic") {
    //             formik.setFieldValue("topic", value.lectures)
    //         }
    //     })
    // }


    return {
        formik
    }
}

// function convertUserDataToApiData(userData: VideoLectureStepInitValI) {
//     const apiDataFormate: {
//         categoryType: string;
//         lectures: VideoLecturesI[];
//     }[] = [];

//     if (userData.syllabus.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Syllabus",
//             lectures: userData.syllabus,
//         });
//     }

//     if (userData.subject.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Subject",
//             lectures: userData.subject,
//         });
//     }

//     if (userData.topic.length > 0) {
//         apiDataFormate.push({
//             categoryType: "Topic",
//             lectures: userData.topic,
//         });
//     }

//     return apiDataFormate;
// }

interface VideoLecturesI { //step 3
    videoLectureName: string,
    videoLectureLink: string
}
export interface VideoLectureStepInitValI {
    videoLectureGroups: VideoLecturesI[]
}

export interface VideoLectureInitValI extends VideoLectureStepInitValI {
    categoryType: string
}

// interface VideoLectureAPIDataI {
//     categoryType: "Syllabus" | "Subject" | "Topic",
//     lectures: VideoLecturesI[]
// }