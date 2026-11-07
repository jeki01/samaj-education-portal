import "./submit-test.css";
// import { SuccessSocres } from "../../hooks/useLearningTest";
// import { FinalSubmisisonType } from "@/services/my-learning.service";
import SubmitTestBtn from "../submit-test-btn/SubmitTestBtn";
import type { FinalSubmitTest_BodyData } from "@/services/my-learning.service";
import { Progress } from "@heroui/react";
import { formatNumber } from "@/helper/global.helper";

export default function SubmitTest({ QueCountList, handleSubmitQuizz, handleSwitchQues, QueProgress }: SubmitTestProp) {
    return (
        <>
            <div className="test-paper-img-wrapper">
                <img src="/learning-testpaer-img.svg" alt="user-test" />
            </div>
            <div className="w-[315px] h-[calc(100%-280px)] rounded-[12px] bg-white mt-0 py-2 px-4 flex flex-col justify-between submit-test-container">
                <div className="my-2">
                    <Progress aria-label="Loading..." size="sm" value={QueProgress} classNames={{ indicator: "bg-[#7634DC]" }} />
                    <div className="test-progress-text">{formatNumber(QueProgress)}% Completed </div>
                </div>
                {/* <div> */}
                    {/* Question Total */}
                    {/* <div className="flex items-center justify-between my-4">
                        <div className="text-[#202020] font-bold text-[24px] ">Questions</div>
                        <div className="text-primary text-[24px] font-bold bg-[#F7F1FF66] border border-[#9533fb] w-[72px] h-[39px] rounded-[12px] py-[2px] text-center">{QueCountList.length || 0}</div>
                    </div> */}
                {/* </div> */}
                {/* Questions numbers */}
                <div className="flex flex-wrap gap-y-4 gap-x-4 py-2 counting--box">
                    {
                        QueCountList.length > 0 && QueCountList.map(({ status }, i) => (
                            <div
                                key={i}
                                onClick={() => handleSwitchQues(i)}
                                className={`cursor-pointer question-count w-[37px] h-[37px] rounded-full flex justify-center items-center text-white text-[14px] ${status === "default" ? "default--count" : status === "success" ? "completed--count" : "marked-later--count"} `}
                            >{i + 1}</div>
                        ))
                    }
                </div>
                {/* <button onClick={onOpen} className="font-semibold text-[16px] text-white h-[54px] bg-primary rounded-[16px] w-full">Submit Test</button> */}
                <SubmitTestBtn
                    QueProgress={QueProgress}
                    handleSubmitQuizz={handleSubmitQuizz}
                />
            </div>
        </>
    )
}

interface SubmitTestProp {
    QueCountList: { id: string, status: string }[],
    handleSubmitQuizz: (data: FinalSubmitTest_BodyData) => void,
    allScore?: 0,
    handleSwitchQues: (i: number) => void,
    QueProgress: number
}