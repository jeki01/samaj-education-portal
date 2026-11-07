import type { AccountMode, AccountType } from "@/types/account";
import { createContext, useContext } from "react";


interface AccountContextType {
    accountType: AccountType | null;
    accountMode: AccountMode | null;
    setAccountConfig: (type: AccountType, mode: AccountMode, id: string, buyStatus: boolean) => void;
    accountId: string | null;
    isEligibleForSkillRefer: boolean;
}


const AccountContext = createContext<AccountContextType | null>(null);

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("useAccount must be used inside AccountProvider");
    }
    return context;
};

export default AccountContext;