import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { getTestTopicHistoryAPI } from "@/services/my-learning.service";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UseTestHistory() {
    const [testHistory, setTestHistory] = useState<TestHistoryResultDetails[]>([]);
    // const [isToggleHistory, setIsToggleHistory] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const toggleHistory = (currIndex: number | null) => {
        setCurrentIndex(currIndex);
    };

    async function handleGetTestHistory(topicId: string) {
        try {
            const response = await getTestTopicHistoryAPI(topicId);
            setTestHistory(response.data?.results);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err);
        }
    }

    return {
        handleGetTestHistory,
        testHistory,
        currentIndex,
        toggleHistory
    }
}

export interface TestHistoryResultDetails {
    "_id": string;
    "userId": string,
    "courseId": {
        "_id": string,
        "testTime": number
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
    "totalMarks": number,
    "createdAt": string,
    "updatedAt": string,
    testTakeTime: number,
    "__v": number
}
