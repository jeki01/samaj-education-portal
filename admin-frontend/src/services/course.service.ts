import axiosInstance from "@/config/axios-instance";

export const createLocation = (data: CreateLocation) => {
    return axiosInstance.post("/v1/examType", data);
}

export const getCountryList = () => {
    const query = `?type=category`;
    return axiosInstance.get("/v1/examType" + query);
}

export const getLocationList = (locationType: string, parentId: string) => {
    const query = `?type=${locationType.toLocaleLowerCase()}&parentId=${parentId}`;
    return axiosInstance.get("/v1/examType" + query);
}

export const updateLocationList = (id: string, data: UpdateLocation) => {
    return axiosInstance.put("/v1/examType" + `/${id}`, data)
}

export const deleteLocation = (id: string) => {
    return axiosInstance.delete("/v1/examType" + `/${id}`)
}

export const handleGetSubjectListAPI = (categoryId: string, subcategoryId: string) => {
    return axiosInstance.get(`/v1/Subject/filter?category=${categoryId}&subcategory=${subcategoryId}`)
}

export const handleCoursePercentage = (id: string, data: CoursePercentageData) => {
    return axiosInstance.post("/v1/coursePercentages/" + id, data)
}

interface CreateLocation {
    name: string,
    type: string,
    parentId?: string
}

interface UpdateLocation {
    type: string,
    name: string
}

interface CoursePercentageData {
    "ebookPercentage"?: string,
    "notePercentage"?: string,
    "videoPercentage"?: string,
    "testPercentage"?: string
}