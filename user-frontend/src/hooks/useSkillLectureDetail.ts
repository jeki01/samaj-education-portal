
import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { getAssessmentScore, getPurchasedCoursesById, markAsReadLearning, type MarkAsReadPayload } from "@/services/my-learning.service";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export default function useSkillLectureDetail() {
    const [courseTab, setCourseTab] = useState("e-book");
    const slug = useParams();
    const [searchParams] = useSearchParams();
    const [courseDetails, setCourseDetails] = useState<CourseDetailsI>(courseDetailsIniVal);
    const [lectureDetails, setLectureDetails] = useState<LectureDetailsI>(lectureIniVal);
    const navigate = useNavigate();
    const [assessmentScore, setAssessmentScore] = useState<AssessmentScoreI>(assessmentIniVal);

    const handleChangeCourseTab = (tab: string) => { setCourseTab(tab) };

    const handleSetLectureDetails = (item: LectureDetailsI) => {
        setLectureDetails(item)
    }

    const handleGetCourseDetails = useCallback(async () => {
        try {
            const resp = await getPurchasedCoursesById(slug?.courseId || "");
            setCourseDetails(resp?.data?.data || courseDetailsIniVal);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }, [slug?.courseId])

    async function handleMarkAsRead(type: "lecture" | "ebook") {
        try {
            const payload: MarkAsReadPayload = {
                type,
                CourseId: slug?.courseId || "",
                BundleId: courseDetails?.bundle?.bundleId
            }
            if (type === "lecture") Object.assign(payload, { LectureId: lectureDetails?._id });
            const resp = await markAsReadLearning(payload);
            toast.success(resp?.data?.message);
            handleGetCourseDetails();
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        async function handleGetAssessmentScore() {
            try {
                const resp = await getAssessmentScore(courseDetails?.bundle?.bundleId, slug?.courseId || "");
                const isEmpty = Object.keys(resp?.data?.data).length === 0;
                setAssessmentScore(isEmpty ? assessmentIniVal : resp?.data?.data);
            } catch (error) {
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err);
            }
        }
        if (courseDetails?.bundle?.bundleId && slug?.courseId) {
            handleGetAssessmentScore()
        }
    }, [courseDetails?.bundle?.bundleId, slug?.courseId])



    useEffect(() => {
        function handleUpdateActiveTab() {
            const currTab = searchParams.get("tab") || "e-book";
            setCourseTab(currTab)
        }
        if (searchParams.get("tab")) {
            handleUpdateActiveTab()
        }
    }, [searchParams])




    useEffect(() => {
        if (slug?.courseId) {
            handleGetCourseDetails()
        }
    }, [slug?.courseId, handleGetCourseDetails])


    function handleTakeAssessment() {
        navigate(`/my-learning-test/${courseDetails?._id}/${courseDetails?.bundle?.bundleId}`);
    }


    return {
        courseTab,
        handleChangeCourseTab,
        courseDetails,
        handleSetLectureDetails,
        lectureDetails,
        handleTakeAssessment,
        assessmentScore,
        handleMarkAsRead
    }
}

export const courseDetailsIniVal: CourseDetailsI = {
    _id: "",
    SkillcourseImages: "",
    SkillName: "",
    ebook: "",
    isReadEbook: false,
    lectures: [],
    assessment: [],
    bundle: {
        bundleId: "",
        bundleName: ""
    }
}

export const lectureIniVal: LectureDetailsI = {
    name: "",
    link: "",
    time: "",
    about: "",
    isReadLecture: "",
    _id: ""
}

export const assessmentIniVal: AssessmentScoreI = {
    percentage: null
}

export interface AssessmentScoreI {
    percentage: number | null;
}

export interface LectureDetailsI {
    _id: string;
    name: string;
    link: string;
    time: string;
    about: string;
    isReadLecture: string;
}

export interface CourseDetailsI {
    _id: string;
    SkillcourseImages: string;
    SkillName: string;
    ebook: string;
    isReadEbook: boolean;
    lectures: LectureDetailsI[];
    assessment: {
        question: string,
        option1: string,
        option2: string,
        option3: string,
        option4: string,
        option5: string,
        answer: string,
        _id: string
    }[];
    bundle: {
        bundleId: string,
        bundleName: string
    }
}