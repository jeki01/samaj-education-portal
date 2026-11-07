import useAuth from "@/context/useAuth"
import { Navigate, Outlet } from "react-router";


export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <div className="flex justify-center items-center h-screen w-full font-bold text-2xl">Loading...</div>;
    return isAuthenticated ? <Outlet/> : <Navigate to={"/"} replace/>
}
