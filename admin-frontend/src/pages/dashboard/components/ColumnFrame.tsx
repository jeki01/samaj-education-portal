import AddPrimaryIcon from "@/svg/AddPrimaryIcon";
import type { ColumnFrameIProp } from "../types/common.types";

export default function ColumnFrame({ title, handleAddNew, children, col_type, isAddBtn = true, base, headbar, bodyClass }: ColumnFrameIProp) {
    return (
        <>
            <div className={`lg:max-w-[534px] lg:w-[534px] max-w-full w-full ${base || ""}`}>
                <div className={`h-[56px] bg-[linear-gradient(#6633CC,#9933FF)] border border-r border-[#CFD1DD] flex justify-between items-center xl:px-14 px-4 ${col_type === "start" ? "rounded-tl-xl" : col_type === "end" ? "rounded-tr-xl" : ""} ${headbar || ""}`}>
                    <h2 className="xl:text-lg text-[14px] text-white font-semibold capitalize">{title}</h2>
                    {
                        isAddBtn === true &&
                        <button className="text-sm flex items-center bg-white px-4 py-2 rounded-full gap-x-2 font-medium" onClick={handleAddNew}>
                            Add New
                            <AddPrimaryIcon/>
                        </button>
                    }
                </div>
                <div className={`bg-white min-h-[calc(100vh-162px)] border border-r border-[#CFD1DD] ${bodyClass || ""}`}>{children}</div>
            </div>
        </>
    )
}
