import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { getPurchasedCourses } from "@/services/my-learning.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useSkillMyLearning() {
    const [skillPurchasedCourseList, setSkillPurchasedCourseList] = useState<SkillPurchasedCoursesI[]>([]);

    async function handleGetPurchasedCourses() {
        try {
            const resp = await getPurchasedCourses();
            setSkillPurchasedCourseList(resp?.data?.data || []);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        handleGetPurchasedCourses()
    }, [])


    return {
        skillPurchasedCourseList
    }
}

interface SkillPurchasedCoursesI {
    _id: string;
    SkillcourseImages: string;
    SkillName: string;
    bundle: {
        bundleId: string;
        bundleName: string;
    }
}