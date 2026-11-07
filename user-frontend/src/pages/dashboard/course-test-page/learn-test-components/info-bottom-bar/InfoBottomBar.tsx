import type { statusCountI } from "../../hook/useQATest";
import "./info-bottom-bar.css";

export default function InfoBottomBar({ statusCount }: InfoBottomBarProp) {
    return (
        <>
            <div className="md:w-[646px] mx-auto flex items-center justify-between test-info-bottom-bar">
                {/* Completed Questions */}
                <div className="flex items-center gap-x-2">
                    <div className="count w-[37px] h-[37px] rounded-full flex justify-center items-center bg-[#259800] text-white">{statusCount.attempted}</div>
                    <div className="count--name text-[#202020] text-[20px] font-medium">Attempted</div>
                </div>
                {/* Marked Later Questions */}
                <div className="flex items-center gap-x-2">
                    <div className="count w-[37px] h-[37px] rounded-full flex justify-center items-center bg-[#6633CC] text-white">{statusCount.marked}</div>
                    <div className="count--name text-[#202020] text-[20px] font-medium">Marked of later</div>
                </div>
                {/* Not attewmpted */}
                <div className="flex items-center gap-x-2">
                    <div className="count w-[37px] h-[37px] rounded-full flex justify-center items-center bg-[#A8A8A8] text-white">{statusCount.notAttempted}</div>
                    <div className="count--name text-[#202020] text-[20px] font-medium">Not attempted</div>
                </div>
            </div>
        </>
    )
}

interface InfoBottomBarProp {
    statusCount: statusCountI
}