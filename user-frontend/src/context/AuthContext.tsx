import { createContext } from "react";

type AuthContentType = {
    isAuthenticated: boolean,
    setAuthenticated: (auth: boolean) => void,
    loading: boolean,
    accMode: string,
    verify: () => void
}

const init: AuthContentType = {
    isAuthenticated: false,
    setAuthenticated: () => { },
    loading: false,
    accMode: "",
    verify: function (): void {
        throw new Error("Function not implemented.");
    }
}

export const AuthContext = createContext<AuthContentType>(init);