import { Outlet } from "react-router";
import LayoutHeader from "./components/LayoutHeader";
import LayoutSideNav from "./components/LayoutSideNav";
import { ToastContainer } from 'react-toastify';

export default function Layout() {
    return (
        <>
            <div className="bg-[#EAEBF0]">
                <LayoutHeader />
                <div className="flex min-h-[calc(100vh-90px)]">
                    <LayoutSideNav />
                    <div className="xl:w-[calc(100%-283px)] w-[calc(100%-220px)] p-4 pb-0 h-[calc(100vh-90px)] overflow-y-scroll">
                        <Outlet />
                    </div>
                </div>
            </div>
             <ToastContainer />
        </>
    )
}
