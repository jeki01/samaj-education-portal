import AttachedIcon from "@/svg/AttachedIcon";
import "./add-question-modal.css";
import { Modal, ModalBody, ModalContent, Select, SelectItem } from "@heroui/react";
import { useRef } from "react";
import type { QuestionForm } from "../../../hooks/useTestSeries";

export const optionList = [
    { key: "option1", label: "Option A", imageKey: "option1Image" },
    { key: "option2", label: "Option B", imageKey: "option2Image" },
    { key: "option3", label: "Option C", imageKey: "option3Image" },
    { key: "option4", label: "Option D", imageKey: "option4Image" },
    { key: "option5", label: "Option E", imageKey: "option5Image" },
];

const OptionInput = ({
    label,
    name,
    value,
    onChange,
    fileName,
    fileInputRef,
    imageKey
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName?: string;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    imageKey: string
}) => (
    <div className="flex items-center gap-x-4 my-2">
        <div className="text-[#313E3B] font-normal w-[100px] text-nowrap">{label}</div>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`Enter ${label}`}
            className="border border-[#E3E3E3] rounded-[16px] py-[12px] px-[16px] bg-white w-full"
        />
        <input
            type="file"
            ref={fileInputRef}
            onChange={onChange}
            accept=",.jpg,.jpeg,image/jpeg"
            className="hidden"
            name={imageKey}
        />
        <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[16px] font-bold text-[#6633CC] flex items-center gap-x-2 w-[150px]"
        >
            <AttachedIcon /> {fileName ? "Change" : "Attach file"}
        </button>
    </div>
);

export default function AddQuesModal({
    isOpen,
    onOpenChange,
    handleChangeQueAns,
    questionData,
    handleAddTopicQuestions,
    handleUpdateTopicQuestions,
    isEditQue,
    handleOnCancelAddQuesModal,
}: AddQuesModalProp) {

    const fileRefs: Record<string, React.RefObject<HTMLInputElement | null>> = {
        question: useRef<HTMLInputElement>(null),
        option1: useRef<HTMLInputElement>(null),
        option2: useRef<HTMLInputElement>(null),
        option3: useRef<HTMLInputElement>(null),
        option4: useRef<HTMLInputElement>(null),
        option5: useRef<HTMLInputElement>(null),
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            disableAnimation
            isDismissable={false}
            hideCloseButton
            classNames={{ base: "max-w-[1500px]" }}
        >
            <ModalContent>
                {() => (
                    <ModalBody>
                        <div className="new-series-base">
                            <div className="new-series-head">Add Question</div>

                            {/* Main body */}
                            <div className="new-series-body">
                                <div className="max-w-[80%] w-full pl-8">
                                    {/* Question input */}
                                    <OptionInput
                                        label="Question"
                                        name="question"
                                        value={questionData.question}
                                        onChange={handleChangeQueAns}
                                        fileName={questionData.questionImage}
                                        fileInputRef={fileRefs.question}
                                        imageKey="questionImage"
                                    />

                                    {/* Options */}
                                    {optionList.map((opt) => (
                                        <OptionInput
                                            key={opt.key}
                                            label={opt.label}
                                            name={opt.key}
                                            value={questionData[opt.key as keyof typeof questionData] || ""}
                                            onChange={handleChangeQueAns}
                                            fileName={questionData[opt.imageKey as keyof typeof questionData]}
                                            fileInputRef={fileRefs[opt.key]}
                                            imageKey={opt.imageKey}
                                        />
                                    ))}

                                    {/* Correct Answer */}
                                    <div className="flex items-center gap-x-4 my-2">
                                        <div className="text-[#313E3B] font-normal w-[75px]">Correct Answer</div>
                                        <Select
                                            aria-label="Select answer"
                                            placeholder="Select answer"
                                            className="max-w-[79%]"
                                            classNames={{ trigger: "bg-white w-full border h-[50px] rounded-[16px]" }}
                                            name="answer"
                                            selectedKeys={[questionData.answer]}
                                            onChange={handleChangeQueAns}
                                        >
                                            {optionList.map((opt) => (
                                                <SelectItem key={opt.key}>{opt.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="new-series-footer">
                                <button onClick={handleOnCancelAddQuesModal} className="new-series-footer-cancel-btn">
                                    Cancel
                                </button>
                                {isEditQue ? (
                                    <button onClick={handleUpdateTopicQuestions} className="new-series-footer-save-btn">
                                        Update
                                    </button>
                                ) : (
                                    <button onClick={handleAddTopicQuestions} className="new-series-footer-save-btn">
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
}

interface AddQuesModalProp {
    isOpen: boolean;
    onOpenChange: () => void;
    handleChangeQueAns: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    questionData: QuestionForm;
    handleAddTopicQuestions: () => void;
    handleUpdateTopicQuestions: () => void;
    isEditQue: boolean;
    handleOnCancelAddQuesModal: () => void;
}