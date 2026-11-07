import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { accountSwitch } from "@/services/user-auth.service";
import { toast } from "react-toastify";

export default function useSwitchAccount() {
    async function handleSwitchAccount(type: "exam" | "skills") {
        try {
            await accountSwitch({ examType: type });
            toast.success(`account switch to ${type === "exam" ? "Government Exam Preparation" : "Skills Preparation"}`);

            setTimeout(() => {
                if (type === "exam") {
                    window.location.href = "/home";
                } else {
                    window.location.href = "/explore-bundle";
                }
            }, 2000);

        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }
    return {
        handleSwitchAccount
    }
}
