import "./check-result.css";
import QuesLists from "./components/QuesLists";
import ScoreDetails from "./components/ScoreDetails";
import UseCheckResult from "./hook/useCheckResult";

export default function CheckResult() {
    const { resultDetailsData, questionRefs, scrollToQuestion, slug } = UseCheckResult();
    return (
        <div className="check-result-container">
            <div className="check-result">
                <QuesLists
                    data={resultDetailsData?.data}
                    ref={questionRefs}
                />
                <ScoreDetails
                    percentage={resultDetailsData?.percentage}
                    correct={resultDetailsData?.totalCorrect}
                    incorrect={resultDetailsData?.totalWrong}
                    notAttempted={resultDetailsData?.totalNotAttempted}
                    quesList={resultDetailsData?.data}
                    scrollToQuestion={scrollToQuestion}
                    slug={slug}
                />
            </div>
        </div>
    )
}
