import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { skillOverviewDetails } from "@/services/refer.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initInfo: SkillOverviewI = {
    balance: 0,
    totalCourses: 0,
    totalUsers: 0
}

export default function useSkillOverview() {
    const [overviewInfo, setOverviewInfo] = useState<SkillOverviewI>(initInfo);

    useEffect(() => {
        async function handleGetSkillOverview() {
            try {
                const resp = await skillOverviewDetails();
                setOverviewInfo(resp?.data?.data || initInfo);
            } catch (error) {
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err);
            }
        }
        handleGetSkillOverview();
    }, [])

    return { overviewInfo }
}

interface SkillOverviewI {
    balance: number;
    totalCourses: number;
    totalUsers: number;
}