import axiosInstance from "@/config/axios-instance"

export const checkAuthUser = () => {
    return axiosInstance.get("/auth/verify-token")
}

// signup
export const handleRegister = (data: handleRegisterData) => {
    return axiosInstance.post("/v1/registerStudent", data)
}

// verifyOTP
export const handleVerifyOtp = (data: handleVerifyOtpData) => {
    return axiosInstance.post("/v1/verifyOTP", data)
}

// verify OTP verifyEmailOTP
export const handleVerifyOtpEmail = (data: handleVerifyOtpData) => {
    return axiosInstance.post("/v1/verifyEmailOTP", data)
}

// login
export const handleLogin = (data: handleLoginData) => {
    return axiosInstance.post("/v1/login", data)
}

// get verificationStatus
export const handleVerificationStatus = (id: string) => {
    return axiosInstance.get("/v1/verificationStatus/" + id)
}

// complete profile
export const handleCompeleteProfile = (data: handleCompleteProfile, id: string) => {
    return axiosInstance.put(`/v1/updateProfile/${id}`, data)
}

// resend otp
export const handleResendOtp = (data: handleResendOtpData) => {
    return axiosInstance.post("/v1/resend-otp", data)
}

// get gov exam list 
export const handleExamList = () => {
    return axiosInstance.get("/v1/getCategory")
}


// final submit saveUserCategory
export const handleSubmitSaveUserCategory = (data: handleSubmitSaveUserCategoryData) => {
    return axiosInstance.put("/v1/saveUserCategory", data)
}

// forget password
export const handleForgetPassword = (data: handleLoginData) => {
    return axiosInstance.post("/v1/forget-otp", data)
}

export const handleForgotOTPLogin = (data: handleVerifyOtpData) => {
    return axiosInstance.post("/v1/verifyOtpAndLogin", data)
}

export const handleGetUserAccountMode = async () => {
    return axiosInstance.get(`v1/LoggedInUser`)
}

export const accountSwitch = async (data: { examType: "exam" | "skills" }) => {
    return axiosInstance.put(`/v1/updateExamType`, data)
}

// ====== types =====

interface handleRegisterData extends handleLoginData {
    "studentType"?: string,
    "examType"?: string,
    id?: string,
    refer?: string,
}

interface handleVerifyOtpData {
    "mobileNo"?: string,
    "otp": string,
    "email"?: string
}


export interface handleLoginData {
    mobileNo?: string,
    email?: string,
    type?: string,
    password?: string,
    userreferId?: string,
    coursereferId?: string,
    testreferId?: string,
    Userskillreferid?: string
}

interface handleCompleteProfile {
    "firstName"?: string,
    "middleName"?: string,
    "lastName"?: string,
    "country"?: string,
    "state"?: string,
    "city"?: string,
    "pincode"?: string
}

interface handleResendOtpData {
    type: string,
    userId: string
}

interface handleSubmitSaveUserCategoryData {
    "userId": string,
    "categoryId": string
}