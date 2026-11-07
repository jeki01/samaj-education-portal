import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { referralList } from "@/services/refer.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useReferralTable() {
    const [referralTableList, setReferralTableList] = useState<ReferralDetailsI[]>([]);

    useEffect(() => {
        async function handleGetReferralList() {
            try {
                const resp = await referralList();
                setReferralTableList(resp?.data?.data || []);
            } catch (error) {
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err);
            }
        }
        handleGetReferralList();
    }, [])

    return { referralTableList }
}


interface ReferralDetailsI {
    bundleName: string;
    email: string;
    status: string;
    commissionAmount: number;
    name: string;
}