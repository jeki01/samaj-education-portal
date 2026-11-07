export const ENDPOINTS = {
    login: "/auth/login",
    verifyOTP: "/auth/verify-otp",
    locations: "/v1/getlocation",
    students: "/student-types",
    verifyUser: "/v1/verify-token",
    getAllUsers: "/admin/users",
    getUserById: (id: string) => `/admin/users/${id}`,
}
