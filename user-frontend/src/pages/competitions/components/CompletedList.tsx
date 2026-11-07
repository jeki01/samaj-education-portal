import SuccessCircularCheckIcon from "@/svg/SuccessCircularCheckIcon";
import TestListIcon from "@/svg/TestListIcon";
import type { scheduleListI } from "../hook/useCompetition";
import NoData from "./NoData";
import { formatDateIntoReadable, isDateIsPassed } from "@/helper/global.helper";
import { useNavigate } from "react-router";
import { Button } from "@heroui/react";

export default function CompletedList({ scheduleListData }: CompletedListProps) {
    const navigate = useNavigate();
    return (
        <>
            {
                scheduleListData.filter(i => i.completed).length > 0 ?
                    scheduleListData.filter(i => i.completed).map((item, i) => (
                        <div className="scheduled-list-item" key={i}>
                            <div className="item-details completed-test-details">
                                <TestListIcon />
                                <div className="item-content">
                                    <div className="item-name truncate">{item?.examName} </div>
                                    <div className="scheduled-val test-duration-mob">{formatDateIntoReadable(item?.scheduleDate)}</div>
                                </div>
                            </div>
                            <div className="scheduled-val">{formatDateIntoReadable(item?.scheduleDate)}</div>
                            <div className="scheduled-val completed-test-count flex items-center"><SuccessCircularCheckIcon /> <span className="ml-1 text-[#00BD58] flex items-center">{item?.correct}</span> /{item?.totalQuestions}</div>
                            <div className="scheduled-val completed-test-score">
                                <div className="score">Score {item?.percentage}%</div>
                            </div>
                            <div className="completed-action-wrapper">
                                <div className="scheduled-val  test-score-mob">
                                    <div className="score">Score {item?.percentage}%</div>
                                </div>
                                <Button
                                    className={`action ${isDateIsPassed(item?.scheduleDate) ? "disabled" : ""}`}
                                    onPress={() => navigate(`/competitions/chat/${item?._id}`)}
                                    isDisabled={isDateIsPassed(item?.scheduleDate)}
                                >
                                    Global Chat
                                </Button>
                            </div>
                        </div>
                    ))
                    : <NoData />
            }
        </>
    )
}

interface CompletedListProps {
    scheduleListData: scheduleListI[];
}