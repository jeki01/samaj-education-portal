import useAuth from "@/context/useAuth"
import { Navigate, Outlet } from "react-router";
import LogoLoader from "@/ui/LogoLoader";

export default function PublicRoute() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <LogoLoader />;
    return !isAuthenticated ? <Outlet /> : <Navigate to={"/course"} replace />
}
