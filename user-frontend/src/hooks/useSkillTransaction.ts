import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { skillTxnHistory } from "@/services/refer.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useSkillTransaction() {
    const [skillTcnHistoryList, setSkillTcnHistoryList] = useState<SkillTxnHistoryI[]>([]);
    useEffect(() => {
        async function handleSkillTxnHistory() {
            try {
                const resp = await skillTxnHistory();
                setSkillTcnHistoryList(resp?.data?.data || []);
            } catch (error) {
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err);
            }
        }
        handleSkillTxnHistory()
    }, [])

    return {
        skillTcnHistoryList
    }
}

interface SkillTxnHistoryI {
    _id: string,
    BundleId: {
        _id: string,
        BundleName: string,
        price: string
    },
    userId: string,
    amount: number,
    merchantOrderId: string,
    transactionId: string,
    paymentStatus: string,
    paymentMode: string
}