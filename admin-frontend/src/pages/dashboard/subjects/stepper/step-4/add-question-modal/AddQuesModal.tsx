// import AttachedIcon from "@/svg/AttachedIcon";
import {
    Modal,
    ModalBody,
    ModalContent,
    Select,
    SelectItem,
} from "@heroui/react";
import { Formik } from "formik";
import type { TestTopicQuestionI } from "../useTestSeriesStep";

export const optionList = [
    { key: "option1", label: "Option A", imageKey: "option1Image" },
    { key: "option2", label: "Option B", imageKey: "option2Image" },
    { key: "option3", label: "Option C", imageKey: "option3Image" },
    { key: "option4", label: "Option D", imageKey: "option4Image" },
    { key: "option5", label: "Option E", imageKey: "option5Image" },
] as const;

const EMPTY_QUESTION: TestTopicQuestionI = {
    question: "",
    questionImage: "",
    option1: "",
    option1Image: "",
    option2: "",
    option2Image: "",
    option3: "",
    option3Image: "",
    option4: "",
    option4Image: "",
    option5: "",
    option5Image: "",
    answer: "",
};

interface AddQuesModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onSave: (q: TestTopicQuestionI) => void;
    initialValues?: TestTopicQuestionI;
}

export default function AddQuesModal({
    isOpen,
    onOpenChange,
    onSave,
    initialValues,
}: AddQuesModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            hideCloseButton
            disableAnimation
            classNames={{ base: "max-w-[1500px]" }}
        >
            <ModalContent>
                {(onClose) => (
                    <Formik<TestTopicQuestionI>
                        enableReinitialize
                        initialValues={initialValues ?? EMPTY_QUESTION}
                        onSubmit={(values) => {
                            onSave(values);
                            onClose();
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            // setFieldValue,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <ModalBody>
                                    <div className="new-series-base">
                                        <div className="new-series-head">
                                            {initialValues ? "Edit Question" : "Add Question"}
                                        </div>

                                        <div className="new-series-body">
                                            <input
                                                name="question"
                                                value={values.question}
                                                onChange={handleChange}
                                                className="w-full border rounded p-3 mb-4"
                                                placeholder="Enter question"
                                            />

                                            {optionList.map((opt) => (
                                                <div
                                                    key={opt.key}
                                                    className="flex items-center gap-x-4 mb-2"
                                                >
                                                    <input
                                                        name={opt.key}
                                                        value={values[opt.key]}
                                                        onChange={handleChange}
                                                        className="flex-1 border rounded p-2"
                                                        placeholder={opt.label}
                                                    />
                                                    {/* 
                                                    <input
                                                        type="file"
                                                        hidden
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            setFieldValue(
                                                                opt.imageKey,
                                                                e.currentTarget.files?.[0]?.name ?? ""
                                                            )
                                                        }
                                                    /> */}
                                                    {/* 
                                                    <button
                                                        type="button"
                                                        className="text-[#6633CC] flex items-center gap-x-2"
                                                    >
                                                        <AttachedIcon /> Attach
                                                    </button> */}
                                                </div>
                                            ))}

                                            <Select
                                                name="answer"
                                                selectedKeys={values.answer ? [values.answer] : []}
                                                onChange={handleChange}
                                                aria-label="Correct answer"
                                                classNames={{
                                                    trigger:
                                                        "bg-white border h-[50px] rounded-[16px]",
                                                }}
                                            >
                                                {optionList.map((opt) => (
                                                    <SelectItem key={opt.key}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>

                                        <div className="new-series-footer">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="new-series-footer-cancel-btn"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="new-series-footer-save-btn"
                                            >
                                                {initialValues ? "Update" : "Save"}
                                            </button>
                                        </div>
                                    </div>
                                </ModalBody>
                            </form>
                        )}
                    </Formik>
                )}
            </ModalContent>
        </Modal>
    );
}