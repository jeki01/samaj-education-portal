import CloseMenuIcon from "@/svg/CloseMenuIcon";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@heroui/react";
import type { currentSelectedTestI } from "../hook/useCompetition";
import CashPrimaryIcon from "@/svg/CashPrimaryIcon";
import LinkColoredIcon from "@/svg/LinkColoredIcon";
import { handleWalletPrice } from "@/helper/course-pricing.helper";
import { formatNumber } from "@/helper/global.helper";

export default function BuyCompetitionTestModal({ isOpen, onOpenChange, onClose, currentSelectedTest, handleEnrollNow, walletBalance }: ChangePassModalProps) {


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
                    base: "md:px-[40px] p-[20px] max-w-[592px] md:mx-0 mx-3 !my-auto",
                    body: "p-0"
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex items-center justify-between gap-1 mb-0 px-0">
                                <span className="text-[#211C37] font-semibold md:text-[20px] text-[16px]">Enroll Now, Compete like the Real Exam!</span>
                                <button type="button" onClick={onClose}><CloseMenuIcon /></button>
                            </ModalHeader>
                            <ModalBody>
                                <div className="scheduled-test-name">{currentSelectedTest?.testName || "-"} </div>
                                <div className="scheduled-test-card">
                                    <div className="scheduled-test__content">
                                        <div className="scheduled-test__amount">₹ {currentSelectedTest?.testPrice ? formatNumber(Number(currentSelectedTest?.testPrice)) : "-"}/-</div>
                                        <div className="scheduled-test__text">Pay now & schedule your test!</div>
                                    </div>
                                    {/* <div className="scheduled-test__image">
                                        <img src="/schedule-buy-img.svg" alt="buy-img" />
                                    </div> */}
                                </div>
                                <div className="scheduled-test-payment-details">
                                    <div className="your-wallet-balance"><CashPrimaryIcon /> Your Wallet Balance Utilized: <span>₹{formatNumber(handleWalletPrice(Number(currentSelectedTest?.testPrice), walletBalance))}</span></div>
                                    <div className="net-payable">Net Payable: <span>₹{formatNumber(Number(currentSelectedTest?.testPrice) - handleWalletPrice(Number(currentSelectedTest?.testPrice), walletBalance)) || 0}</span></div>
                                </div>
                                <div className="scheduled-test-referral-rewards">
                                    <div className="referral-rewards-header"><LinkColoredIcon /> Referral Rewards:</div>
                                    <div className="referral-rewards-details">Earn <span> 10% credit</span> for every successful referral.</div>
                                    <div className="referral-rewards-details">Refer up to <span> 10 friends </span>& get 100%  of your fee back in credits!</div>
                                </div>
                                <p className="scheduled-test__note">*Credits are non-withdrawable and can be used to purchase future tests & courses on Bussibees platform.</p>
                                <button onClick={() => handleEnrollNow(onClose)} className="scheduled-test-enroll-btn">Enroll Now</button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

interface ChangePassModalProps {
    isOpen: boolean,
    onOpenChange: () => void,
    onClose: () => void,
    currentSelectedTest: currentSelectedTestI | null,
    handleEnrollNow: (onClose: () => void) => void,
    walletBalance: number
}