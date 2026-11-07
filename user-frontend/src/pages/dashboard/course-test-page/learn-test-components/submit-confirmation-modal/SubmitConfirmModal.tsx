// import { FinalSubmisisonType } from "@/services/my-learning.service";
import type { FinalSubmitTest_BodyData } from "@/services/my-learning.service";
import CloseIcon from "@/svg/CloseIcon";
import {
    Modal,
    ModalContent,
    ModalBody,
} from "@heroui/react";
import { useParams } from "react-router";

export default function SubmitConfirmModal({ isOpen, onClose, onOpenChange, handleSubmitQuizz }: SubmitConfirmModalProp) {
    const slug = useParams<{ topicId: string, courseId: string }>();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                disableAnimation={true}
                hideCloseButton={true}
                placement="center"
                classNames={{
                    backdrop: "bg-[#EAEAEF66]",
                    base: "max-w-[689px] p-4"
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalBody>
                                <div className="flex justify-end">
                                    <button onClick={onClose}><CloseIcon /></button>
                                </div>
                                <h2 className="text-center text-[#211C37] lg:text-[24px] font-semibold">Are you sure you want to submit?</h2>
                                <div className=" flex justify-center gap-x-4 mt-8">
                                    <button onClick={() => {
                                        if (slug?.topicId && slug?.courseId) {
                                            handleSubmitQuizz({ testSeriesId: slug?.topicId, courseId: slug?.courseId })
                                        }
                                    }} className="font-semibold text-[16px] text-white h-[54px] bg-primary rounded-[16px] w-full">Submit</button>
                                    <button onClick={onClose} className="font-semibold text-[16px] text-primary h-[54px] bg-white border border-primary rounded-[16px] w-full">Cancel</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}


interface SubmitConfirmModalProp {
    isOpen: boolean,
    onOpenChange: () => void,
    onClose: () => void,
    handleSubmitQuizz: (data: FinalSubmitTest_BodyData) => void
}