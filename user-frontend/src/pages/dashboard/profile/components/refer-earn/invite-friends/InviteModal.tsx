import CloseIcon from "@/svg/CloseIcon";
import FacebookShareIcon from "@/svg/FacebookShareIcon";
import InstagramShareIcon from "@/svg/InstagramShareIcon";
import TelegramShareIcon from "@/svg/TelegramShareIcon";
import WhatsAppShareIcon from "@/svg/WhatsAppShareIcon";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@heroui/react";
import ShareInviteLink from "../share-link/ShareInviteLink";
import { useInviteModal } from "./useInviteModal";
import "./invite-friend.css";

export default function InviteModal({ isOpen, onOpenChange, courseId, referType }: InviteModalProps) {
    const {
        handleFacebook,
        handleInstagram,
        handleTelegram,
        handleWhatsApp,
        fullName,
        userId,
        inviteUrl
    } = useInviteModal(courseId, referType)

    return (
        <>
            <Modal
                isOpen={isOpen}
                closeButton={<div></div>}
                onOpenChange={onOpenChange}
                isDismissable={false}
                disableAnimation={true}
                placement="center"
                classNames={{
                    backdrop: "bg-[#EAEAEF66] backdrop-opacity-60",
                    base: "md:p-[40px] p-[20px] max-w-[592px] md:mx-0 mx-4",
                    body: "px-0"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center justify-between gap-1 md:mb-6 mb-0">
                                <span className="text-[#211C37] font-semibold text-[16px]"> Invite Friends</span>
                                <button onClick={onClose}><CloseIcon /></button>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-[#666687] text-[12px] text-center">You can invite your friends by sharing the link below:</p>
                                <div className="bg-[#7272720A] py-[14px] px-[17px] rounded-[16px] flex items-center justify-between">
                                    <div className="truncate text-[#666687] md:text-[14px] text-[12px] font-normal">{inviteUrl}</div>
                                    <ShareInviteLink name={fullName} id={userId} courseId={courseId} referType={referType}/>
                                </div>
                                <p className="text-[#666687] text-[12px] text-center">Or share via</p>
                                <div className="flex justify-around items-center mt-4">
                                    <button onClick={handleInstagram} className="flex flex-col items-center gap-y-2 invite-friend-shareable-link">
                                        <InstagramShareIcon />
                                        <div className="text-[#666687] text-[12px] text-center">Instagram</div>
                                    </button>
                                    <button onClick={handleTelegram} className="flex flex-col items-center gap-y-2 invite-friend-shareable-link">
                                        <TelegramShareIcon />
                                        <div className="text-[#666687] text-[12px] text-center">Telegram</div>
                                    </button>
                                    <button onClick={handleFacebook} className="flex flex-col items-center gap-y-2 invite-friend-shareable-link">
                                        <FacebookShareIcon />
                                        <div className="text-[#666687] text-[12px] text-center">Facebook</div>
                                    </button>
                                    <button onClick={handleWhatsApp} className="flex flex-col items-center gap-y-2 invite-friend-shareable-link">
                                        <WhatsAppShareIcon />
                                        <div className="text-[#666687] text-[12px] text-center">Whatsapp</div>
                                    </button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


interface InviteModalProps {
    isOpen: boolean,
    onOpenChange: () => void,
    courseId?: string,
    referType?: "course" | "test"
}