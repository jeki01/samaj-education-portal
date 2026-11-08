import BottomBar from "@/ui/tc-pp/BottomBar";
import { Outlet } from "react-router";

export default function OnboardLayout() {
    return (
        <>
            <div>
                {/* header */}
                <div className="2xl:h-[90px] h-[60px] bg-white flex items-center justify-center relative" style={{ zIndex: 5 }}>
                    <img src="/brand-logo.png" alt="logo" className="w-[200px] h-auto object-contain" />
                </div>
                <Outlet />
                {/* footer */}
                <BottomBar />
            </div>
        </>
    )
}
