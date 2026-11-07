import axiosInstance from "@/config/axios-instance"

// create 
export const handleCreateGovCourse = (data: FormData) => {
    return axiosInstance.post("/v1/governmentCourse", data, { headers: { "Content-Type": "multipart/form-data" } })
}

// create test
export const handleCreateCompetitionExam = (data: FormData) => {
    return axiosInstance.post("/v1/createTest", data, { headers: { "Content-Type": "multipart/form-data" } })
}

// get
export const handleGetGovCourse = () => {
    return axiosInstance.get("/v1/governmentcourses")
}

export const handleGetCompetitionCourse = () => {
    return axiosInstance.get("/v1/getschduleTest")
}


// delete

export const handleDeleteGovCourse = (id: string) => {
    return axiosInstance.delete("/v1/governmentCourse/" + id)
}

// getschduleTest

export const handleDeleteCompetitionCourse = (id: string) => {
    return axiosInstance.delete("/v1/getschduleTest/" + id)
}

// edit get by id
export const handleGovCourseById = (id: string) => {
    return axiosInstance.get("/v1/GovernmentCourseById/" + id)
}

// get test exam details by id
export const handleCompetitionExamById = (id: string) => {
    return axiosInstance.get("/v1/getschduleTest/" + id)
}


//  filter list api
export const handleFilterGovList = (params: {
    category?: string;
    subcategory?: string;
    subsubcategory?: string;
    categoryType?: string
}) => {
    const searchParams = new URLSearchParams();

    if (params.category) searchParams.append('category', params.category);
    if (params.subcategory) searchParams.append('subcategory', params.subcategory);
    if (params.subsubcategory) searchParams.append('subject', params.subsubcategory);
    if (params.categoryType) searchParams.append('categoryType', params.categoryType);

    return axiosInstance.get(`/v1/filterGovernment?${searchParams}`)
}

// published api
export const handlePublished = (id: string) => {
    return axiosInstance.put(`/v1/CourseStatus/` + id, {
        "status": "Active"
    })
}

// competition 
export const handlePublishedCompetition = (id: string) => {
    return axiosInstance.put(`/v1/publisTest/` + id, {
        "status": "Active"
    })
}

export const getParsedMCQ_fromFile_API = (data: FormData) => {
    return axiosInstance.post(`/v1/upload-pdf`, data, { headers: { "Content-Type": "multipart/form-data" } });
}