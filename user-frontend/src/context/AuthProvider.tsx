import { checkAuthUser, handleGetUserAccountMode } from "@/services/user-auth.service";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useAccount } from "./account/AccountContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [accMode, setAccMode] = useState("");
    const { setAccountConfig } = useAccount();

    useEffect(() => {
        verify()
    }, [])

    async function verify() {
        try {
            const resp = await checkAuthUser();
            if (resp.data?.status === "yes") {
                const data = await handleGetUserAccountMode();
                setAccountConfig(data?.data?.data?.AccountType, data?.data?.data?.AccountMode, data?.data?.data?.userId, data?.data?.data?.buyStatus)
                setAccMode(data?.data?.data?.AccountMode);

                setAuthenticated(true);
                setLoading(false);
            } else {
                setAuthenticated(false);
                setLoading(false);
            }
        } catch (error) {
            const er = error as { response: { data: { status: string } } }
            const status = er?.response?.data?.status;
            if (status === "no") {
                setAuthenticated(false);
                setLoading(false);
            }
        }
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, loading, accMode, verify }}>
            {children}
        </AuthContext.Provider>
    )
}