import { Modal, ModalBody, ModalContent } from "@heroui/react";
import "./add-new-seriec-modal.css";
import AddPrimaryIcon from "@/svg/AddPrimaryIcon";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import DeleteIcon from "@/svg/DeleteIcon";
import AddQuesModal from "../add-question-modal/AddQuesModal";
import type { ChangeEvent } from "react";
import type { QuestionForm } from "../../../hooks/useTestSeries";
import ExcelUpload from "@/ui/bulk-upload/ExcelUpload";
import { previewSelectedAnswer } from "@/helper/global.helper";

export const optionAnswerList = [
    { key: "option1", label: "A" },
    { key: "option2", label: "B" },
    { key: "option3", label: "C" },
    { key: "option4", label: "D" },
    { key: "option5", label: "E" },
];

export default function AddNewSeriesModal({
    isOpen, onOpenChange, handleOnChangeTestSeriesName,
    newTopicName, handleAddTestSeries,
    questionData,
    handleChangeQueAns,
    handleAddTopicQuestions,
    isOpenQue,
    onOpenChangeQue,
    onOpenQue,
    questionList,
    isEdit,
    handleUpdateTestSeries,
    handleEditTopicQuestions,
    handleUpdateTopicQuestions,
    isEditQue,
    handleDeleteTopicQuestions,
    handleCancelTopicAndQueModal,
    handleBulkUploadedData,
    handleOnCancelAddQuesModal
}: AddNewSeriesModalProp) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                disableAnimation={true}
                isDismissable={false}
                hideCloseButton={true}
                classNames={{
                    base: "max-w-[1500px]"
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalBody>
                                <div className="new-series-base">
                                    <div className="new-series-head">New Test Series</div>
                                    {/* Main body */}
                                    <div className="new-series-body">
                                        <div className="new-series-name-input-base">
                                            <div>1</div>
                                            <input
                                                type="text"
                                                placeholder="Enter Test Series Name"
                                                className="new-series-name-input-field"
                                                value={newTopicName}
                                                onChange={handleOnChangeTestSeriesName}
                                            />
                                        </div>
                                        <div className="new-series-question-head">
                                            <div className="font-semibold">Question</div>
                                            <button onClick={onOpenQue} className="new-series-question-add-btn">Add New <AddPrimaryIcon /></button>
                                        </div>
                                        {/*  */}
                                        <ExcelUpload handleBulkUploadedData={handleBulkUploadedData} />
                                        {/*  */}
                                        {/* List head */}
                                        <div className="new-series-question-list-thead">
                                            <div className="new-series-question-list-thead-label">S.No.</div>
                                            <div className="new-series-question-list-thead-label">Question</div>
                                            <div className="new-series-question-list-thead-label">Correct Answer</div>
                                            <div className="new-series-question-list-thead-label">Action</div>
                                        </div>
                                        {/* List body */}
                                        <ul className="new-series-question-list-tbody">
                                            {
                                                questionList.length > 0 &&
                                                questionList.map((topic, idx) => {
                                                    return <li key={idx} className="new-series-question-li">
                                                        <div className="new-series-question-item">{idx + 1}</div>
                                                        <div className="new-series-question-item">
                                                            <div className="mb-2">{topic.question} {topic?.questionImage && "File"}</div>
                                                            <ul className="new-series-answer-list">
                                                                <li className="new-series-answer-option" title={topic?.option1}><b>A.</b> <span className="line-clamp-1">{topic?.option1 ? topic?.option1 : topic?.option1Image ? "File" : ""}</span></li>
                                                                <li className="new-series-answer-option" title={topic?.option2}><b>B.</b> <span className="line-clamp-1">{topic?.option2 ? topic?.option2 : topic?.option2Image ? "File" : ""}</span></li>
                                                                <li className="new-series-answer-option" title={topic?.option3}><b>C.</b> <span className="line-clamp-1">{topic?.option3 ? topic?.option3 : topic?.option3Image ? "File" : ""}</span></li>
                                                                <li className="new-series-answer-option" title={topic?.option4}><b>D.</b> <span className="line-clamp-1">{topic?.option4 ? topic?.option4 : topic?.option4Image ? "File" : ""}</span></li>
                                                                {
                                                                    (topic?.option5 || topic?.option5Image) &&
                                                                    <li className="new-series-answer-option" title={topic?.option5}><b>E.</b> <span className="line-clamp-1">{topic?.option5 ? topic?.option5 : topic?.option5Image ? "File" : ""}</span></li>
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div className="new-series-question-item font-semibold">{previewSelectedAnswer(optionAnswerList, topic?.answer)}</div>
                                                        <div className="new-series-question-item flex gap-x-2">
                                                            <button onClick={() => {
                                                                handleEditTopicQuestions(idx)
                                                            }}>
                                                                <EditPrimaryIcon />
                                                            </button>
                                                            <button onClick={() => {
                                                                handleDeleteTopicQuestions(idx)
                                                            }}>
                                                                <DeleteIcon />
                                                            </button>
                                                        </div>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    {/* Footer */}
                                    <div className="new-series-footer">
                                        <button onClick={handleCancelTopicAndQueModal} className="new-series-footer-cancel-btn">Cancel</button>
                                        {
                                            isEdit ?
                                                <button onClick={handleUpdateTestSeries} className="new-series-footer-save-btn">update</button>
                                                :
                                                <button onClick={handleAddTestSeries} className="new-series-footer-save-btn">Save</button>
                                        }
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <AddQuesModal
                onOpenChange={onOpenChangeQue}
                isOpen={isOpenQue}
                questionData={questionData}
                handleChangeQueAns={handleChangeQueAns}
                handleAddTopicQuestions={handleAddTopicQuestions}
                handleUpdateTopicQuestions={handleUpdateTopicQuestions}
                isEditQue={isEditQue}
                handleOnCancelAddQuesModal={handleOnCancelAddQuesModal}
            />
        </>
    )
}

interface AddNewSeriesModalProp {
    isOpen: boolean
    onOpenChange: () => void,
    newTopicName: string,
    handleOnChangeTestSeriesName: (e: ChangeEvent<HTMLInputElement>) => void,
    handleAddTestSeries: () => void,
    handleChangeQueAns: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    questionData: QuestionForm,
    handleAddTopicQuestions: () => void,
    isOpenQue: boolean,
    onOpenChangeQue: () => void,
    onOpenQue: () => void,
    questionList: QuestionForm[],
    isEdit: boolean,
    handleUpdateTestSeries: () => void,
    handleEditTopicQuestions: (i: number) => void,
    handleUpdateTopicQuestions: () => void,
    isEditQue: boolean,
    handleDeleteTopicQuestions: (i: number) => void,
    handleCancelTopicAndQueModal: () => void,
    handleBulkUploadedData: (a: QuestionForm[]) => void,
    handleOnCancelAddQuesModal: () => void
}
