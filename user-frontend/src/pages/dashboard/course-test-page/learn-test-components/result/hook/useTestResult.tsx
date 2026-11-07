import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { getTestResultAPI } from "@/services/my-learning.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function UseTestResult() {
    const slug = useParams();
    const [testResultDetails, setTestResultDetails] = useState<TestResultI>(initialVal)

    async function handleTestResult(courseId: string, testSeriesId: string) {
        try {
            if (slug?.courseId === "competition") {
                const resp = await getTestResultAPI(undefined, testSeriesId);
                setTestResultDetails(resp?.data?.data);
            } else {
                const resp = await getTestResultAPI(courseId, testSeriesId);
                setTestResultDetails(resp?.data?.data);
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        if (slug?.courseId && slug?.topicId) {
            handleTestResult(slug?.courseId, slug?.topicId)
        }
    }, [slug])

    return {
        testResultDetails,
        slug
    }
}

const initialVal: TestResultI = {
    _id: "",
    userId: "",
    courseId: {
        _id: "",
        courseName: ""
    },
    testSeriesId: "",
    totalQuestions: 0,
    attempted: 0,
    correct: 0,
    wrong: 0,
    skipped: 0,
    totalScore: 0,
    maximumMark: 0,
    negativeMark: 0,
    percentage: 0,
    createdAt: "",
    updatedAt: "",
    __v: 0,
    totalMarks: 0
}

export interface TestResultI {
    "_id": string,
    "userId": string,
    "courseId": {
        "_id": string,
        "courseName": string
    },
    "testSeriesId": string,
    "totalQuestions": number,
    "attempted": number,
    "correct": number,
    "wrong": number,
    "skipped": number,
    "totalScore": number,
    "maximumMark": number,
    "negativeMark": number,
    "percentage": number,
    "createdAt": string,
    "updatedAt": string,
    totalMarks: number
    "__v": 0
}