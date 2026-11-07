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
import type { FormikProps } from "formik";
// import type { CreateCourseFormValues } from "../../gov-exam.types";
import UseVideoLectures from "../../hooks/useVideoLectures";
import type { VideoLectureInitValI, VideoLectureStepInitValI } from "./useVideoLectureStep";

export default function VideoLectures({ createCourseForm, keyName, sectionTitle }: VideoLecturesProp) {
    const {
        handleAddNewField,
        isNewFeild,
        isEdit,
        isOpen,
        onOpenChange,
        onOpen,
        newVideoLink,
        newVideoName,
        handleOnChangeVideoLectureName,
        handleOnChangeVideoLectureFile,
        handleAddVideoLecture,
        handleEditVideoLecture,
        handleUpdateVideoLecture,
        handleDeleteVideoLecture,
        setDeleteIndex
    } = UseVideoLectures(createCourseForm, keyName)
    return (
        <>
            <ColumnFrame
                title={sectionTitle}
                col_type="start"
                handleAddNew={handleAddNewField}
                base="!w-full !max-w-full"
                headbar="rounded-tr-[12px]"
                bodyClass="!min-h-[300px] !h-[300px]"
            >
                <ul>
                    {/* <thead> */}
                    <li className="flex justify-between items-center px-4 h-[60px] bg-[#6633CC0D] font-semibold  border-t border-b border=[#CFD1DD]">
                        <span className="w-[50px]">S.No.</span>
                        <span className="w-[150px]">Video Lectures </span>
                        <span className="w-[150px]">Link</span>
                        <span className="w-[150px]">Action</span>
                    </li>
                    {
                        isNewFeild &&
                        <li className=" rounded-xl h-[60px] flex items-center justify-between px-4 shadow-xl">
                            <div className="xl:text-[16px] text-[14px] w-[50px]">{createCourseForm.values[keyName].length + 1}</div>
                            <input
                                type="text"
                                placeholder="Enter Video Lectures"
                                className="w-full mx-2 outline-none h-full"
                                value={newVideoName}
                                onChange={handleOnChangeVideoLectureName}
                            />
                            <input
                                type="text"
                                placeholder="Link"
                                name=""
                                id=""
                                className="w-full mx-2 outline-none h-full"
                                value={newVideoLink}
                                onChange={handleOnChangeVideoLectureFile}
                            />
                            {
                                isEdit ?
                                    <button
                                        onClick={handleUpdateVideoLecture}
                                        className="bg-[linear-gradient(#6633CC,#9933FF)] text-white py-2 px-4 rounded-xl w-[150px]"
                                    >update</button>
                                    :
                                    <button
                                        onClick={handleAddVideoLecture}
                                        className="bg-[linear-gradient(#6633CC,#9933FF)] text-white py-2 px-4 rounded-xl w-[150px]"
                                    >Save</button>
                            }
                        </li>
                    }
                    <div className="video-course-list-body">
                        {
                            createCourseForm.values[keyName].length > 0 &&
                            createCourseForm.values[keyName].map(({ videoLectureLink, videoLectureName }, idx) => {
                                return <li key={idx} className={`h-[60px] border-b border-[#CFD1DD] border-t-0 flex items-center justify-between px-4 hover:bg-[#6633CC0D] ${Number(1) === 1 ? "bg-[#6633CC0D]" : ""}`}>
                                    <div className="xl:text-[16px] text-[14px] w-[50px]">{idx + 1}</div>
                                    <div className="xl:text-[16px] text-[14px] w-[150px]">{videoLectureName}</div>
                                    <div className="xl:text-[16px] text-[14px] w-fit p-2 px-4 truncate max-w-[300px]">{videoLectureLink}</div>
                                    <div className="flex items-center gap-x-4 w-[150px]">
                                        <button onClick={() => handleEditVideoLecture(idx)}>
                                            <EditPrimaryIcon />
                                        </button>
                                        <button onClick={() => {
                                            setDeleteIndex(idx)
                                            onOpen()
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
                                    Delete this Video Lectures
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => {
                                    handleDeleteVideoLecture()
                                }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

interface VideoLecturesProp {
    createCourseForm: FormikProps<VideoLectureInitValI>,
    keyName: keyof VideoLectureStepInitValI,
    sectionTitle: string
}
