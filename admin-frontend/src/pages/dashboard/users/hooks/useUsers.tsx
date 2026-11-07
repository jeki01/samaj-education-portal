import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { getAllUsers, getUserById } from "@/services/user.service";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export interface UserItem {
    _id: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    mobileNo?: string;
    studentType?: string;
    examType?: string;
    isMobileVerified: boolean;
    isEmailVerified: boolean;
    country?: string;
    state?: string;
    city?: string;
    pincode?: string;
    earning?: number;
    showWelcomeMessage?: boolean;
    category?: { name?: string } | string;
    createdAt?: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

const PAGE_LIMIT = 15;

export default function useUsers() {
    const [users, setUsers]           = useState<UserItem[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: PAGE_LIMIT, totalPages: 1 });
    const [loading, setLoading]       = useState(false);
    const [search, setSearch]         = useState("");
    const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    async function fetchUsers(page: number, q: string) {
        setLoading(true);
        try {
            const resp = await getAllUsers(page, PAGE_LIMIT, q);
            setUsers(resp.data.data);
            setPagination(resp.data.pagination);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "Failed to load users");
            checkAuthUserHelper(err);
        } finally {
            setLoading(false);
        }
    }

    async function fetchUserDetail(id: string) {
        setDetailLoading(true);
        try {
            const resp = await getUserById(id);
            setSelectedUser(resp.data.data);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "Failed to load user details");
            checkAuthUserHelper(err);
        } finally {
            setDetailLoading(false);
        }
    }

    function handleSearchChange(value: string) {
        setSearch(value);
        if (searchTimer.current) clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            fetchUsers(1, value);
        }, 400);
    }

    function goToPage(page: number) {
        fetchUsers(page, search);
    }

    useEffect(() => {
        fetchUsers(1, "");
    }, []);

    return {
        users,
        pagination,
        loading,
        search,
        handleSearchChange,
        goToPage,
        selectedUser,
        setSelectedUser,
        fetchUserDetail,
        detailLoading,
    };
}
