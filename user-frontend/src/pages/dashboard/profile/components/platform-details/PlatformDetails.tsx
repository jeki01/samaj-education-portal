import UserOutlineIcon from "@/svg/UserOutlineIcon";
import "./platform-details.css";
import SectionTitle from "@/ui/section-title/SectionTitle";
// import MobileIcon from "@/svg/MobileIcon";
import LockIcon from "@/svg/LockIcon";
import VerifiedIcon from "@/svg/VerifiedIcon";
import ChangePassModal from "./change-pass-modal/ChangePassModal";
import { useDisclosure } from "@heroui/react";
import type { ProfileDetailsDataI } from "../../hooks/useProfileDetails";
import EmailIcon from "@/svg/EmailIcon";

export default function PlatformDetails({ ProfileDetailsData }: PlatformDetailsProp) {
    const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();
    return (
        <>
            <div className="platform-details-base">
                <SectionTitle text="Platform details" Icon={<UserOutlineIcon />} />
                <div className="platform-details-container">
                    <div className="comp-profile-form-row">
                        <div className="input-field gap-x-2">
                            <div className="flex items-center max-w-[74%]">
                                <EmailIcon />
                                <div className="pl-2 text-[14px]  line-clamp-1">{ProfileDetailsData?.email || ""}</div>
                            </div>
                            <div className="verify-btn"><VerifiedIcon /> Verified</div>
                        </div>
                        <div className="input-field profile--pass--field">
                            <LockIcon />
                            <div className="pl-2 text-[14px] w-full pt-[6px]">************</div>
                            <button onClick={onOpen} className="change-pass-btn">Change Password</button>
                        </div>
                        <div className="w-[33%]"></div>
                    </div>
                </div>
            </div>

            <ChangePassModal
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
            />
        </>
    )
}

interface PlatformDetailsProp {
    ProfileDetailsData: ProfileDetailsDataI
}