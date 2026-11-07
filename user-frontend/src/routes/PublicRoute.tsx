import useAuth from "@/context/useAuth";
import { Navigate, Outlet, useSearchParams } from "react-router";

export default function PublicRoute() {
    // const { accountMode } = useAccount();
    const { isAuthenticated, loading, accMode } = useAuth();
    const [searchParams] = useSearchParams();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-full font-bold text-2xl">
                Loading...
            </div>
        );
    }

    // Redirect skills users away from public routes

    if (accMode === "skills") {
        return <Navigate to="/explore-bundle" replace />;
    }

    const referId = searchParams.get("referId")?.split(" ")[0];
    const courseId = searchParams.get("courseId")?.split(" ")[0];
    const testId = searchParams.get("testId")?.split(" ")[0];

    // If user is NOT logged in → allow public routes
    if (!isAuthenticated) {
        return <Outlet />;
    }

    // If logged in and coming from referral
    if (referId && (courseId || testId)) {
        const isCourse = Boolean(courseId);

        return (
            <Navigate
                to={`/${isCourse ? "home" : "competitions"}?referId=${referId}&${isCourse ? "courseId" : "testId"
                    }=${courseId || testId}`}
                replace
            />
        );
    }

    // Default redirect for authenticated users
    return <Navigate to="/home" replace />;
}


// import { useAccount } from "@/context/account/AccountContext";
// import useAuth from "@/context/useAuth"
// import { Navigate, Outlet, useSearchParams } from "react-router";

// export default function PublicRoute() {
//     const { accountMode} = useAccount();
//     const { isAuthenticated, loading } = useAuth();
//     const [searchParams] = useSearchParams();

//     if (loading) return <div className="flex justify-center items-center h-screen w-full font-bold text-2xl">Loading...</div>;

//     const referId = searchParams.get("referId");
//     const courseId = searchParams.get("courseId");
//     const testId = searchParams.get("testId");
//     const id = (courseId || testId);

//     if(accountMode === "skills"){
//         <Navigate to={"/pricing-plans"} replace />
//     }

//     return !isAuthenticated ? <Outlet /> : (referId && id ? <Navigate to={`/${courseId ? "home" : "competitions"}?referId=${referId.split(" ").at(0)}&${courseId ? "courseId" : "testId"}=${id.split(" ").at(0)}`} replace /> : <Navigate to={"/home"} replace />)
// }
