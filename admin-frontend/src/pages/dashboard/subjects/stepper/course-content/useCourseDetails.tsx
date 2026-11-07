import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { distributePercentageToTrueValues } from "@/helper/pricing.helper";
import { handleCoursePercentage } from "@/services/course.service";
import { handleGovCourseById } from "@/services/gov-exam.service";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";


const initialValues: CourseDetailsI = {
    _id: "",
    category: {
        _id: "",
        name: "",
        type: ""
    },
    subcategory: {
        _id: "",
        name: "",
        type: ""
    },
    courseImages: "",
    ebook: [],
    courseName: "",
    courseDescription: "",
    courseValidity: null,
    coursePrice: null,
    studyNotes: [],
    videoLectures: [],
    testSeries: [],
    status: "",
    maximumMark: null,
    negativeMark: null,
    totalTopicCount: null,
    categoryType: "",
    ebookPercentage: "",
    notePercentage: "",
    videoPercentage: "",
    testPercentage: ""
}

export default function UseCourseDetails() {
    const { slug } = useParams();
    const [percentageError, setPercentageError] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    const formik = useFormik<CourseDetailsI>({
        initialValues,
        onSubmit: handleSubmitPercentage
    })

    // set percentage
    async function handleSubmitPercentage(val: CourseDetailsI) {
        const ebookPercentage = Number(val?.ebookPercentage);
        const notePercentage = Number(val?.notePercentage);
        const videoPercentage = Number(val?.videoPercentage);
        const testPercentage = Number(val?.testPercentage);
        const totalPricePercentage = testPercentage + videoPercentage + notePercentage + ebookPercentage;
        console.log(testPercentage, videoPercentage, notePercentage, ebookPercentage);

        if (totalPricePercentage > 100 || totalPricePercentage < 100) {
            // error
            setPercentageError("total must be 100%");
        } else {
            setPercentageError("");
            setIsEditable(false)
            try {
                const bodyData = {};
                if (ebookPercentage) Object.assign(bodyData, { ebookPercentage });
                if (notePercentage) Object.assign(bodyData, { notePercentage });
                if (videoPercentage) Object.assign(bodyData, { videoPercentage });
                if (testPercentage) Object.assign(bodyData, { testPercentage });
                if (slug && slug !== "create-course") {
                    await handleCoursePercentage(slug, bodyData);
                }
            } catch (error) {
                console.log(error);

            }
        }

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (value === '') {
            formik.setFieldValue(name, '');
            return;
        }

        const num = parseInt(value, 10);
        if (!isNaN(num)) {
            if (num < 1) {
                formik.setFieldValue(name, 1);
            } else if (num > 100) {
                formik.setFieldValue(name, 100);
            } else {
                formik.setFieldValue(name, num);
            }
        }
    };

    const preventInvalidKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
            e.preventDefault();
        }
    };

    // get study notes details
    async function getStudyNotes(id: string) {
        try {
            const resp = await handleGovCourseById(id);
            const data = resp?.data?.data;
            formik.setFieldValue("maximumMark", data?.maximumMark);
            formik.setFieldValue("negativeMark", data?.negativeMark);
            formik.setFieldValue("courseImages", data?.courseImages);
            formik.setFieldValue("courseName", data?.courseName);
            formik.setFieldValue("courseValidity", data?.courseValidity);
            formik.setFieldValue("coursePrice", data?.coursePrice);
            formik.setFieldValue("courseDescription", data?.courseDescription);

            formik.setFieldValue("ebook", data?.ebook);
            formik.setFieldValue("studyNotes", data?.studyNotes);
            formik.setFieldValue("videoLectures", data?.videoLectures);
            formik.setFieldValue("testSeries", data?.testSeries);
            formik.setFieldValue("totalTopicCount", data?.totalTopicCount);
            formik.setFieldValue("categoryType", data?.categoryType);
            const countObj = {
                ebook: false,
                studyNotes: false,
                videoLectures: false,
                testSeries: false
            };
            // get count of parts
            if (data?.ebook) {
                countObj["ebook"] = true;
            }
            if (data?.studyNotes) {
                countObj["studyNotes"] = true;
            }
            if (data?.videoLectures.length > 0) {
                countObj["videoLectures"] = true;
            }
            if (data?.testSeries.length > 0) {
                countObj["testSeries"] = true;
            }

            if (data?.ebookPercentage || data?.notePercentage || data?.testPercentage || data?.videoPercentage) {
                if (data?.ebookPercentage) formik.setFieldValue("ebookPercentage", data?.ebookPercentage);
                if (data?.notePercentage) formik.setFieldValue("notePercentage", data?.notePercentage);
                if (data?.testPercentage) formik.setFieldValue("testPercentage", data?.testPercentage);
                if (data?.videoPercentage) formik.setFieldValue("videoPercentage", data?.videoPercentage);
            } else {
                const theirPercentages = distributePercentageToTrueValues(countObj);
                if (theirPercentages?.ebook) formik.setFieldValue("ebookPercentage", theirPercentages?.ebook);
                if (theirPercentages?.studyNotes) formik.setFieldValue("notePercentage", theirPercentages?.studyNotes);
                if (theirPercentages?.videoLectures) formik.setFieldValue("videoPercentage", theirPercentages?.videoLectures);
                if (theirPercentages?.testSeries) formik.setFieldValue("testPercentage", theirPercentages?.testSeries);
            }

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
        handleInputChange,
        preventInvalidKey,
        percentageError,
        isEditable,
        setIsEditable
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