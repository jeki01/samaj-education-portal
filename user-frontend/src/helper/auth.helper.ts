import type { ErrResp } from "@/config/axios-instance";
import Cookies from "js-cookie"
export function convertIntoSelectItems(data: { name: string, type: string, _id: string }[]) {
    if (data && data.length > 0) {
        return data.map(({ name, _id }) => {
            return { id: _id, label: name }
        })
    }
    return []
}

export function trimFileUrl(url: string) {
    if (url) {
        return url.split("uploads/").at(-1);
    }
    return ""
}

export function isPdfFile(url: string) {
    if (url) {
        return url.includes(".pdf")
    }
    return ""
}

export function checkAuthUserHelper(err: ErrResp) {
    const unAuthStatus = err?.response?.status;
    if (unAuthStatus === 401) {
        Cookies.remove("buuid");
        window.location.href = "/";
    }
}