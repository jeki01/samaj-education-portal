import axiosInstance from "@/config/axios-instance"

export const handleGetProfileDetails = () => {
    return axiosInstance.get("/v1/userProfile")
}

export const handleChangePass = (data: ChangePassData) => {
    return axiosInstance.put("/v1/changePassword", data)
}

export interface ChangePassData {
    "password": string,
    "confirmPassword": string
}
