import type { AccountMode, AccountType } from "@/types/account";
import {
    useMemo,
    useState
} from "react";

import AccountContext from './AccountContext';

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
    const [accountType, setAccountType] = useState<AccountType | null>(null);
    const [accountMode, setAccountMode] = useState<AccountMode | null>(null);
    const [accountId, setAccountId] = useState<string | null>(null);
    const [isEligibleForSkillRefer, setIsEligibleForSkillRefer] = useState(false);

    const setAccountConfig = (type: AccountType, mode: AccountMode, id: string, buyStatus: boolean) => {
        setAccountType(type);
        setAccountMode(mode);
        setAccountId(id);
        setIsEligibleForSkillRefer(buyStatus);
    };

    const value = useMemo(
        () => ({
            accountType,
            accountMode,
            setAccountConfig,
            accountId,
            isEligibleForSkillRefer
        }),
        [accountType, accountMode, accountId, isEligibleForSkillRefer]
    );
    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;