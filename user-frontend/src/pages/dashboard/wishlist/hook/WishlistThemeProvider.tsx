// HomeThemeProvider.tsx
import { useState } from "react";
import WishlistThemeContext from "./WishContext";

type Props = {
    children: React.ReactNode;
};

export default function WishlistThemeProvider({ children }: Props) {
    const [handleGetCourseList, setHandleGetCourseList] = useState<() => void>(() => { });

    return (
        <WishlistThemeContext.Provider
            value={{
                handleGetCourseList,
                setHandleGetCourseList,
            }}
        >
            {children}
        </WishlistThemeContext.Provider>
    );
}
