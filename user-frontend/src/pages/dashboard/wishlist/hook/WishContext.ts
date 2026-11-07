import { createContext } from "react";

type WishlistThemeContextType = {
    handleGetCourseList: () => void;
    setHandleGetCourseList: (fn: () => void) => void;
};

const defaultValue: WishlistThemeContextType = {
    handleGetCourseList: () => { },
    setHandleGetCourseList: () => { },
};

const WishlistThemeContext = createContext<WishlistThemeContextType>(defaultValue);

export default WishlistThemeContext;
