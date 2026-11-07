import CashIcon from "@/svg/CashIcon";
import "./refer-earn.css";
import InfoPrimaryIcon from "@/svg/InfoPrimaryIcon";
import { Select, SelectItem, Tooltip, useDisclosure } from "@heroui/react";
import InviteModal from "./invite-friends/InviteModal";
import UseReferEarn from "./hook/useReferEarn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatNumber } from "@/helper/global.helper";

export default function ReferEarn() {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const { referDetailsData, boughtCourseList, handleReferCount, referCount, courseId, referType } = UseReferEarn();
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (boughtCourseList.length > 0) {
            // set first item as default
            setSelectedKeys(new Set([boughtCourseList[0].id]));
            handleReferCount(boughtCourseList[0].id, boughtCourseList[0].type);
        }
    }, [boughtCourseList]);

    const showInfoMsg = (status: "idIsMissing" | "buyCourse") => {
        switch (status) {
            case "buyCourse":
                toast.info("You have to purchase a course to refer friends.");
                break;
            case "idIsMissing":
                toast.warn("Please select a course to refer friends.");
                break;
        }
    };

    return (
        <>
            <div className="flex items-center gap-x-2 refer-earn-section">
                <div className="refer-earn-section-base">
                    <h2 className="refer-title">Bussibees Wallet</h2>
                    <div className="current-balance">
                        <div>
                            <div className="current-balance-price"><CashIcon /><span> INR</span> {formatNumber(referDetailsData?.earning)}/-</div>
                            <div className="flex items-center gap-x-1 justify-between">
                                <div className="current-balance-price-label">Current Balance</div>
                                {/* <button className="text-[#9533FB] font-semibold underline underline-offset-2">View More</button> */}
                            </div>
                        </div>
                        {/* <div className="current-balance-tnc">Terms & Conditions</div> */}
                    </div>
                    {/* info tooltip */}
                    <Tooltip
                        content="You are entitled to use this amount for purchasing any of the courses offered by Bussibees for government exam."
                        showArrow={true}
                        classNames={{ base: "max-w-[158px]", content: "text-[12px] text-[#7A7A7A]" }}
                        placement="left"
                    >
                        <button className="refer-info">
                            <InfoPrimaryIcon />
                        </button>
                    </Tooltip>
                </div>
                <div className="refer-history-by-course">
                    <Select
                        aria-label="select-exam"
                        placeholder="Select"
                        selectionMode="single"
                        classNames={{
                            trigger: "bg-white filter-select-trigger !outline-none border border-[#6633CC] bg-[#6633CC] data-[hover=true]:bg-[#6633CC] pr-0 before:content-[''] before:absolute before:top-0 before:right-0 before:w-[33px] before:h-full before:bg-white before:rounded-tr-[11px] before:rounded-br-[11px]",
                            base: "filter-select-base !outline-none",
                            listbox: "select-listbox",
                            value: "!text-white !font-semibold",
                            selectorIcon: "bg-transparent h-full !w-[33px] !p-[7px] right-0 rounded-tr-[11px] rounded-br-[11px]"
                        }}
                        disableAnimation={true}
                        selectedKeys={selectedKeys}
                        onSelectionChange={(val) => {
                            const selectedCourseId = Array.from(val)[0] as string;
                            setSelectedKeys(new Set([selectedCourseId]));
                            const selectedCourse = boughtCourseList.find((i) => i.id === selectedCourseId);
                            if (selectedCourse?.type) {
                                handleReferCount(selectedCourseId, selectedCourse?.type);
                            }
                        }}
                    >
                        {boughtCourseList.map((item) => (
                            <SelectItem
                                key={item.id}
                            >
                                {item?.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <div className="refer-earn-count-box">
                        {
                            Array(10).fill("").map((_, i) => (
                                <div key={i} className={`refer-earn-count ${referCount <= i ? "opacity-20" : ""}`}>{i + 1}</div>
                            ))
                        }
                    </div>
                    <div className="refer-title flex items-center justify-between">
                        <div>
                            <span className="mr-4 sm:text-lg text-[14px]">{referCount}/10</span>
                            {
                                (Array.from(selectedKeys)[0]) ?
                                    <button onClick={onOpen} className="text-[#9533FB] font-semibold underline underline-offset-2 sm:text-lg text-[14px]">Refer Now</button>
                                    :
                                    (boughtCourseList.length > 0) ?
                                        <button onClick={() => showInfoMsg("idIsMissing")} className="text-[#9533FB] font-semibold underline underline-offset-2 sm:text-lg text-[14px]">Refer Now</button>
                                        :
                                        <button onClick={() => showInfoMsg("buyCourse")} className="text-[#9533FB] font-semibold underline underline-offset-2 sm:text-lg text-[14px]">Refer Now</button>
                            }

                        </div>
                        <button className="text-[#9533FB] font-semibold underline underline-offset-2 sm:text-lg text-[14px]">T & C</button>
                    </div>
                </div>
            </div>
            {
                courseId &&
                <InviteModal isOpen={isOpen} onOpenChange={onOpenChange} courseId={courseId} referType={referType} />
            }
        </>
    )
}
