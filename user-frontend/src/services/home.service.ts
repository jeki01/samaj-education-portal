import axiosInstance from "@/config/axios-instance"

export const handleCourseList = (category?: string, subcategory?: string) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (subcategory) params.append("subcategory", subcategory);
    const queryString = params.toString();
    if (queryString) {
        return axiosInstance.get(`/v1/dashboardfilter?${queryString}`)
    }
    return axiosInstance.get(`/v1/dashboardfilter`)
}

export const getSubCategoryAPI = (id: string) => {
    return axiosInstance.get(`/v1/examType?type=subcategory&parentId=${id}`)
}