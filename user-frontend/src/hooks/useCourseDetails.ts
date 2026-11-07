import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { getByIdCourseDetails } from "@/services/bundle.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function useCourseDetails() {
    // getByIdCourseDetails
    const slug = useParams();
    const [courseDetails, setCourseDetails] = useState(initCourseDetailsVal);

    async function handleGetCourseDetails() {
        try {
            const resp = await getByIdCourseDetails(slug?.id || "");
            setCourseDetails(resp?.data?.data || initCourseDetailsVal);

        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        handleGetCourseDetails()
    }, [])
    return {
        courseDetails
    }
}

const initCourseDetailsVal: CourseDetailsI = {
    _id: "",
    SkillName: "",
    SkillcourseImages: "",
    tagline: "",
    ebook: "",
    About: "",
    lectures: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
    TimeInMinutes: 0,
    TimeInHours: ""
}


export interface CourseDetailsI {
    _id: string,
    SkillName: string,
    SkillcourseImages: string,
    tagline: string,
    ebook: string,
    About: string,
    lectures: {
        _id: string,
        name: string,
    }[],
    createdAt: string,
    updatedAt: string,
    __v: 0,
    TimeInMinutes: number,
    TimeInHours: string
}