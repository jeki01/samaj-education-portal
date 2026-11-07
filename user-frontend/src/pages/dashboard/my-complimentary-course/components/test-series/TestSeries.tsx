import "./test-series.css";
import type { TestSeriesI } from "@/pages/dashboard/my-learning/learning.type";
import TestTopic from "./TestTopic";
import UseTestHistory from "../../hook/useTestHistory";

export default function TestSeries({ testTime, topicList, courseId }: TestSeriesProps) {
    const { handleGetTestHistory, testHistory, toggleHistory, currentIndex } = UseTestHistory();

    return (
        <div className="test-series-list-wrapper">
            {
                topicList.length > 0 && topicList.map((topic, i) => (
                    <TestTopic
                        currIndex={i}
                        key={i}
                        testTime={testTime}
                        courseId={courseId}
                        topic={topic}
                        handleGetTestHistory={handleGetTestHistory}
                        testHistory={testHistory}
                        toggleHistory={toggleHistory}
                        currentIndex={currentIndex}
                    />
                ))
            }
        </div>
    )
}

interface TestSeriesProps {
    testTime: number,
    topicList: TestSeriesI[],
    courseId: string
}