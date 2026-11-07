import type { ErrResp } from "@/config/axios-instance";
import { AuthContext } from "@/context/AuthContext";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { buyBundle, getByIdBundles, type bundleBuyPayload } from "@/services/bundle.service";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function useBundleDetails() {
    const slug = useParams();
    const [bundleDetails, setBundleDetails] = useState(initBundleDetailsVal);
    const { verify } = useContext(AuthContext);

    async function handleGetAllPlans() {
        try {
            const resp = await getByIdBundles(slug?.id || "");
            setBundleDetails(resp?.data?.data || initBundleDetailsVal);

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
        bundleDetails,
        handleBuyPlan
    }
}

const initBundleDetailsVal: BundleDetailsI = {
    _id: "",
    BundleName: "",
    BundleImages: "",
    tagline: "",
    price: "",
    description: "",
    SkillCourseId: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
    TimeInMinutes: 0,
    TimeInHours: "",
    status: "Buy"
}

export interface BundleDetailsI {
    _id: string,
    BundleName: string,
    BundleImages: string,
    tagline: string,
    price: string,
    description: string,
    SkillCourseId: {
        _id: string,
        SkillcourseImages: string,
        SkillName: string
    }[],
    createdAt: string,
    updatedAt: string,
    __v: 0,
    TimeInMinutes: number,
    TimeInHours: string,
    status: "Activated" | "Buy" | "Upgrade",
}