import TestListIcon from "@/svg/TestListIcon";
import type { currentSelectedTestI, scheduleListI } from "../hook/useCompetition";
import NoData from "./NoData";
import { formatDateIntoReadable, formatMinutesIntoReadable, formatNumber, formatTimeIntoReadable, isTimeIsPassed } from "@/helper/global.helper";
import BuyCompetitionTestModal from "./BuyCompetitionTestModal";
import { Button, useDisclosure } from "@heroui/react";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

function useCountdown(scheduleDate: string, scheduleTime: string) {
    const [remaining, setRemaining] = useState("");
    useEffect(() => {
        function calc() {
            const parts = scheduleDate.split("-");
            if (parts.length !== 3) return setRemaining("");
            const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}T${scheduleTime}+05:30`;
            const diff = new Date(isoDate).getTime() - Date.now();
            if (diff <= 0) return setRemaining("");
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            if (d > 0) setRemaining(`${d}d ${h}h ${m}m`);
            else setRemaining(`${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`);
        }
        calc();
        const id = setInterval(calc, 1000);
        return () => clearInterval(id);
    }, [scheduleDate, scheduleTime]);
    return remaining;
}

function CountdownBadge({ scheduleDate, scheduleTime }: { scheduleDate: string; scheduleTime: string }) {
    const remaining = useCountdown(scheduleDate, scheduleTime);
    if (!remaining) return null;
    return (
        <div style={{ background: "linear-gradient(90deg,#4B0082,#9933FF)", color: "#fff", borderRadius: "8px", padding: "6px 12px", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
            <span>⏳</span><span>Starts in {remaining}</span>
        </div>
    );
}

export default function ScheduleList({ scheduleListData, handleSetCurrTestDetails, currentSelectedTest, handleEnrollNow, walletBalance }: ScheduleListProps) {
    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const testId = searchParams.get("testId");
        if (testId && scheduleListData.some(i => i._id === testId && i.purchased === false)) {
            const selectedTest = scheduleListData.find(i => i._id === testId);
            handleSetCurrTestDetails({
                id: selectedTest?._id || "-",
                testName: selectedTest?.examName || "-",
                testPrice: selectedTest?.examPrice || "-"
            })
            onOpen();
        }
    }, [scheduleListData, searchParams]);

    return (
        <>
            {
                scheduleListData.filter(i => !(i.completed)).length > 0 ?
                    scheduleListData.filter(i => !(i.completed)).map((item, i) => (
                        <div className="scheduled-list-item" key={i}>
                            <div className="item-details">
                                <TestListIcon />
                                <div className="item-content">
                                    <div className="item-name truncate w-[200px]" title={item?.examName}>{item?.examName || "-"} </div>
                                    <div className="scheduled-val test-duration-mob">Test Duration: {formatMinutesIntoReadable(item.totalExamTime) || "-"}</div>
                                    <div className="scheduled-val test-duration-mob">Scheduled Date & Time: {formatDateIntoReadable(item?.scheduleDate) || "-"} | {formatTimeIntoReadable(item?.scheduleTime) || "-"}</div>
                                </div>
                            </div>
                            <div className="scheduled-val">Test Duration: {formatMinutesIntoReadable(item.totalExamTime) || "-"}</div>
                            <div className="scheduled-val">Scheduled Date & Time: {formatDateIntoReadable(item?.scheduleDate) || "-"} | {formatTimeIntoReadable(item?.scheduleTime) || "-"}</div>
                            <div className="scheduled-val !text-[#9533FB] text-center whitespace-nowrap">
                                {
                                    item?.purchased ? ""
                                        :
                                        `₹ ${formatNumber(Number(item?.examPrice)) || "-"}/-`
                                }
                            </div>
                            <div className="schedule-action-wrapper">
                                <div className="scheduled-val test-duration-mob !text-[#9533FB] text-center whitespace-nowrap">
                                    {
                                        item?.purchased ? ""
                                            :
                                            `₹ ${formatNumber(Number(item?.examPrice)) || "-"}/-`
                                    }
                                </div>
                                {
                                    (item as any)?.isUpcoming ? (
                                        <CountdownBadge scheduleDate={item.scheduleDate} scheduleTime={item.scheduleTime} />
                                    ) : item?.purchased ?
                                        <Button
                                            isDisabled={isTimeIsPassed(item?.scheduleDate, item?.scheduleTime)}
                                            className={`action ${isTimeIsPassed(item?.scheduleDate, item?.scheduleTime) ? "disabled" : ""}`}
                                            onPress={() => navigate(`/my-learning-test/competition/${item?._id}?id=${item?.testSeriesId}`)}
                                        >
                                            Start
                                        </Button>
                                        :
                                        <button className="action" onClick={() => {
                                            handleSetCurrTestDetails({
                                                id: item?._id || "-",
                                                testName: item?.examName || "-",
                                                testPrice: item?.examPrice || "-"
                                            })
                                            onOpen()
                                        }}>
                                            Enroll
                                        </button>
                                }
                            </div>
                        </div>
                    ))
                    :
                    <NoData />
            }

            <BuyCompetitionTestModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                currentSelectedTest={currentSelectedTest}
                handleEnrollNow={handleEnrollNow}
                walletBalance={walletBalance}
            />
        </>
    )
}


interface ScheduleListProps {
    scheduleListData: scheduleListI[];
    handleSetCurrTestDetails: (d: currentSelectedTestI) => void;
    currentSelectedTest: currentSelectedTestI | null;
    handleEnrollNow: (onClose: () => void) => void;
    walletBalance: number
}