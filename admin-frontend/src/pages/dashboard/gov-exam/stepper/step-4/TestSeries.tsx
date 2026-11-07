import ColumnFrame from "@/pages/dashboard/components/ColumnFrame";
import DeleteIcon from "@/svg/DeleteIcon";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import AddNewSeriesModal from "./add-new-series-modal/AddNewSeriesModal";
// import type { CreateCourseFormValues } from "../../gov-exam.types";
import type { FormikProps } from "formik";
import UseTestSeries from "../../hooks/useTestSeries";
import type { TestSeriesFormVal, TestSeriesStepInitValI } from "./useTestSeriesStep";

export default function TestSeries({ createCourseForm, keyName, sectionTitle }: TestSeriesProp) {

    const {
        isOpen,
        onOpen,
        onOpenChange,
        onOpenAddNew,
        onOpenChangeAddNew,
        isOpenAddNew,
        handleOnChangeTestSeriesName,
        newTopicName,
        handleAddTestSeries,
        setDeleteIndex,
        handleDeleteTestSeries,
        questionData,
        handleChangeQueAns,
        handleAddTopicQuestions,
        isOpenQue,
        onOpenChangeQue,
        onOpenQue,
        questionList,
        handleEditTestSeries,
        isEdit,
        handleUpdateTestSeries,
        handleEditTopicQuestions,
        handleUpdateTopicQuestions,
        isEditQue,
        handleDeleteTopicQuestions,
        handleCancelTopicAndQueModal,
        handleBulkUploadedData,
        handleOnCancelAddQuesModal
    } = UseTestSeries(createCourseForm, keyName)
    return (
        <>
            <ColumnFrame
                title={sectionTitle}
                col_type="start"
                handleAddNew={onOpenAddNew}
                base="!w-full !max-w-full"
                headbar="rounded-tr-[12px]"
                bodyClass="!min-h-[300px] !h-[300px]"
            >
                <ul>
                    {/* <thead> */}
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
            </Modal>

            {/* Add New Modal */}
            <AddNewSeriesModal
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
            />
        </>
    )
}

interface TestSeriesProp {
    createCourseForm: FormikProps<TestSeriesStepInitValI>,
    keyName: keyof TestSeriesFormVal,
    sectionTitle: string
}