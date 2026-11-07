import { Divider } from "@heroui/react";
import { useContext } from "react";
import { SkillLearnContext } from "./context/SkillLearnContext";

export default function AssessmentTab() {
    const { handleTakeAssessment, assessmentScore, courseDetails } = useContext(SkillLearnContext);
    return (
        <div>
            <div className="border border-[#9533FB] rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <div className="bg-[#F7F1FF] p-1 rounded-md text-[14px] px-2">Assessment</div>
                    <div className="bg-[#F7F1FF] p-1 rounded-md text-[14px] px-2">Status : {assessmentScore?.percentage !== null ? "Completed" : "-"}</div>
                </div>
                <Divider className="my-4 bg-[#9533FB]" />
                <div className="font-semibold">Course 1</div>
                <div className="flex flex-wrap justify-center items-center gap-4 my-4">
                    <div className="min-w-[190px] border-t border-[#9533FB] min-h-[80px] py-1 px-4 shadow-[0_0px_2px_0px_#00000033] rounded-md flex flex-col justify-around items-center">
                        <div className="text-[14px]">Questions</div>
                        <div className="text-[14px] font-medium text-[#9533FB]">{courseDetails?.assessment.length}</div>
                    </div>
                    <div className="min-w-[190px] border-t border-[#9533FB] min-h-[80px] py-1 px-4 shadow-[0_0px_2px_0px_#00000033] rounded-md flex flex-col justify-around items-center">
                        <div className="text-[14px]">Assessment Time</div>
                        <div className="text-[14px] font-medium text-[#9533FB]">30 Mins</div>
                    </div>
                    <div className="min-w-[190px] border-t border-[#9533FB] min-h-[80px] py-1 px-4 shadow-[0_0px_2px_0px_#00000033] rounded-md flex flex-col justify-around items-center">
                        <div className="text-[14px]">Your Scores</div>
                        <div className="text-[14px] font-medium text-[#9533FB]">{assessmentScore?.percentage !== null ? `${assessmentScore?.percentage}%` : "NA"}</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-12">
                <button type="button" onClick={handleTakeAssessment} className="text-[14px] w-full max-w-[363px] rounded-md text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)] py-1 px-4">
                    {assessmentScore?.percentage !== null ? "Retake Assessment" : "Take Assessment"}
                </button>
            </div>
        </div>
    )
}
