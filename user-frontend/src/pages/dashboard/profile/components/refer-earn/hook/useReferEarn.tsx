import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { referDetails } from "@/services/purchase.service";
import { getBoughtCourseList, getReferralUserList } from "@/services/refer.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialVal: referDetailsI = {
    count: 0,
    earning: 0
}

export default function UseReferEarn() {
    const [referDetailsData, setReferDetailsData] = useState(initialVal);
    const [boughtCourseList, setBoughtCourseList] = useState<{ id: string, label: string, type: "course" | "test" }[]>([]);
    const [referCount, setReferCount] = useState(0);
    const [courseId, setCourseId] = useState("");
    const [referType, setReferType] = useState<"course" | "test">("course");

    async function handleReferDetails() {
        try {
            const resp = await referDetails();
            setReferDetailsData(resp?.data)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        handleReferDetails()
        handleBoughtCourseList()
    }, [])


    // 
    async function handleBoughtCourseList() {
        try {
            const resp = await getBoughtCourseList();
            const courseNames = resp?.data?.courses;
            setBoughtCourseList(courseNames.map((course: { id: string, courseName?: string, examName?: string }) => ({
                id: course.id,
                label: course?.courseName || course?.examName,
                type: course?.courseName ? "course" : "test"
            })));
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    async function handleReferCount(courseId: string, referTypeParam: "course" | "test") {
        setReferType(referTypeParam);
        if (courseId) {
            setCourseId(courseId);
            try {
                const resp = await getReferralUserList(referTypeParam === "test" ? undefined : courseId, referTypeParam === "test" ? courseId : undefined);
                setReferCount(resp?.data?.count);
            } catch (error) {
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err);
            }
        } else {
            setReferCount(0)
        }
    }

    return {
        referDetailsData,
        boughtCourseList,
        handleReferCount,
        referCount,
        courseId,
        referType
    }
}

interface referDetailsI {
    count: number,
    earning: number
}