import { getComplimentaryCourseDetailsById, getPurchasedCourseDetailsById } from "@/services/my-learning.service";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import type { PurchasedCoursesI } from "../../my-learning/learning.type";
import type { ErrResp } from "@/config/axios-instance";
import { toast } from "react-toastify";
import { checkAuthUserHelper } from "@/helper/auth.helper";

export default function UsePurchasedCourseDetails() {
    const slug = useParams();
    const [purchasedCourseDetails, setPurchasedCourseDetails] = useState<PurchasedCoursesI>(initialVal);
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    async function handleGetCourseDetails(id: string) {
        try {
            if (type === "complimentary") {
                // Handle complimentary course details
                const resp = await getComplimentaryCourseDetailsById(id);
                setPurchasedCourseDetails(resp?.data)
            } else {
                const resp = await getPurchasedCourseDetailsById(id);
                setPurchasedCourseDetails(resp?.data)
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        if (slug?.courseId) {
            handleGetCourseDetails(slug?.courseId)
        }
    }, [slug?.courseId])

    return {
        purchasedCourseDetails
    }
}

const initialVal: PurchasedCoursesI = {
    _id: "",
    category: {
        _id: "",
        name: "",
        type: "",
        parent: "",
        createdBy: "",
        createdAt: "",
        updatedAt: ""
    },
    subcategory: {
        _id: "",
        name: "",
        type: "",
        parent: "",
        createdBy: "",
        createdAt: "",
        updatedAt: ""
    },
    courseImages: "",
    ebook: "",
    studyNotes: "",
    courseName: "",
    courseDescription: "",
    courseValidity: 0,
    coursePrice: 0,
    categoryType: "",
    videoLectures: [],
    testSeries: [],
    ebookPrice: 0,
    notePrice: 0,
    videoPrice: 0,
    testPrice: 0,
    status: "",
    createdBy: "",
    createdAt: "",
    updatedAt: "",
    maximumMark: 0,
    negativeMark: 0,
    testTime: 0,
    ebookPercentage: 0,
    notePercentage: 0,
    testPercentage: 0,
    videoPercentage: 0,
    subject: {
        _id: "",
        category: "",
        subcategory: "",
        name: "",
        createdBy: "",
        createdAt: "",
        updatedAt: ""
    },
    overallProgress: 0,
    referName: "",
    expireStatus: false
}