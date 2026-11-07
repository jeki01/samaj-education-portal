import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { handleCourseList } from "@/services/home.service";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomeThemeContext from "./HomeContext";

export default function UseHomeDetails() {
    const [courseListData, setCourseListData] = useState<CourseListData[]>([]);
    const [walletPrice, setWalletPrice] = useState(0);
    const [isRefer, setIsRefer] = useState(false);
    const { setHandleGetCourseList } = useContext(HomeThemeContext);

    async function getCourseList(category?: string, subcategory?: string) {
        try {
            const resp = await handleCourseList(category, subcategory);
            setCourseListData(resp?.data?.data);
            setWalletPrice(resp?.data?.earning);
            setIsRefer(resp?.data?.payment);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        getCourseList()
    }, [])

    // set course list api 

    useEffect(() => {
        setHandleGetCourseList(() => getCourseList);
    }, [setHandleGetCourseList]);


    return {
        courseListData,
        getCourseList,
        walletPrice,
        isRefer
    }
}


export interface CourseListData {
    "_id": string,
    "category": {
        "_id": string,
        "name": string
    },
    "subcategory": {
        "_id": string,
        "name": string
    },
    "subsubcategory": {
        "_id": string,
        "name": string
    },
    "courseImages": string,
    "ebook": string,
    "courseName": string,
    "courseDescription": string,
    "courseValidity": number,
    "coursePrice": number,
    "studyNotes": {
        "studyNoteName": string,
        "studyNoteFile": string,
        "_id": string
    }[],
    "videoLectures":
    {
        "videoLectureName": string,
        "videoLectureLink": string,
        "_id": string
    }[],
    "testSeries": {
        "topicName": string,
        "topicQuestions": {
            "question": string,
            "option1": string,
            "option2": string,
            "option3": string,
            "option4": string,
            "answer": string,
            "_id": string
        }[],
        "_id": string
    }[],
    "subject": {
        "_id": string,
        "name": string
    },
    "status": string,
    "createdBy": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "ebookPercentage": number | null,
    "notePercentage": number | null,
    "testPercentage": number | null,
    "videoPercentage": number | null,
}