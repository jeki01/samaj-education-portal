import { deleteWishlist, getAllWishlist } from "@/services/wishlist.service";
import { useContext, useEffect, useState } from "react";
import type { CourseListData } from "../../home/hook/useHomeDetails";
import { toast } from "react-toastify";
import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import WishlistThemeContext from "./WishContext";

export default function UseWishlist() {
    const [courseListData, setCourseListData] = useState<{ courseId: CourseListData }[]>([]);
    const [walletPrice, setWalletPrice] = useState(0);
    const [isRefer, setIsRefer] = useState(false);
    const { setHandleGetCourseList } = useContext(WishlistThemeContext);


    async function handleGetWishlist() {
        try {
            const resp = await getAllWishlist();
            setCourseListData(resp?.data?.data?.courses);
            setWalletPrice(resp?.data?.earning);
            setIsRefer(resp?.data?.payment)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        handleGetWishlist()
    }, [])


    async function handleDeleteWishlist(id: string) {
        try {
            await deleteWishlist(id);
            await handleGetWishlist();
            toast.success("course removed successfully!")
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    // set course list api 

    useEffect(() => {
        setHandleGetCourseList(() => handleGetWishlist);
    }, [setHandleGetCourseList]);

    return {
        courseListData,
        handleDeleteWishlist,
        walletPrice,
        isRefer
    }
}