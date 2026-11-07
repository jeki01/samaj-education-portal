import VideoEmbed from "@/ui/VideoEmbed";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import parse from "html-react-parser";
import { useContext } from "react";
import { SkillLearnContext } from "./context/SkillLearnContext";

export default function LectureDetailModal({ isOpen, onOpenChange }: LectureDetailModalProp) {
    const { courseDetails, lectureDetails, handleMarkAsRead } = useContext(SkillLearnContext);
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="5xl">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 border-b border-[#9533FB]">
                            {`${courseDetails?.SkillName} > ${lectureDetails?.name}`}
                        </ModalHeader>
                        <ModalBody>
                            <div className="p-4 overflow-y-auto h-[400px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-[#7433DA]">
                                <div className="[&>p]:text-[14px] [&>p]:leading-[20px] [&>p]:mb-2 [&>ul]:text-[14px] [&>ol]:text-[14px] [&>ol]:mb-2 [&>ul]:mb-2 [&>ol]:list-decimal [&>ul]:list-disc [&>ol]:pl-4 [&>ul]:pl-4">
                                    {lectureDetails?.about ? parse(lectureDetails?.about) : "NA"}
                                </div>
                                <div className="h-[300px] mb-4">
                                    {
                                        lectureDetails?.link &&
                                        <VideoEmbed url={lectureDetails?.link} />
                                    }
                                </div>
                                <div>
                                    <button type="button" onClick={() => handleMarkAsRead("lecture")} className="w-full text-[14px] rounded-lg text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)] py-2 px-4">Mark as Completed</button>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

interface LectureDetailModalProp {
    isOpen: boolean;
    onOpenChange: () => void;
}