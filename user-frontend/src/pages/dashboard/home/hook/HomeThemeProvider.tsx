// HomeThemeProvider.tsx
import { useState } from "react";
import HomeThemeContext from "./HomeContext";

type Props = {
    children: React.ReactNode;
};

export default function HomeThemeProvider({ children }: Props) {
    const [handleGetCourseList, setHandleGetCourseList] = useState<() => void>(() => { });

    return (
        <HomeThemeContext.Provider
            value={{
                handleGetCourseList,
                setHandleGetCourseList,
            }}
        >
            {children}
        </HomeThemeContext.Provider>
    );
}
