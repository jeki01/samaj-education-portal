import axiosInstance from "@/config/axios-instance";

export const getReferralUserList = (courseId?: string, testreferId?: string) => {
    const params = new URLSearchParams();
    if (courseId) params.append("coursereferId", courseId);
    if (testreferId) params.append("testreferId", testreferId);
    return axiosInstance.get(`/v1/get-user-details?${params.toString()}`);
}

export const getBoughtCourseList = () => {
    return axiosInstance.get(`/v1/courseNames`);
}

// Skills

export const skillOverviewDetails = () => {
    return axiosInstance.get(`/v1/SkillBundle/my-Skillwallet`);
}

export const referralList = () => {
    return axiosInstance.get(`/v1/SkillBundle/my-referrer-details`);
}

export const skillTxnHistory = () => {
    return axiosInstance.get(`/v1/SkillBundle/my-payment-history`)
}