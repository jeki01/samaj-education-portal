import { Link } from "react-router";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import ThreeDotsIcon from "@/svg/ThreeDotsIcon";
import SuccessCircularCheckIcon from "@/svg/SuccessCircularCheckIcon";
import TestListIcon from "@/svg/TestListIcon";
import { formatDDMMYYYY, secIntoReadableTime } from "@/helper/global.helper";
import type { TestSeriesI } from "@/pages/dashboard/my-learning/learning.type";
import UpPrimaryArrowIcon from "@/svg/UpPrimaryArrowIcon";
import type { TestHistoryResultDetails } from "../../hook/useTestHistory";
import { handlePercentageStatus } from "@/helper/testSeries.helper";

export default function TestTopic({ testTime, courseId, topic, currIndex, handleGetTestHistory, testHistory, toggleHistory, currentIndex }: TestTopicProps) {

    return (
        <>
            <div className="test-series-list-item-wrapper">
                <div className="test-series-list-item">
                    <div className="item-details">
                        <TestListIcon />
                        <div className="item-content">
                            <div className="item-name line-clamp-1" title={topic?.topicName}>{topic?.topicName}</div>
                            <div className="item-count-base">
                                <div className="item-que-count">Question {topic?.topicQuestions.length} </div>
                                <div className="item-time">{secIntoReadableTime(testTime * 60)}</div>
                            </div>
                        </div>
                    </div>
                    {
                        topic?.percentage !== null &&
                        <div className={`score ${handlePercentageStatus(topic?.percentage)}`}>
                            {topic?.percentage}% score
                        </div>
                    }
                    <div className="flex items-center gap-x-2 min-w-[108px] justify-end">
                        <Link to={`/my-learning-test/${courseId}/${topic?._id}?type=complimentary`} className="action">
                            {topic?.percentage !== null ? "Retest" : "Take test"}
                        </Link>
                        <Dropdown placement="right-end">
                            {
                                currentIndex !== currIndex ?
                                    <DropdownTrigger>
                                        <button className="px-2">
                                            <ThreeDotsIcon />
                                        </button>
                                    </DropdownTrigger>
                                    :
                                    <button onClick={() => toggleHistory(null)}>
                                        <UpPrimaryArrowIcon />
                                    </button>
                            }
                            <DropdownMenu aria-label="test topic action">
                                <DropdownItem key="history" onClick={() => {
                                    toggleHistory(currIndex)
                                    if (currentIndex !== currIndex) handleGetTestHistory(topic?._id)
                                }}>History</DropdownItem>
                                {/* <DropdownItem key="download">Download</DropdownItem> */}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                {/* table */}
                {
                    currentIndex === currIndex &&
                    <div className="test-series-table">
                        <div className="tbody-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Score</th>
                                        <th className="percentage-head-cell">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testHistory.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.createdAt && formatDDMMYYYY(item?.createdAt)}</td>
                                            <td>{`${secIntoReadableTime(item?.testTakeTime)}`}</td>
                                            <td className="score-val-cell"><SuccessCircularCheckIcon /> <span className="ml-1 flex items-center">{item.correct} </span> /{item.totalQuestions}</td>
                                            <td className="percentage-cell">
                                                <span className={`percentage-status ${handlePercentageStatus(item.percentage)}`}>
                                                    Score {item.percentage}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

interface TestTopicProps {
    testTime: number,
    courseId: string,
    topic: TestSeriesI,
    currIndex: number,
    handleGetTestHistory: (topicId: string) => Promise<void>,
    toggleHistory: (currIndex: number | null) => void,
    currentIndex: number | null,
    testHistory: TestHistoryResultDetails[]
}