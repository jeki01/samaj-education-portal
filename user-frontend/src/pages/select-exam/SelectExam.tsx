import AuthBgFrame from "@/ui/frame/AuthBgFrame";
import "./select-exam.css";
import { Select, SelectItem } from "@heroui/react";
import MultiSelectTickIcon from "@/svg/MultiSelectTickIcon";
import UseSelectExam from "./useSelectExam";

export default function SelectExam() {
    const { ExamListData, handleSelectionChange, submitFinalData } = UseSelectExam();
    return (
        <>
            <div className="select-exam-base">
                <AuthBgFrame>
                    <div className="select-exam-page-base">
                        <div className="w-full">
                            <div className="select-exam-title">Select Your Exam</div>
                            <button className="select-exam-head">Government Exams Preparation</button>


                            <Select
                                aria-label="select-exam"
                                placeholder="Select"
                                selectionMode="single"
                                classNames={{
                                    trigger: "bg-white h-[52px]",
                                    base: "mt-4"
                                }}
                                isOpen={true}
                            >
                                {ExamListData.filter(i=>i.id !== "all").map((item, idx) => (
                                    <SelectItem
                                        key={idx}
                                        selectedIcon={
                                            <div className="w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100">
                                                <MultiSelectTickIcon />
                                            </div>
                                        }
                                        onClick={() => {
                                            handleSelectionChange(item?.id)
                                        }}
                                    >
                                        {item?.label}
                                    </SelectItem>
                                ))}
                            </Select>


                        </div>
                        <button onClick={submitFinalData} className="common-btn-ui">Submit</button>
                    </div>
                </AuthBgFrame>
            </div>
        </>
    )
}
