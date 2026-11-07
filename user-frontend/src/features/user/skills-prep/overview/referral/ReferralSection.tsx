import { useReferral } from "@/hooks/useReferral";
import LinkIcon from "@/svg/LinkIcon";
import SkillReferralIcon from "@/svg/SkillReferralIcon";
import { Tooltip } from "@heroui/react";

export default function ReferralSection() {
    const { copied, tooltipMessage, handleCopy, handleOnMouseEnter, handleOnMouseLeave, referralUrl, isEligibleForSkillRefer } = useReferral();
    return (
        <div className="mt-8">
            <div className="bg-white shadow-[0_0px_2px_0px_#00000033] rounded-lg p-4 border border-[#A674F9]">
                <div className="bg-[#F7F1FF] px-4 rounded-lg flex items-center justify-between [&>svg]:w-[100px] [&>svg]:h-[100px]">
                    <div>
                        <div className="font-semibold text-[#9533FB] text-2xl">Refer & Earn</div>
                        <div>Share your referral link and earn rewards</div>
                    </div>
                    <SkillReferralIcon />
                </div>
                <div className="text-[#4C4C4D] mt-4">Your Invite Link</div>
                <div className={`flex items-center gap-2 mt-2 bg-[#F7F0FF] rounded-sm justify-between ${!isEligibleForSkillRefer ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <div className="rounded-lg p-2 text-[12px] flex items-center gap-2"><LinkIcon /> {referralUrl}</div>
                    <Tooltip
                        content={tooltipMessage}
                        isOpen={copied}
                        closeDelay={0}
                    >
                        <button
                            disabled={!isEligibleForSkillRefer}
                            onClick={handleCopy}
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            className="bg-[#9533FB] text-white text-[14px] font-semibold max-w-[200px] w-full rounded-md py-1 disabled:cursor-not-allowed"
                        >
                            Copy Link
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
