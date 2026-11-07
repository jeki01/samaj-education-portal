import { Link, useSearchParams } from "react-router";
import "./test-result.css";
import UseTestResult from "./hook/useTestResult";
import { ToastContainer } from "react-toastify";
import { formatNumber } from "@/helper/global.helper";
import { useEffect } from "react";
export default function TestResult() {
    const { testResultDetails, slug } = UseTestResult();
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type");

    useEffect(() => {
        if (type && type !== "complimentary") {
            setSearchParams({ type: "complimentary" });
        }
    }, [type])
    return (
        <>
            {/* Head */}
            <div className="flex items-center justify-between mt-8 mx-12" style={{ zIndex: 2 }}>
                <div className="flex items-center gap-x-4">
                    <img src="/brand-logo.svg" alt="logo" className="h-[45px]" />
                </div>
                {/* <button className="close-modal-btn--screen--one" onClick={handleRedirectToTopicDetails}>
                    <CloseMenuIcon />
                </button> */}
            </div>
            {/* Body */}
            <div className="connectivity-body result-score-card h-[417px] bg-[#F7F1FF] border border-[#9533FB] rounded-[50px] px-4 mb-12 mt-20 flex justify-between items-center pl-12 w-[90%] mx-auto">
                <div className="md:w-[741px]1 p-8 result-score-detail-box">
                    <div className="flex justify-between flex-col">
                        <div className="flex items-center gap-x-4">
                            {/* <div className="icon-box">
                                <ScoredIcon />
                            </div> */}
                            <div className="text-[#32324D] text-[24px] font-bold score-title">You’ve scored</div>
                        </div>
                        <div className="text-[#6633CC] mt-2 font-bold text-[30px] bg-[#F7F1FF66] border border-[#6633CC] rounded-[12px] w-[142px] text-center score-val score--percentage">{formatNumber(testResultDetails?.percentage)} %</div>
                    </div>
                    {/* <div className="h-[1px] bg-[#D5D7D9] w-full my-8 result-score-divider"></div> */}
                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                            <div className="icon-box">
                                <CorrectAnswerIcon />
                            </div>
                            <div className="text-[#32324D] text-[24px] font-bold score-title">Correct Answers</div>
                        </div>
                        <div className="text-[#259800] text-[30px] font-bold score-val">{testResultDetails?.correct}</div>
                    </div>
                    <div className="h-[1px] bg-[#D5D7D9] w-full my-8 result-score-divider"></div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                            <div className="icon-box">
                                <IncorrectAnswerIcon />
                            </div>
                            <div className="text-[#32324D] text-[24px] font-bold score-title">Incorrect Answers</div>
                        </div>
                        <div className="text-[#E31D1C] text-[30px] font-bold score-val">{testResultDetails?.wrong}</div>
                    </div> */}
                    <div className="w-full pr-4 mt-4 score-breakdown">
                        <div className="font-medium text-[#727272] md:text-[18px] text-[14px]">Scores Calculation:</div>
                        <div className="font-medium text-[#727272] md:text-[18px] text-[14px]">Your correct answers <span className="text-[#259800]">{testResultDetails?.correct}</span>, so you’ve got {testResultDetails?.correct} x {testResultDetails?.maximumMark} = {formatNumber(testResultDetails?.correct * testResultDetails?.maximumMark)} marks</div>
                        <div className="font-medium text-[#727272] md:text-[18px] text-[14px]">Your incorrect answers <span className="text-[#E31D1C]">{testResultDetails?.wrong}</span>, so there is negative marking of {testResultDetails?.wrong} x {testResultDetails?.negativeMark} = {formatNumber(testResultDetails?.wrong * testResultDetails?.negativeMark)} marks</div>
                        <div className="font-medium text-[#727272] md:text-[18px] text-[14px] score-breakdown--final-percentage">So you scored {formatNumber(testResultDetails?.totalScore)} out of {(testResultDetails?.totalMarks)}, which resulted in <span className="text-[#9533FB]">{testResultDetails?.percentage}%</span> </div>
                    </div>
                </div>
                <img src="/instruction-banner.svg" alt="image" className="result-score-card-img" />
            </div>
            {/* Bottom */}
            <div className="w-full flex flex-wrap justify-center items-center gap-y-4 gap-x-8 px-4 my-learning-test-result-cta-base">
                {/*TODO : dynamic ids  */}
                <Link to={type === "complimentary" ? `/check-result/${slug?.attemptId}/${slug?.courseId}/${slug?.topicId}?type=complimentary` : `/check-result/${slug?.attemptId}/${slug?.courseId}/${slug?.topicId}`} className="common-btn-ui !w-fit whitespace-nowrap px-4 min-w-[150px]">Check Result</Link>
                {
                    slug?.courseId !== "competition" &&
                    <Link to={type === "complimentary" ? `/complimentary${slug?.courseId ? `/${slug?.courseId}` : ""}` : slug?.courseId === "competition" ? `/competitions` : `/my-learning${slug?.courseId ? `/${slug?.courseId}` : ""}`} className="common-btn-ui !w-fit whitespace-nowrap px-4 min-w-[150px]">Keep Leaning</Link>
                }
                <Link to={"/home"} className="common-btn-ui !w-fit whitespace-nowrap px-4 min-w-[150px]">Home</Link>
            </div>
            <ToastContainer />
        </>
    )
}
