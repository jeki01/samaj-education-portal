// import ColumnFrame from "@/pages/dashboard/components/ColumnFrame";
import DeleteIcon from "@/svg/DeleteIcon";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
// import {
//     Modal,
//     ModalContent,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Button,
// } from "@heroui/react";
// import AddNewSeriesModal from "./add-new-series-modal/AddNewSeriesModal";
// import type { CreateCourseFormValues } from "../../gov-exam.types";
import type { FormikProps } from "formik";
import UseTestSeries from "../../hooks/useTestSeries";
import type { TestSeriesFormVal } from "./useTestSeriesStep";
import AddPrimaryIcon from "@/svg/AddPrimaryIcon";
import ExcelUpload from "@/ui/bulk-upload/ExcelUpload";
import { previewSelectedAnswer } from "@/helper/global.helper";
import AddQuesModal from "./add-question-modal/AddQuesModal";
export const optionAnswerList = [
    { key: "option1", label: "A" },
    { key: "option2", label: "B" },
    { key: "option3", label: "C" },
    { key: "option4", label: "D" },
    { key: "option5", label: "E" },
];
export default function TestSeries({ createCourseForm, keyName,
    //  sectionTitle
     }: TestSeriesProp) {

    const {
        // isOpen,
        // onOpen,
        // onOpenChange,
        // onOpenAddNew,
        // onOpenChangeAddNew,
        // isOpenAddNew,
        // handleOnChangeTestSeriesName,
        // newTopicName,
        // handleAddTestSeries,
        // setDeleteIndex,
        // handleDeleteTestSeries,
        questionData,
        handleChangeQueAns,
        handleAddTopicQuestions,
        isOpenQue,
        onOpenChangeQue,
        onOpenQue,
        questionList,
        // handleEditTestSeries,
        // isEdit,
        // handleUpdateTestSeries,
        handleEditTopicQuestions,
        handleUpdateTopicQuestions,
        isEditQue,
        handleDeleteTopicQuestions,
        // handleCancelTopicAndQueModal,
        handleBulkUploadedData,
        handleOnCancelAddQuesModal
    } = UseTestSeries(createCourseForm, keyName)
    return (
        <>
            <div className="new-series-base">
                {/* <div className="new-series-head">New Test Series</div> */}
                {/* Main body */}
                <div className="new-series-body">
                    {/* <div className="new-series-name-input-base">
                        <div>1</div>
                        <input
                            type="text"
                            placeholder="Enter Test Series Name"
                            className="new-series-name-input-field"
                            value={newTopicName}
                            onChange={handleOnChangeTestSeriesName}
                        />
                    </div> */}
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
                {/* <div className="new-series-footer">
                    <button onClick={handleCancelTopicAndQueModal} className="new-series-footer-cancel-btn">Cancel</button>
                    {
                        isEdit ?
                            <button onClick={handleUpdateTestSeries} className="new-series-footer-save-btn">update</button>
                            :
                            <button onClick={handleAddTestSeries} className="new-series-footer-save-btn">Save</button>
                    }
                </div> */}
            </div>
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
            {/* <ColumnFrame
                title={sectionTitle}
                col_type="start"
                handleAddNew={onOpenAddNew}
                base="!w-full !max-w-full"
                headbar="rounded-tr-[12px]"
                bodyClass="!min-h-[300px] !h-[300px]"
            >
                <ul>
                    <li className="flex justify-between items-center px-4 h-[60px] bg-[#6633CC0D] font-semibold  border-t border-b border=[#CFD1DD]">
                        <span className="w-[50px]">S.No.</span>
                        <span className="w-[calc(100%-200px)] text-center">Topic </span>
                        <span className="w-[150px]">Action</span>
                    </li>
                    <div className="test-course-list-body">
                        {
                            createCourseForm.values[keyName].length > 0 &&
                            createCourseForm.values[keyName].map(({ topicName }, idx) => {
                                return <li key={idx} className={`h-[60px] border-b border-[#CFD1DD] border-t-0 flex items-center justify-between px-4 hover:bg-[#6633CC0D] ${Number(1) === 1 ? "bg-[#6633CC0D]" : ""}`}>
                                    <div className="xl:text-[16px] text-[14px] w-[50px]">{idx + 1}</div>
                                    <div className="text-center xl:text-[16px] text-[14px] w-[calc(100%-200px)] line-clamp-1" title={topicName}>{topicName}</div>
                                    <div className="flex items-center gap-x-4 w-[150px]">
                                        <button onClick={() => {
                                            handleEditTestSeries(idx);
                                            onOpenAddNew()
                                        }}>
                                            <EditPrimaryIcon />
                                        </button>
                                        <button onClick={() => {
                                            setDeleteIndex(idx)
                                            onOpen();
                                        }}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </li>
                            })
                        }
                    </div>
                </ul>
            </ColumnFrame>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                            <ModalBody>
                                <p>
                                    Delete this Test Series
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => {
                                    handleDeleteTestSeries()
                                }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal> */}

            {/* Add New Modal */}
            {/* <AddNewSeriesModal
                isOpen={isOpenAddNew}
                onOpenChange={onOpenChangeAddNew}
                handleOnChangeTestSeriesName={handleOnChangeTestSeriesName}
                newTopicName={newTopicName}
                handleAddTestSeries={handleAddTestSeries}
                questionData={questionData}
                handleChangeQueAns={handleChangeQueAns}
                handleAddTopicQuestions={handleAddTopicQuestions}
                isOpenQue={isOpenQue}
                onOpenChangeQue={onOpenChangeQue}
                onOpenQue={onOpenQue}
                questionList={questionList}
                isEdit={isEdit}
                handleUpdateTestSeries={handleUpdateTestSeries}
                handleEditTopicQuestions={handleEditTopicQuestions}
                handleUpdateTopicQuestions={handleUpdateTopicQuestions}
                isEditQue={isEditQue}
                handleDeleteTopicQuestions={handleDeleteTopicQuestions}
                handleCancelTopicAndQueModal={handleCancelTopicAndQueModal}
                handleBulkUploadedData={handleBulkUploadedData}
                handleOnCancelAddQuesModal={handleOnCancelAddQuesModal}
            /> */}
        </>
    )
}

interface TestSeriesProp {
    createCourseForm: FormikProps<TestSeriesFormVal>,
    keyName: keyof TestSeriesFormVal,
    sectionTitle: string
}