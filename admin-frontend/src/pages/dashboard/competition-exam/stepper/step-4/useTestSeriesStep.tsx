import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import {handleCreateCompetitionExam } from "@/services/gov-exam.service";
import { useFormik } from "formik"
// import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";


const initialValues: TestSeriesFormVal = {
    topics: [],
    // maximumMark: 1,
    // negativeMark: 0,
    // categoryType: "",
    // testTime: 1
}

export default function UseTestSeriesStep(handleSkipNext: () => void) {
    const { slug } = useParams();
    const formik = useFormik<TestSeriesFormVal>({
        initialValues,
        onSubmit: handleSubmit
    })

    console.log(formik.values.topics);
    

    // handle submit
    async function handleSubmit(val: TestSeriesFormVal) {
        // const apiFormattedData = convertUserDataToApiData(val);
        // console.log("4th test series user data", val);
        // console.log("4th test series api formatted data", apiFormattedData);
        const topics = val.topics;
        const topicsStr = topics.map((obj: TestSeriesI) => (
            {
                ...obj,
                topicQuestions: obj.topicQuestions.map(q => ({
                    question: q.question,
                    option1: q.option1,
                    option2: q.option2,
                    option3: q.option3,
                    option4: q.option4,
                    option5: q.option5,
                    answer: q.answer
                }))
            }
        ))
        const formData = new FormData();
        if (topicsStr.length > 0) formData.append("testSeries", JSON.stringify(topicsStr));
        if (slug) formData.append("_id", slug);
        // if (val.maximumMark) formData.append("maximumMark", val.maximumMark.toString());
        // if (val.negativeMark) formData.append("negativeMark", val.negativeMark.toString());
        // if (val.testTime) formData.append("testTime", val.testTime.toString());

        topics.forEach((obj, topicIdx) => {
            obj.topicQuestions.forEach((q, quesIdx) => {
                if (q.questionImage) formData.append(`questionImage[${topicIdx}][${quesIdx}]`, q.questionImage);
                if (q.option1Image) formData.append(`option1Image[${topicIdx}][${quesIdx}]`, q.option1Image);
                if (q.option2Image) formData.append(`option2Image[${topicIdx}][${quesIdx}]`, q.option2Image);
                if (q.option3Image) formData.append(`option3Image[${topicIdx}][${quesIdx}]`, q.option3Image);
                if (q.option4Image) formData.append(`option4Image[${topicIdx}][${quesIdx}]`, q.option4Image);
                if (q.option5Image) formData.append(`option5Image[${topicIdx}][${quesIdx}]`, q.option5Image);
            });
        });
        try {
            await handleCreateCompetitionExam(formData);
            handleSkipNext()
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    // get study notes details
    // async function getStudyNotes(id: string) {
    //     try {
    //         const resp = await handleCompetitionExamById(id);
    //         const data = resp?.data?.data?.testSeries;
    //         // if (resp?.data?.data?.maximumMark) formik.setFieldValue("maximumMark", resp?.data?.data?.maximumMark);
    //         // if (resp?.data?.data?.negativeMark) formik.setFieldValue("negativeMark", resp?.data?.data?.negativeMark);
    //         formik.setFieldValue("topics", data);
    //         // formik.setFieldValue("categoryType", resp?.data?.data?.categoryType)
    //         // if (resp?.data?.data?.testTime) formik.setFieldValue("testTime", resp?.data?.data?.testTime);
    //         // convertApiDataToUserData(data);
    //     } catch (error) {
    //         console.log(error);
    //         const err = error as ErrResp;
    //         toast.error(err?.response?.data?.message);
    //         checkAuthUserHelper(err)
    //     }
    // }

    // useEffect(() => {
    //     if (slug && slug !== "create-course")
    //         getStudyNotes(slug)
    // }, [slug])

    // function convertApiDataToUserData(data: TestSeriesAPIDataI[]) {
    //     data.forEach((value) => {
    //         if (value.categoryType === "Syllabus") {
    //             formik.setFieldValue("syllabus", value.topics)
    //         }
    //         if (value.categoryType === "Subject") {
    //             formik.setFieldValue("subject", value.topics)
    //         }
    //         if (value.categoryType === "Topic") {
    //             formik.setFieldValue("topic", value.topics)
    //         }
    //     })
    // }


    // max marks and neg marks incre decre

    // function handleUpdateMaxMarks(action: "increase" | "decrease") {
    //     switch (action) {
    //         case "increase": {
    //             const maxMark = formik.values.maximumMark + 1;
    //             formik.setFieldValue("maximumMark", maxMark)
    //         }
    //             break;
    //         case "decrease":
    //             {
    //                 if (formik.values.maximumMark > 1) {
    //                     const maxMark = formik.values.maximumMark - 1;
    //                     formik.setFieldValue("maximumMark", maxMark)
    //                 }
    //             }
    //             break;
    //     }
    // }

    // function handleUpdateNegMarks(action: "increase" | "decrease") {
    //     switch (action) {
    //         case "increase": {
    //             const negMark = formik.values.negativeMark + 1;
    //             formik.setFieldValue("negativeMark", negMark)
    //         }
    //             break;
    //         case "decrease":
    //             {
    //                 if (formik.values.negativeMark > 1) {
    //                     const negMark = formik.values.negativeMark - 1;
    //                     formik.setFieldValue("negativeMark", negMark)
    //                 }
    //             }
    //             break;
    //     }
    // }

    return {
        formik,
        // handleUpdateMaxMarks,
        // handleUpdateNegMarks
    }
}

export interface TestTopicQuestionI {
    question: string;
    questionImage?: string;
    option1: string;
    option1Image?: string;
    option2: string;
    option2Image?: string;
    option3: string;
    option3Image?: string;
    option4: string;
    option4Image?: string;
    option5: string;
    option5Image?: string;
    answer: string;
}

interface TestSeriesI {
    topicName: string,
    topicQuestions: TestTopicQuestionI[]
}

export interface TestSeriesFormVal {
    topics: TestSeriesI[]
}

export interface TestSeriesStepInitValI extends TestSeriesFormVal {
    maximumMark: number,
    negativeMark: number,
    categoryType: string,
    testTime: number
}

// interface TestSeriesAPIDataI {
//     categoryType: "Syllabus" | "Subject" | "Topic",
//     topics: TestSeriesI[]
// }