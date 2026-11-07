import axiosInstance from "@/config/axios-instance"

export const getAllBundles = async () => {
    return axiosInstance.get(`/v1/UserBundles`)
}

export const getByIdBundles = async (id: string) => {
    return axiosInstance.get(`/v1/UserBundles/${id}`)
}

export const getByIdCourseDetails = async (id: string) => {
    return axiosInstance.get(`/v1/SkillCourse/UserById/${id}`)
}


export const buyBundle = async (data: bundleBuyPayload) => {
    return axiosInstance.post(`/v1/SkillBundle/buyBundlePayment`, data)
}

export interface bundleBuyPayload {
    BundleId: string;
    amount: number;
}