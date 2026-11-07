import axiosInstance from "@/config/axios-instance"

// create 
export const handleCreateSkillCourse = (data: FormData) => {
    return axiosInstance.post("/v1/SkillCourse/Course", data, { headers: { "Content-Type": "multipart/form-data" } })
}

// update
export const handleUpdateSkillCourse = (data: FormData, id: string) => {
    return axiosInstance.put(`/v1/SkillCourse/Update/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })
}


// edit get by id
export const handleSkillCourseById = (id: string) => {
    return axiosInstance.get("/v1/SkillCourse/Course/" + id)
}

// get
export const handleGetSkillCourse = () => {
    return axiosInstance.get("/v1/SkillCourse/Course")
}

export const handleDeleteSkillCourse = (id: string) => {
    return axiosInstance.delete("/v1/SkillCourse/Course/" + id)
}

// ======== Bundle ==========

// get
export const handleGetSkillBundle = () => {
    return axiosInstance.get("/v1/SkillBundle")
}

export const handleCreateSkillBundle = (data: FormData) => {
    return axiosInstance.post("/v1/BundleCreate", data, { headers: { "Content-Type": "multipart/form-data" } })
}

export const handleUpdateSkillBundle = (data: FormData, id: string) => {
    return axiosInstance.put(`/v1/updateBundle/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })
}

export const handleGetByIdBundle = (id: string) => {
    return axiosInstance.get(`/v1/SkillBundle/${id}`)
}

export const handleDeleteBundle = (id: string) => {
    return axiosInstance.delete(`/v1/SkillBundle/${id}`);
}