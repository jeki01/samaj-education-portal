import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { handleWalletPrice } from "@/helper/course-pricing.helper";
import { formatNumber } from "@/helper/global.helper";
import { enrollNowForTest, scheduleTestExam } from "@/services/competition.service";
import { referDetails } from "@/services/purchase.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

export default function UseCompetition() {
    const [currentTab, setCurrentTab] = useState("scheduled");
    const [scheduleListData, setScheduleListData] = useState<scheduleListI[]>([]);
    const [currentSelectedTest, setCurrentSelectedTest] = useState<null | currentSelectedTestI>(null);
    const [searchParams] = useSearchParams();
    const [walletBalance, setWalletBalance] = useState(0);

    async function handleScheduleListData() {
        try {
            const data = await scheduleTestExam();
            setScheduleListData(data?.data)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong!");
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        handleScheduleListData();
        getWalletBalance();
    }, [])

    async function getWalletBalance() {
        try {
            const resp = await referDetails();
            setWalletBalance(resp?.data?.earning);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong!");
            checkAuthUserHelper(err);
        }
    }


    const handleEnrollNow = async (onClose: () => void) => {
        const referId = searchParams.get("referId");
        const testId = searchParams.get("testId");

        const testPrice = Number(currentSelectedTest?.testPrice) || 0;
        const walletUsed = handleWalletPrice(testPrice, walletBalance);
        const payableAmount = testPrice - walletUsed;
        const finalAmount = Number(formatNumber(payableAmount)) || 0;

        try {
            if (referId && testId) {
                const data = await enrollNowForTest({
                    testId: currentSelectedTest?.id || "",
                    paymentstatus: true,
                    amount: finalAmount,
                    userreferId: referId,
                    testreferId: testId,
                    walletBalance: walletUsed
                })
                if (data?.paymentUrl && data?.paymentUrl !== null) {
                    window.open(data?.paymentUrl, "_blank");
                } else {
                    toast.success(data?.message || "enrolled successfully!");
                }
            } else {
                const data = await enrollNowForTest({
                    testId: currentSelectedTest?.id || "",
                    paymentstatus: true,
                    amount: finalAmount,
                    walletBalance: walletUsed
                })
                if (data?.paymentUrl && data?.paymentUrl !== null) {
                    window.open(data?.paymentUrl, "_blank");
                } else {
                    toast.success(data?.message || "enrolled successfully!");
                }
            }
            onClose();
            handleScheduleListData();
        } catch (error) {
            toast.error("something went wrong!");
            const err = error as ErrResp;
            checkAuthUserHelper(err);
        }
    }

    const handleSetCurrTestDetails = (details: currentSelectedTestI) => {
        setCurrentSelectedTest(details)
    }


    return {
        currentTab,
        setCurrentTab,
        scheduleListData,
        handleEnrollNow,
        handleSetCurrTestDetails,
        currentSelectedTest,
        walletBalance
    }
}


export interface scheduleListI {
    _id: string;
    examName: string;
    examPrice: string;
    marksPerQuestion: string;
    negativeMarkings: string;
    scheduleDate: string;
    scheduleTime: string;
    totalExamTime: string;
    status: string;
    purchased: boolean;
    testSeriesId: string;
    completed: boolean;
    percentage: number;
    totalQuestions: number;
    correct: number;
}

export interface currentSelectedTestI {
    id: string;
    testName: string;
    testPrice: string;
}