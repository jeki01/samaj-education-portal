import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { getReferralUserList } from "@/services/refer.service";
import type { ErrResp } from "@/config/axios-instance";
import { toast } from "react-toastify";
import { checkAuthUserHelper } from "@/helper/auth.helper";

export default function UseReferUserList() {
    const [open, setOpen] = useState(false);
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [referUserList, setReferUserList] = useState<ReferUserListDetails[]>([]);

    async function handleReferUser(courseId: string) {
        try {
            const resp = await getReferralUserList(courseId);
            setReferUserList(resp.data?.data || []);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err);
        }
    }

    return { open, setOpen, isOpen, onOpenChange, onOpen, handleReferUser, referUserList }
}


interface ReferUserListDetails {
    "userDetails": {
        "_id": string,
        "email": string,
        "mobileNo": string,
        "firstName": string,
        "lastName": string
    },
    "course": {
        "_id": string
    }
}