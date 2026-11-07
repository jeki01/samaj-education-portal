import { previewSelectedAnswer } from "@/helper/global.helper";
import ColumnFrame from "@/pages/dashboard/components/ColumnFrame";
import DeleteIcon from "@/svg/DeleteIcon";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import ExcelUpload from "@/ui/bulk-upload/ExcelUpload";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import type { FormikProps } from "formik";
import { useState } from "react";
import AddQuesModal from "./add-question-modal/AddQuesModal";
import type { AssessmentI, TestTopicQuestionI } from "./useTestSeriesStep";

const OPTIONS = [
    { key: "option1", imageKey: "option1Image", label: "A" },
    { key: "option2", imageKey: "option2Image", label: "B" },
    { key: "option3", imageKey: "option3Image", label: "C" },
    { key: "option4", imageKey: "option4Image", label: "D" },
    { key: "option5", imageKey: "option5Image", label: "E" },
] as const;


export default function TestSeries({
    formik,
    keyName,
    sectionTitle,
}: TestSeriesProp) {
    const addEditModal = useDisclosure();
    const deleteModal = useDisclosure();

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const questions = formik.values[keyName] as TestTopicQuestionI[];

    const handleSave = (question: TestTopicQuestionI) => {
        if (editIndex !== null) {
            const updated = [...questions];
            updated[editIndex] = question;
            formik.setFieldValue(keyName, updated);
        } else {
            formik.setFieldValue(keyName, [...questions, question]);
        }
        setEditIndex(null);
    };

    const handleDelete = () => {
        if (deleteIndex === null) return;
        formik.setFieldValue(
            keyName,
            questions.filter((_, i) => i !== deleteIndex)
        );
        setDeleteIndex(null);
        deleteModal.onClose();
    };

    const handleBulkUploadedData = (data: TestTopicQuestionI[]) => {
        formik.setFieldValue(keyName, [...questions, ...data]);
    };

    return (
        <>
            <ExcelUpload handleBulkUploadedData={handleBulkUploadedData} />

            <ColumnFrame
                title={sectionTitle}
                col_type="start"
                handleAddNew={() => {
                    setEditIndex(null);
                    addEditModal.onOpen();
                }}
                base="!w-full !max-w-full"
                bodyClass="!min-h-[300px] !h-[300px]"
            >
                <div className="max-h-[290px] overflow-auto">
                    <table className="w-full border-collapse text-[14px]">
                        <thead className="sticky top-0 z-10 bg-[#e7dcfd]">
                            <tr className="border-y border-[#CFD1DD] h-[60px]">
                                <th className="px-4 text-left font-semibold w-[50px]">
                                    S.No.
                                </th>
                                <th className="px-4 text-left font-semibold">
                                    Question
                                </th>
                                <th className="px-4 text-center font-semibold w-[180px]">
                                    Correct Answer
                                </th>
                                <th className="px-4 text-center font-semibold w-[150px]">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {questions.map((q, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-[#CFD1DD] hover:bg-[#ffffff]"
                                >
                                    {/* S.NO */}
                                    <td className="px-4 py-3 align-top">
                                        {idx + 1}
                                    </td>

                                    {/* QUESTION + OPTIONS */}
                                    <td className="px-4 py-3">
                                        <div className="mb-2 font-medium">
                                            {q.question} {q.questionImage && "📎"}
                                        </div>

                                        <ul className="space-y-1 text-gray-700 flex items-start gap-2">
                                            {OPTIONS.map(({ key, imageKey, label }) =>
                                                q[key] || q[imageKey] ? (
                                                    <li key={key} title={q[key]}>
                                                        <b>{label}.</b>{" "}
                                                        <span className="line-clamp-1">
                                                            {q[key] || "File"}
                                                        </span>
                                                    </li>
                                                ) : null
                                            )}
                                        </ul>
                                    </td>

                                    {/* CORRECT ANSWER */}
                                    <td className="px-4 py-3 text-center font-semibold align-top">
                                        {previewSelectedAnswer(
                                            [
                                                { key: "option1", label: "A" },
                                                { key: "option2", label: "B" },
                                                { key: "option3", label: "C" },
                                                { key: "option4", label: "D" },
                                                { key: "option5", label: "E" },
                                            ],
                                            q.answer
                                        )}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-4 py-3 align-top">
                                        <div className="flex justify-center gap-x-3">
                                            <button
                                                onClick={() => {
                                                    setEditIndex(idx);
                                                    addEditModal.onOpen();
                                                }}
                                            >
                                                <EditPrimaryIcon />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeleteIndex(idx);
                                                    deleteModal.onOpen();
                                                }}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </ColumnFrame>

            <Modal isOpen={deleteModal.isOpen} onOpenChange={deleteModal.onOpenChange} disableAnimation>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Are you sure?</ModalHeader>
                            <ModalBody>Delete this question?</ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <AddQuesModal
                isOpen={addEditModal.isOpen}
                onOpenChange={addEditModal.onOpenChange}
                initialValues={editIndex !== null ? questions[editIndex] : undefined}
                onSave={handleSave}
            />
        </>
    );
}

interface TestSeriesProp {
    formik: FormikProps<AssessmentI>;
    keyName: keyof AssessmentI;
    sectionTitle: string;
}
