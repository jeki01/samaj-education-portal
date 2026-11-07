import axiosInstance from "@/config/axios-instance";

export const getPurchasedCourse = (category?: string, subcategory?: string, sortBy?: string, sortbystatus?: string, sortbyDate?: string) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (subcategory) params.append("subcategory", subcategory);
    if (sortBy) params.append("sortBy", sortBy);
    if (sortbystatus) params.append("sortbystatus", sortbystatus);
    if (sortbyDate) params.append("sortbyDate", sortbyDate);

    const queryString = params.toString();
    if (queryString) {
        return axiosInstance.get(`/v1/my-courses?${queryString}`)
    }
    return axiosInstance.get(`/v1/my-courses`)
}

export const getPurchasedCourseDetailsById = (courseId: string) => {
    return axiosInstance.get(`/v1/buyCourseId/${courseId}`)
}

export const saveAndNextQueAnsAPI = (data: SaveAndNextQueAns_BodyData) => {
    return axiosInstance.post("/v1/submitGovCourseAnswer", data)
}

export const finalSubmitTestAPI = (data: FinalSubmitTest_BodyData) => {
    return axiosInstance.post("/v1/calculateAllGovTestResult", data)
}

export const getTestResultAPI = (courseId: string | undefined, testSeriesId: string) => {
    const params = new URLSearchParams();
    if (courseId) params.append("courseId", courseId);
    if (testSeriesId) params.append("testSeriesId", testSeriesId);
    const queryString = params.toString();
    return axiosInstance.get(`/v1/getLatestResult?${queryString}`)
}

export const getTestTopicHistoryAPI = (topicId: string) => {
    return axiosInstance.get(`/v1/allData/${topicId}`)
}

export const getComplementaryCourse = () => {
    return axiosInstance.get(`/v1/complimentary`)
}

export const getComplimentaryCourseDetailsById = (courseId: string) => {
    return axiosInstance.get(`/v1/courseByIdComplimentary/${courseId}`)
}

export const getCheckResultDetails = (courseId: string | undefined, testSeriesId: string, attemptId: string) => {
    const params = new URLSearchParams();
    if (courseId) params.append("courseId", courseId);
    if (testSeriesId) params.append("testSeriesId", testSeriesId);
    if (attemptId) params.append("attemptId", attemptId);
    const queryString = params.toString();
    return axiosInstance.get(`/v1/answers-with-result?${queryString}`)
}

// ======== Skill mode =========

export const getPurchasedCourses = async () => {
    return axiosInstance.get(`/v1/SkillBundle/MyPurchasedBundle`)
}

export const getPurchasedCoursesById = async (id: string) => {
    return axiosInstance.get(`/v1/SkillBundle/MyPurchasedBundle/${id}`)
}

export const markAsReadLearning = async (data: MarkAsReadPayload) => {
    return axiosInstance.post("/v1/SkillBundle/MarkedAsRead", data)
}

export const getSkillCourseAssessmentQuestionsById = (courseId: string) => {
    return axiosInstance.get(`/v1/SkillCourse/AssessmentQuestions?courseId=${courseId}`)
}


export const saveAndNextSkillAssessmentAPI = (data: SkillSaveQAAssessmentPayload) => {
    return axiosInstance.post("/v1/SkillCourse/submitSkillCourseAnswer", data)
}

export const finalSubmitSkillAssessmentAPI = (data: FinalSkillAssessmentPayload) => {
    return axiosInstance.post("/v1/SkillCourse/calculateSkillResult", data)
}

export const getAssessmentScore = (BundleId: string, courseId: string) => {
    const params = new URLSearchParams;
    params.append("BundleId", BundleId);
    params.append("courseId", courseId);
    return axiosInstance.get(`/v1/SkillCourse/LatestSkillResult?${params.toString()}`)
}

export interface MarkAsReadPayload {
    type: "lecture" | "ebook",
    CourseId: string,
    BundleId: string,
    LectureId?: string
}

export interface FinalSkillAssessmentPayload {
    BundleId: string,
    courseId: string,
    attemptId: string
}

export interface SkillSaveQAAssessmentPayload {
    BundleId: string,
    courseId: string,
    questionId: string,
    selectedAnswer: string,
    attemptId: string
}

export interface SaveAndNextQueAns_BodyData {
    "courseId"?: string,
    "testSeriesId": string,
    "questionId": string,
    "selectedAnswer": string,
    attemptId?: string
}

export interface FinalSubmitTest_BodyData {
    "courseId": string,
    "testSeriesId": string,
    attemptId?: string,
    testTakeTime?: number
}