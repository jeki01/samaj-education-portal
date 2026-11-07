import axiosInstance from "@/config/axios-instance"

// GET
export const handleGETSubjectAPI = () => {
    return axiosInstance.get("/v1/Subject/all")
}

// Create
export const handleCreateSubjectAPI = (data: CreateDataType) => {
    return axiosInstance.post("/v1/Subject/create", data)
}

// Update
export const handleUpdateSubjectAPI = (id: string, data: CreateDataType) => {
    return axiosInstance.put("/v1/Subject/update/" + id, data)
}

// Delete
export const handleDeleteSubjectAPI = (id: string) => {
    return axiosInstance.delete("/v1/Subject/delete/" + id)
}

type CreateDataType = {
    "category": string,
    "subcategory": string,
    "name": string
}