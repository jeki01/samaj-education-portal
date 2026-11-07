import axiosInstance from "@/config/axios-instance"

export const scheduleTestExam = async () => {
    const response = await axiosInstance.get(`/v1/UserScheduleTests`);
    return response.data;
}

export const enrollNowForTest = async (data: CompleteTestParams) => {
    const response = await axiosInstance.post(`/v1/buyTest`, data);
    return response.data;
}

export const getCompetitionDetailsById = async (id: string) => {
    const response = await axiosInstance.get(`/v1/getschduleTest/${id}`);
    return response.data;
}

export const reportChatMsg = async (testId: string, msgId: string) => {
    const response = await axiosInstance.post(`/v1/chat/report/${testId}/${msgId}`, {});
    return response.data;
}

interface CompleteTestParams {
    testId: string;
    paymentstatus: boolean;
    amount: number;
    userreferId?: string;
    testreferId?: string;
    walletBalance: number;
}