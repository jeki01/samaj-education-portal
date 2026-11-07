import { createContext } from "react";

type AuthContentType = {
    isAuthenticated: boolean,
    setAuthenticated: (auth: boolean) => void,
    loading: boolean
}

export const AuthContext = createContext<AuthContentType | undefined>(undefined);