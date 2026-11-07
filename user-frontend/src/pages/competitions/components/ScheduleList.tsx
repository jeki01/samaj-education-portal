import TestListIcon from "@/svg/TestListIcon";
import type { currentSelectedTestI, scheduleListI } from "../hook/useCompetition";
import NoData from "./NoData";
import { formatDateIntoReadable, formatMinutesIntoReadable, formatNumber, formatTimeIntoReadable, isTimeIsPassed } from "@/helper/global.helper";
import BuyCompetitionTestModal from "./BuyCompetitionTestModal";
import { Button, useDisclosure } from "@heroui/react";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

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
                                    item?.purchased ?
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