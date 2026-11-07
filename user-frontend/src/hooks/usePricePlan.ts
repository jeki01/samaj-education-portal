import type { ErrResp } from "@/config/axios-instance";
import { AuthContext } from "@/context/AuthContext";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { buyBundle, getAllBundles, type bundleBuyPayload } from "@/services/bundle.service";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function usePricePlan() {
    const slug = useParams();
    const [bundleList, setBundleList] = useState<BundleList[]>([]);
    const { verify } = useContext(AuthContext);

    async function handleGetAllPlans() {
        try {
            const resp = await getAllBundles();
            setBundleList(resp?.data?.data || []);

        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        handleGetAllPlans()
    }, [])

    async function handleBuyPlan(data: bundleBuyPayload) {
        try {
            const resp = await buyBundle(data);
            toast.success(resp?.data?.message);
            handleGetAllPlans();
            verify();
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }


    return {
        slug,
        bundleList,
        handleBuyPlan
    }
}

export interface BundleList {
    _id: string,
    BundleName: string,
    BundleImages: string,
    tagline: string,
    price: string,
    description: string,
    SkillCourseId: string[],
    createdAt: string,
    updatedAt: string,
    __v: 0,
    TimeInMinutes: number,
    TimeInHours: string,
    status: "Activated" | "Buy" | "Upgrade",
    discountPrice: number,
    names: string
}