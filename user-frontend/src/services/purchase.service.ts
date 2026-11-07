import axiosInstance from "@/config/axios-instance"

export const buyCourseApi = (data: buyCourseBodyData) => {
    return axiosInstance.post("/v1/buy", data)
}

export const purchaseHistory = () => {
    return axiosInstance.get("/v1/buy")
}

export const referDetails = () => {
    return axiosInstance.get("/v1/refercount")
}

export const getPaymentDetails = (orderId: string) => {
    return axiosInstance.get(`/v1/buy/check-status/${orderId}`)
}

interface buyCourseBodyData {
    "courseId": string,
    "paymentstatus": boolean,
    "ebook": boolean,
    "studyNotes": boolean,
    "videoLectures": number,
    "testseries": number,
    "walletBalance": number,
    userreferId?: string,
    coursereferId?: string,
    amount: number
}