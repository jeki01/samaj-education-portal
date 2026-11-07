// HomeThemeContext.ts
import { createContext } from "react";

type HomeThemeContextType = {
    handleGetCourseList: () => void;
    setHandleGetCourseList: (fn: () => void) => void;
};

const defaultValue: HomeThemeContextType = {
    handleGetCourseList: () => { },
    setHandleGetCourseList: () => { },
};

const HomeThemeContext = createContext<HomeThemeContextType>(defaultValue);

export default HomeThemeContext;
