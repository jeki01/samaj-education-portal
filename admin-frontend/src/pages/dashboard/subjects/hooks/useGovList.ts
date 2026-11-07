import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handleFilterGovList } from "@/services/gov-exam.service";
import { handleDeleteSkillCourse, handleGetSkillCourse } from "@/services/skill.service";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface GOVLISTINITVALI {
    category: string,
    subcategory: string,
    subsubcategory: string,
    categoryType: string
}

export default function useGovList() {
    const [GovListData, setGovListData] = useState<ListDetails[]>([]);
    const [deleteId, setdeleteId] = useState("");


    const createCourseForm = useFormik<GOVLISTINITVALI>({
        initialValues: {
            category: "",
            subcategory: "",
            subsubcategory: "",
            categoryType: ""
        },
        onSubmit: handleCreateCourse
    })

    async function handleCreateCourse(val: GOVLISTINITVALI) {
        try {
            const resp = await handleFilterGovList(val);
            setGovListData(resp?.data?.data)
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    // get list
    async function getGovList() {
        try {
            const resp = await handleGetSkillCourse();
            setGovListData(resp?.data?.data)
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    useEffect(() => {
        getGovList()
    }, [])


    // delet
    async function deleteGovItem() {
        try {
            await handleDeleteSkillCourse(deleteId);
            getGovList();
            setdeleteId("")
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    return {
        GovListData,
        deleteGovItem,
        setdeleteId,
        createCourseForm,
        getGovList
    }
}


interface ListDetails {
    "_id": string,
    "category": string,
    "subcategory": string,
    "subsubcategory": string,
    "courseImages": string,
    "ebook": string,
    "courseName": string,
    "courseDescription": string,
    "courseValidity": number,
    "coursePrice": number,
    "studyNotes": [],
    "videoLectures": [],
    "testSeries": [],
    "status": string,
    "createdBy": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "topicQuizzes": [],
    assessment: [],
    lectures: [],
    SkillName: string;
}

// import type { ErrResp } from "@/config/axios-instance";
// import { checkAuthUserHelper } from "@/helper/global.helper";
// import { handleDeleteCompetitionCourse, handleFilterGovList, handleGetCompetitionCourse } from "@/services/gov-exam.service";
// import { useFormik } from "formik";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import type { TestSeriesI } from "../../competition-exam/gov-exam.types";

// export interface GOVLISTINITVALI {
//     category: string,
//     subcategory: string,
//     subsubcategory: string,
//     categoryType: string
// }

// export default function useGovList() {
//     const [GovListData, setGovListData] = useState<ListDetails[]>([]);
//     const [deleteId, setdeleteId] = useState("");


//     const createCourseForm = useFormik<GOVLISTINITVALI>({
//         initialValues: {
//             category: "",
//             subcategory: "",
//             subsubcategory: "",
//             categoryType: ""
//         },
//         onSubmit: handleCreateCourse
//     })

//     async function handleCreateCourse(val: GOVLISTINITVALI) {
//         try {
//             const resp = await handleFilterGovList(val);
//             setGovListData(resp?.data?.data)
//         } catch (error) {
//             console.log(error);
//             const err = error as ErrResp;
//             toast.error(err?.response?.data?.message);
//             checkAuthUserHelper(err)
//         }
//     }

//     // get list
//     async function getGovList() {
//         try {
//             const resp = await handleGetCompetitionCourse();
//             setGovListData(resp?.data?.data)
//         } catch (error) {
//             console.log(error);
//             const err = error as ErrResp;
//             toast.error(err?.response?.data?.message);
//             checkAuthUserHelper(err)
//         }
//     }

//     useEffect(() => {
//         getGovList()
//     }, [])


//     // delet
//     async function deleteGovItem() {
//         try {
//             await handleDeleteCompetitionCourse(deleteId);
//             getGovList();
//             setdeleteId("")
//         } catch (error) {
//             console.log(error);
//             const err = error as ErrResp;
//             toast.error(err?.response?.data?.message);
//             checkAuthUserHelper(err)
//         }
//     }

//     return {
//         GovListData,
//         deleteGovItem,
//         setdeleteId,
//         createCourseForm,
//         getGovList
//     }
// }


// interface ListDetails {
//     "_id": string,
//     "category": string,
//     "subcategory": string,
//     "subsubcategory": string,
//     "courseImages": string,
//     "ebook": string,
//     "courseName": string,
//     "courseDescription": string,
//     "courseValidity": number,
//     "coursePrice": number,
//     "studyNotes": [],
//     "videoLectures": [],
//     "testSeries": TestSeriesI[],
//     "status": string,
//     "createdBy": string,
//     "createdAt": string,
//     "updatedAt": string,
//     "__v": number,
//     "topicQuizzes": [],
//     examName: string,
//     examPrice: string,
//     "marksPerQuestion": string,
//     "negativeMarkings": string,
//     "scheduleDate": string,
//     "scheduleTime": string,
//     "totalExamTime": string,
// }