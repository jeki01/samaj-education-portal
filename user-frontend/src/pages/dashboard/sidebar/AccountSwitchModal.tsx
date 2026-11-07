import { useAccount } from "@/context/account/AccountContext";
import useSwitchAccount from "@/hooks/useSwitchAccount";
import SelectFieldImgIcon from "@/svg/SelectFieldImgIcon";
import TypeBox from "@/ui/type-box/TypeBox";
import { Modal, ModalBody, ModalContent } from "@heroui/react";

export default function AccountSwitchModal({ isOpen, onOpenChange }: AccountSwitchModalProp) {
    const { handleSwitchAccount } = useSwitchAccount();
    const { accountMode } = useAccount();
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            disableAnimation={true}
            hideCloseButton
            placement="center"
            classNames={{
                backdrop: "bg-[#EAEAEF66] backdrop-opacity-60",
                base: "md:p-[20px] p-[20px] max-w-[592px] md:mx-0 mx-4",
                body: "px-0"
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        {/* <ModalHeader className="flex items-center justify-between gap-1 md:mb-6 mb-0">
                            <span className="text-[#211C37] font-semibold md:text-[20px] text-[16px]">Account Switch</span>
                            <button type="button" onClick={onClose}><CloseMenuIcon /></button>
                        </ModalHeader> */}
                        <ModalBody>
                            <div className="px-4 flex flex-col items-center gap-3">
                                <div className="flex justify-center [&>svg]:w-[160px] [&>svg]:h-[160px]">
                                    <SelectFieldImgIcon />
                                </div>
                                <p className="text-[17px] font-bold text-center text-[#1a1a2e]">
                                    Select Your <span className="text-[#9533FB]">Preparation Type</span>
                                </p>
                                <p className="text-[13px] text-[#7a7a95] text-center -mt-1">Switch your account mode anytime</p>
                                <div className="flex flex-col gap-3 w-full mt-1">
                                    <div onClick={() => handleSwitchAccount("exam")} className="cursor-pointer w-full">
                                        <TypeBox
                                            text={"Government Exams Preparation"}
                                            image={<img src="/gov-exam-icon.svg" alt="government exam" />}
                                            isActive={accountMode === "exam"}
                                        />
                                    </div>
                                    <div onClick={() => handleSwitchAccount("skills")} className="cursor-pointer w-full">
                                        <TypeBox
                                            text={"Skills Preparation"}
                                            image={<img src="/skills-icon.svg" alt="skills" />}
                                            isActive={accountMode === "skills"}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-col gap-4">
                                <button type="button" onClick={() => handleSwitchAccount("exam")} className={`bg-[#F7F1FF] border ${accountMode === "exam" ? "border-[#9933FF]" : "border-transparent"}  p-2`}>Government Exam Preparation</button>
                                <button type="button" onClick={() => handleSwitchAccount("skills")} className={`bg-[#F7F1FF] border ${accountMode === "skills" ? "border-[#9933FF]" : "border-transparent"}  p-2`}>Skills Preparation</button>
                            </div> */}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

interface AccountSwitchModalProp {
    isOpen: boolean;
    onOpenChange: () => void;
}