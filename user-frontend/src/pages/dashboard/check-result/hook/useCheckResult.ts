import type { ErrResp } from "@/config/axios-instance";
import { getCheckResultDetails } from "@/services/my-learning.service";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const initVal: resultDetails = {
    percentage: "",
    totalCorrect: 0,
    totalNotAttempted: 0,
    totalQuestions: 0,
    totalWrong: 0,
    data: []
}

export default function UseCheckResult() {
    const slug = useParams<{ attemptId: string, courseId: string, testSeriesId: string }>();
    const [resultDetailsData, setResultDetailsData] = useState<resultDetails>(initVal);

    async function handleResultDetails(courseId: string | undefined, testSeriesId: string, attemptId: string) {
        try {
            if (slug?.courseId === "competition") {
                courseId = undefined
            }
            const resp = await getCheckResultDetails(courseId, testSeriesId, attemptId);
            setResultDetailsData(resp?.data)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "Something went wrong")
        }
    }

    useEffect(() => {
        if (slug?.attemptId && slug?.courseId && slug?.testSeriesId) {
            handleResultDetails(slug?.courseId, slug?.testSeriesId, slug?.attemptId)
        }
    }, [slug?.attemptId, slug?.courseId, slug?.testSeriesId]);


    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollToQuestion = (questionNumber: number): void => {
        const targetElement = questionRefs.current[questionNumber - 1];
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return {
        resultDetailsData,
        scrollToQuestion,
        questionRefs,
        slug
    }
}


interface resultDetails {
    percentage: string;
    totalCorrect: number;
    totalNotAttempted: number;
    totalQuestions: number;
    totalWrong: number;
    data: questionDetails[]
}

export interface questionDetails {
    status: "Wrong" | "Correct" | "Not Attempted",
    questionImage: string,
    question: string,
    selectedAnswer: {
        image: string,
        key: string,
        text: string
    } | null,
    correctAnswer: {
        image: string,
        key: string,
        text: string
    },
    options: {
        image: string,
        key: string,
        text: string
    }[]
}