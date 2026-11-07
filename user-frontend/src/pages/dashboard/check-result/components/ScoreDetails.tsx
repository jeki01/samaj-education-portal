import { Link, useSearchParams } from "react-router"
import type { questionDetails } from "../hook/useCheckResult"
import { useEffect } from "react";

export default function ScoreDetails({ percentage,
    correct,
    incorrect,
    notAttempted,
    quesList,
    scrollToQuestion,
    slug
}: ScoreDetailsProp) {
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type");
    useEffect(() => {
        if (type && type !== "complimentary") {
            setSearchParams({ type: "complimentary" });
        }
    }, [type])    
    return (
        <>
            <div className="check-result__score-details">
                <div className="score-details__overview">
                    <h2 className="score-details__overview-title">Test Results {percentage}</h2>
                    <div className="score-details__overview-list">
                        <span>{correct}</span>
                        <span className="list-dot"></span>
                        <span>Correct</span>
                    </div>
                    <div className="score-details__overview-list">
                        <span>{incorrect}</span>
                        <span className="list-dot"></span>
                        <span>Incorrect</span>
                    </div>
                    <div className="score-details__overview-list">
                        <span>{notAttempted}</span>
                        <span className="list-dot"></span>
                        <span>Not attempted</span>
                    </div>
                </div>
                <div className="score-details__ques-counts-wrapper">
                    <div className="score-details__ques-counts">
                        {
                            quesList.length > 0 && quesList.map((ques, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => scrollToQuestion(idx + 1)}
                                    className={`score-details__count ${ques?.status === "Correct" ? "correct" : ques?.status === "Wrong" ? "incorrect" : ""}`}>{idx + 1}</div>
                            ))
                        }
                    </div>
                    <Link
                        to={type === "complimentary" ? `/complimentary/${slug?.courseId}` : slug?.courseId === "competition" ? `/competitions` : `/my-learning/${slug?.courseId}`}
                        className="common-btn-ui"
                    >Exit</Link>
                </div>
            </div>
        </>
    )
}


interface ScoreDetailsProp {
    percentage: string,
    correct: number,
    incorrect: number,
    notAttempted: number,
    quesList: questionDetails[],
    scrollToQuestion: (questionNumber: number) => void,
    slug: Readonly<Partial<{
        attemptId: string;
        courseId: string;
        testSeriesId: string;
    }>>
}