import axiosInstance from "@/config/axios-instance"

export const addCourseToWishlist = (data: addCourseToWishlistBody) => {
    return axiosInstance.post("/v1/wishlist", data);
}

export const getAllWishlist = () => {
    return axiosInstance.get("/v1/wishlist")
}

export const deleteWishlist = (id: string) => {
    return axiosInstance.delete("/v1/wishlist/" + id)
}

export const checkWishlistItem = (courseId: string) => {
    return axiosInstance.get(`/v1/wishlist?courseId=${courseId}`)
}

interface addCourseToWishlistBody {
    courseId: string
}