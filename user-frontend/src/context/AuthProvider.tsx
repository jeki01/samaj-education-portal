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
            console.log("[Auth] verify-token response:", resp.data?.status);
            if (resp.data?.status === "yes") {
                // Token is valid — user IS authenticated
                setAuthenticated(true);
                try {
                    const data = await handleGetUserAccountMode();
                    console.log("[Auth] accountMode:", data?.data?.data?.AccountMode);
                    setAccountConfig(data?.data?.data?.AccountType, data?.data?.data?.AccountMode, data?.data?.data?.userId, data?.data?.data?.buyStatus)
                    setAccMode(data?.data?.data?.AccountMode);
                } catch (modeErr) {
                    // If only LoggedInUser fails, keep user authenticated with default exam mode
                    console.error("[Auth] LoggedInUser failed, defaulting to exam:", modeErr);
                    setAccountConfig("student" as never, "exam" as never, "", false);
                    setAccMode("exam");
                }
                setLoading(false);
            } else {
                setAuthenticated(false);
                setLoading(false);
            }
        } catch (error) {
            const er = error as { response: { data: { status: string } } }
            const status = er?.response?.data?.status;
            console.error("[Auth] verify-token failed:", status, error);
            setAuthenticated(false);
            setLoading(false);
        }
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, loading, accMode, verify }}>
            {children}
        </AuthContext.Provider>
    )
}