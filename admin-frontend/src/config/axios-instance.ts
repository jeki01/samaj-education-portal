import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "true",
    },
});


axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("bauid");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})

export default axiosInstance;


type errObject = { [key: string]: string }

export interface ErrResp {
    response: {
        data: {
            data: { [key: string]: errObject }; message: string, success: boolean
        },
        status: number
    }
}