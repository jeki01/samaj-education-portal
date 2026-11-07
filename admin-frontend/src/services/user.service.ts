import axiosInstance from "@/config/axios-instance";
import { ENDPOINTS } from "@/constants/endpoints";

export const getAllUsers = (page: number, limit: number, search: string) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search ? { search } : {}),
    });
    return axiosInstance.get(`${ENDPOINTS.getAllUsers}?${params.toString()}`);
};

export const getUserById = (id: string) => {
    return axiosInstance.get(ENDPOINTS.getUserById(id));
};
