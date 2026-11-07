import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
// import { distributePercentageToTrueValues } from "@/helper/pricing.helper";
// import { handleCoursePercentage } from "@/services/course.service";
import { handleCompetitionExamById } from "@/services/gov-exam.service";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import type { createExamI } from "../../course-form";
import type { DateValue } from "@react-types/calendar";

const initValTest: createExamI = {
    examName: "",
    examPrice: "",
    totalExamTime: "",
    marksPerQuestion: "",
    negativeMarkings: 0,
    scheduleDate: null as DateValue | null,
    scheduleTime: null,
    testSeries: []
}


// const initialValues: CourseDetailsI = {
//     _id: "",
//     category: {
//         _id: "",
//         name: "",
//         type: ""
//     },
//     subcategory: {
//         _id: "",
//         name: "",
//         type: ""
//     },
//     courseImages: "",
//     ebook: [],
//     courseName: "",
//     courseDescription: "",
//     courseValidity: null,
//     coursePrice: null,
//     studyNotes: [],
//     videoLectures: [],
//     testSeries: [],
//     status: "",
//     maximumMark: null,
//     negativeMark: null,
//     totalTopicCount: null,
//     categoryType: "",
//     ebookPercentage: "",
//     notePercentage: "",
//     videoPercentage: "",
//     testPercentage: ""
// }

export default function UseCourseDetails() {
    const { slug } = useParams();
    // const [percentageError, setPercentageError] = useState("");
    // const [isEditable, setIsEditable] = useState(false);

    const formik = useFormik<createExamI>({
        initialValues: initValTest,
        onSubmit: () => { }
        // onSubmit: handleSubmitPercentage
    })

    // set percentage
    // async function handleSubmitPercentage(val: createExamI) {
    // const ebookPercentage = Number(val?.ebookPercentage);
    // const notePercentage = Number(val?.notePercentage);
    // const videoPercentage = Number(val?.videoPercentage);
    // const testPercentage = Number(val?.testPercentage);
    // const totalPricePercentage = testPercentage + videoPercentage + notePercentage + ebookPercentage;
    // console.log(testPercentage, videoPercentage, notePercentage, ebookPercentage);

    // if (totalPricePercentage > 100 || totalPricePercentage < 100) {
    //     // error
    //     setPercentageError("total must be 100%");
    // } else {
    //     setPercentageError("");
    //     setIsEditable(false)
    //     try {
    //         const bodyData = {};
    //         if (ebookPercentage) Object.assign(bodyData, { ebookPercentage });
    //         if (notePercentage) Object.assign(bodyData, { notePercentage });
    //         if (videoPercentage) Object.assign(bodyData, { videoPercentage });
    //         if (testPercentage) Object.assign(bodyData, { testPercentage });
    //         if (slug && slug !== "create-course") {
    //             await handleCoursePercentage(slug, bodyData);
    //         }
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    // }

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;

    //     if (value === '') {
    //         formik.setFieldValue(name, '');
    //         return;
    //     }

    //     const num = parseInt(value, 10);
    //     if (!isNaN(num)) {
    //         if (num < 1) {
    //             formik.setFieldValue(name, 1);
    //         } else if (num > 100) {
    //             formik.setFieldValue(name, 100);
    //         } else {
    //             formik.setFieldValue(name, num);
    //         }
    //     }
    // };

    // const preventInvalidKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (['e', 'E', '+', '-', '.'].includes(e.key)) {
    //         e.preventDefault();
    //     }
    // };

    // get study notes details
    async function getStudyNotes(id: string) {
        try {
            const resp = await handleCompetitionExamById(id);
            const data = resp?.data?.data;
            if (data?.examName) formik.setFieldValue("examName", data?.examName);
            if (data?.examPrice) formik.setFieldValue("examPrice", data?.examPrice);
            if (data?.totalExamTime) formik.setFieldValue("totalExamTime", data?.totalExamTime);
            if (data?.marksPerQuestion) formik.setFieldValue("marksPerQuestion", data?.marksPerQuestion);
            if (data?.negativeMarkings) formik.setFieldValue("negativeMarkings", data?.negativeMarkings);
            if (data?.scheduleTime) formik.setFieldValue("scheduleTime", data?.scheduleTime);
            // if (data?.courseDescription) formik.setFieldValue("courseDescription", data?.courseDescription);
            if (data?._id) formik.setFieldValue("_id", data?._id);
            // if (data?.categoryType) formik.setFieldValue("categoryType", data?.categoryType);
            // if (data?.subject?._id) formik.setFieldValue("subject", data?.subject?._id);
            if (data?.scheduleDate) formik.setFieldValue("scheduleDate", (data?.scheduleDate));
            if(data?.testSeries) formik.setFieldValue("testSeries", data?.testSeries);
            // const countObj = {
            //     ebook: false,
            //     studyNotes: false,
            //     videoLectures: false,
            //     testSeries: false
            // };
            // get count of parts
            // if (data?.ebook) {
            //     countObj["ebook"] = true;
            // }
            // if (data?.studyNotes) {
            //     countObj["studyNotes"] = true;
            // }
            // if (data?.videoLectures.length > 0) {
            //     countObj["videoLectures"] = true;
            // }
            // if (data?.testSeries.length > 0) {
            //     countObj["testSeries"] = true;
            // }

            // if (data?.ebookPercentage || data?.notePercentage || data?.testPercentage || data?.videoPercentage) {
            //     if (data?.ebookPercentage) formik.setFieldValue("ebookPercentage", data?.ebookPercentage);
            //     if (data?.notePercentage) formik.setFieldValue("notePercentage", data?.notePercentage);
            //     if (data?.testPercentage) formik.setFieldValue("testPercentage", data?.testPercentage);
            //     if (data?.videoPercentage) formik.setFieldValue("videoPercentage", data?.videoPercentage);
            // } else {
            //     const theirPercentages = distributePercentageToTrueValues(countObj);
            //     if (theirPercentages?.ebook) formik.setFieldValue("ebookPercentage", theirPercentages?.ebook);
            //     if (theirPercentages?.studyNotes) formik.setFieldValue("notePercentage", theirPercentages?.studyNotes);
            //     if (theirPercentages?.videoLectures) formik.setFieldValue("videoPercentage", theirPercentages?.videoLectures);
            //     if (theirPercentages?.testSeries) formik.setFieldValue("testPercentage", theirPercentages?.testSeries);
            // }

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

    return {
        formik,
        // handleInputChange,
        // preventInvalidKey,
        // percentageError,
        // isEditable,
        // setIsEditable
    }
}

interface categoryType {
    _id: string,
    name: string,
    type: string
}

export interface CourseDetailsI {
    _id: string,
    category: categoryType,
    categoryType: string,
    subcategory: categoryType,
    courseImages: string,
    ebook: {
        categoryType: string,
        ebooks: []
    }[],
    courseName: string,
    courseDescription: string,
    courseValidity: number | null,
    coursePrice: number | null,
    studyNotes: {
        categoryType: string,
        notes: []
    }[],
    videoLectures: {
        categoryType: string,
        lectures: []
    }[],
    testSeries: {
        categoryType: string,
        topics: []
    }[],
    status: string,
    maximumMark: number | null,
    negativeMark: number | null,
    totalTopicCount: number | null,
    "ebookPercentage": string,
    "notePercentage": string,
    "videoPercentage": string,
    "testPercentage": string
}