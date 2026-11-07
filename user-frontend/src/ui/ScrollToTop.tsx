import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Instantly jump to the top when the path changes
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}