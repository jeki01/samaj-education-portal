import { getPurchasedCourse } from "@/services/my-learning.service";
import { useEffect, useState } from "react";
import type { PurchasedCoursesI } from "../learning.type";
import type { ErrResp } from "@/config/axios-instance";
import { toast } from "react-toastify";
import { checkAuthUserHelper } from "@/helper/auth.helper";

export default function UsePurchasedCourse() {
    const [purchasedCourseList, setPurchasedCourseList] = useState<PurchasedCoursesI[]>([]);

    async function handleGetPurchased(category?: string, subcategory?: string, sortBy?: string, sortbystatus?: string, sortbyDate?:string) {
        try {
            if (subcategory === "all") {
                const resp = await getPurchasedCourse(category, undefined, sortBy, sortbystatus, sortbyDate);
                setPurchasedCourseList(resp?.data?.data)
            } else {
                const resp = await getPurchasedCourse(category, subcategory, sortBy, sortbystatus, sortbyDate);
                setPurchasedCourseList(resp?.data?.data)
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        handleGetPurchased()
    }, [])

    return {
        purchasedCourseList,
        handleGetPurchased
    }
}

