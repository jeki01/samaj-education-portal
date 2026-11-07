import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { purchaseHistory } from "@/services/purchase.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UseTransactionHistory() {
    const [tnxList, setTnxList] = useState<TnxHistoryData[]>([])

    async function handleTnxHistory() {
        try {
            const resp = await purchaseHistory();
            setTnxList(resp?.data?.data);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        handleTnxHistory()
    }, [])


    return {
        tnxList
    }
}


export interface TnxHistoryData {
    "_id": string,
    "userId": string,
    "courseId": {
        "_id": string,
        "courseName": string,
        "courseValidity": number,
        "coursePrice": number
    },
    "paymentstatus": true,
    "createdBy": string,
    "createdAt": string,
    "updatedAt": string,
    "orderId": string,
    "status": string
}