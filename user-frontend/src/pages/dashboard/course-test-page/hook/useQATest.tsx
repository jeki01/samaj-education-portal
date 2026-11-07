import { useEffect, useState } from "react";
import type { PurchasedCoursesI, TestSeriesI, TopicQuestions } from "../../my-learning/learning.type";
import { finalSubmitTestAPI, getComplimentaryCourseDetailsById, getPurchasedCourseDetailsById, saveAndNextQueAnsAPI, type FinalSubmitTest_BodyData, type SaveAndNextQueAns_BodyData } from "@/services/my-learning.service";
import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { getPercentage, minutesToSeconds } from "@/helper/global.helper";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { getCompetitionDetailsById } from "@/services/competition.service";
// let questionAttemptedCount = 0;

export default function UseQATest() {
    const [QuizListData, setQuizListData] = useState<TopicQuestions[]>([]);
    const [QueCount, setQueCount] = useState(0);
    const [QueCountList, setQueCountList] = useState<{ id: string, status: string }[]>([]);
    const [statusCount, setStatusCount] = useState<statusCountI>({ attempted: 0, marked: 0, notAttempted: 0 });
    // const [timesUp, setTimesUp] = useState(false);
    const [testTimeLeftInSec, setTestTimeLeftInSec] = useState<null | number>(null);
    const [QuizTimeLimit, setQuizzTimeLimit] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);
    const [learningName, setLearningName] = useState<LearningNamesI>({ topicName: "", courseName: "" });
    const slug = useParams<{ topicId: string, courseId: string }>();
    const navigate = useNavigate();
    const [QueProgress, setQueProgress] = useState<number>(0);
    const [timeTakenByUser, setTimeTakenByUser] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type");
    useEffect(() => {
        if (type && type !== "complimentary") {
            setSearchParams({ type: "complimentary" });
        }
    }, [type])

    useEffect(() => {
        const isAuid = localStorage.getItem("atmpuid");
        if (isAuid === null) {
            const attemptedUserId = uuidv4();
            localStorage.setItem("atmpuid", attemptedUserId);
        }
        return () => {
            localStorage.removeItem("atmpuid");
        }
    }, [])


    // ON Next Click
    async function handleNext(data: SaveAndNextQueAns_BodyData, answer: string, idx: number | null) {
        const attemptedUserId = localStorage.getItem("atmpuid");
        if (attemptedUserId) Object.assign(data, { attemptId: attemptedUserId });
        try {
            const { courseId, ...restBodyData } = data;
            let isSuccess;
            const testId = searchParams.get("id") || "";
            if (courseId === "competition" && testId) {
                isSuccess = await saveAndNextQueAnsAPI({ ...restBodyData, testSeriesId: testId });
            } else {
                isSuccess = await saveAndNextQueAnsAPI(data);
            }
            if (idx !== null) {
                setQuizListData(prev => {
                    const updated = prev.map((obj, i) => {
                        if (idx === i) {
                            return { ...obj, clientAnswer: answer }
                        }
                        return obj
                    })
                    return [...updated]
                })
            }
            if (isSuccess) {
                if (QueCount < (QuizListData.length - 1)) {
                    setQueCount(prev => prev + 1);
                    // questionAttemptedCount = questionAttemptedCount + 1;
                }
                //  else if (QueCount === (QuizListData.length - 1)) {
                //     questionAttemptedCount = questionAttemptedCount + 1;
                // }
                // if (QueProgress < 100) {
                //     if ((questionAttemptedCount) === QuizListData.length) {
                //         const percentageVal = getPercentage(questionAttemptedCount, QueCountList.length);
                //         setQueProgress(percentageVal);
                //     } else {
                //         const percentageVal = getPercentage(questionAttemptedCount, QueCountList.length);
                //         setQueProgress(percentageVal);
                //     }
                // }
                setQueCountList(handleMarkStatus);
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err);
        }

        function handleMarkStatus(data: { id: string, status: string }[]) {
            return data.map((item, idx) => {
                if (idx === QueCount) {
                    return { id: item.id, status: "success" }
                }
                return item;
            })
        }
    }

    // ON Previous Click
    function handlePrevious() {
        if (QueCount > 0) {
            setQueCount(prev => prev - 1)
        }
    }

    // Mark for Later
    function handleMarkLater() {
        if (QueCount < (QuizListData.length - 1)) {
            setQueCount(prev => prev + 1);
            setQueCountList(handleMarkStatus);
            function handleMarkStatus(data: { id: string, status: string }[]) {
                return data.map((item, idx) => {
                    if (idx === QueCount) {
                        return { id: item.id, status: "pending" }
                    }
                    return item;
                })
            }
        }
    }

    // Get Quiz List
    async function getQuizList(courseId: string) {
        try {
            let resp;
            if (type === "complimentary") {
                resp = await getComplimentaryCourseDetailsById(courseId);
            } else if (slug?.courseId === "competition") {
                resp = await getCompetitionDetailsById(slug?.topicId || "");
            } else {
                resp = await getPurchasedCourseDetailsById(courseId);
            }

            const data: PurchasedCoursesI = resp?.data;
            // set countdown timer
            setQuizzTimeLimit(minutesToSeconds(data?.testTime || Number(data?.totalExamTime)))
            // Set All Quiz
            if (slug?.topicId && data?.testSeries.length > 0) {
                if (slug?.courseId === "competition") {
                    const allQuestions = data?.testSeries[0]?.topicQuestions;
                    setQuizListData(allQuestions)
                    // handle status
                    createStatusList(allQuestions)
                    // Set Learning and Topic Name
                    setLearningName({
                        topicName: data?.examName || "-",
                        courseName: "Competition"
                    })
                } else {
                    const allQuestions: TestSeriesI[] = data?.testSeries.filter(obj => obj._id === slug?.topicId);
                    setQuizListData(allQuestions[0]?.topicQuestions)
                    // handle status
                    createStatusList(allQuestions[0]?.topicQuestions)
                    // Set Learning and Topic Name
                    setLearningName({
                        topicName: allQuestions[0]?.topicName || "-",
                        courseName: data?.courseName || "-"
                    })
                }
            }
        } catch (error) {
            const err = error as ErrResp;
            checkAuthUserHelper(err)
        }
    }

    useEffect(() => {
        if (slug?.courseId) {
            getQuizList(slug?.courseId)
        }
    }, [slug])


    // Create List With Status
    function createStatusList(data: TopicQuestions[]) {
        const statusArr = data.map(({ _id }) => {
            return { id: _id, status: "default" }
        })
        setQueCountList(statusArr)
    }

    // Count for attempted, Marked, not attempted
    function handleStatusCount() {
        const deafultCount = QueCountList.filter((item) => item.status === "default").length;
        const pendingCount = QueCountList.filter((item) => item.status === "pending").length;
        const successCount = QueCountList.filter((item) => item.status === "success").length;
        setStatusCount({
            attempted: successCount,
            marked: pendingCount,
            notAttempted: deafultCount
        })
    }

    useEffect(() => {
        handleStatusCount()
    }, [QueCountList])

    // get progress percentage 
    useEffect(() => {
        const percentageVal = getPercentage(statusCount.attempted, QueCountList.length);
        setQueProgress(percentageVal);
    }, [statusCount.attempted, QueCountList.length])


    // Final Quiz Submission API
    async function handleSubmitQuiz(data: FinalSubmitTest_BodyData) {
        // TODO : pass to API => timeTakenByUser
        const attemptedUserId = localStorage.getItem("atmpuid");
        if (attemptedUserId) Object.assign(data, { attemptId: attemptedUserId, testTakeTime: timeTakenByUser });

        if (slug?.courseId === "competition") {
            const restData = Object.fromEntries(Object.entries(data).filter(([key]) => key !== "courseId"));
            data = { ...restData } as FinalSubmitTest_BodyData;
            if (attemptedUserId) Object.assign(data, { attemptId: attemptedUserId, testTakeTime: timeTakenByUser, testSeriesId: searchParams.get("id") || "" });
        }
        try {
            await finalSubmitTestAPI(data);
            if (type === "complimentary") {
                navigate(`/my-learning-result/${slug?.courseId}/${slug?.topicId}/${attemptedUserId}?type=complimentary`);
            } else if (searchParams.get("id") && slug?.courseId === "competition") {
                navigate(`/my-learning-result/competition/${searchParams.get("id")}/${attemptedUserId}`)
            } else {
                navigate(`/my-learning-result/${slug?.courseId}/${slug?.topicId}/${attemptedUserId}`)
            }
            // setAllScore(resp?.data)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err)
        }
    }

    // handle switch b/w questions
    function handleSwitchQues(idx: number) {
        setQueCount(idx)
        setSelectedAnswer(null)
    }

    // times-up
    useEffect(() => {
        if (testTimeLeftInSec === 0) {
            toast.info("Time is up! Your test will be submitted automatically.");
            setTimeout(() => {
                if (slug?.topicId && slug?.courseId) {
                    handleSubmitQuiz({ testSeriesId: slug?.topicId, courseId: slug?.courseId })
                }
            }, 3000);
        }
    }, [testTimeLeftInSec])


    return {
        // setTimesUp,
        // setTimeInSec,
        QuizTimeLimit,
        QuizListData,
        QueCount,
        handleNext,
        handlePrevious,
        handleMarkLater,
        selectedAnswer,
        setSelectedAnswer,
        statusCount,
        learningName,
        QueCountList,
        handleSubmitQuiz,
        handleSwitchQues,
        QueProgress,
        setTimeTakenByUser,
        setTestTimeLeftInSec
    }
}

export interface statusCountI {
    attempted: number,
    marked: number,
    notAttempted: number
}

export interface LearningNamesI {
    topicName: string,
    courseName: string
}