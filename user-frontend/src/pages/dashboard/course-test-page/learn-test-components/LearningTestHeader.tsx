import CountdownIcon from "@/svg/CountdownIcon";
import Countdown from "./Countdown";

export default function LearningTestHeader({ countdownTime, setTimeTakenByUser, setTestTimeLeftInSec }: LearningTestHeaderProp) {
    console.log("countdownTime", countdownTime);

    return (
        <>

            <div className="flex justify-between items-center h-[64px] test-learning-header">
                <img src="/brand-logo.svg" alt="logo" className="h-[45px]" />
                {
                    !isNaN(countdownTime) &&
                    <div className="flex items-center gap-x-4 time-remain-wrapper">
                        <div className="text-[20px] text-[#202020] font-medium text-nowrap">Time Remaining:</div>
                        <div className="border border-[#9533FB] bg-[#F7F1FF66] rounded-[12px] flex items-center gap-x-2 py-[8px] px-[20px] h-[46px] min-w-[140px] countdown-wrapperr">
                            <CountdownIcon />
                            <div className="text-[#9533FB] text-[16px] md:text-[20px] font-medium">
                                {countdownTime &&
                                    <Countdown
                                        initialSeconds={countdownTime}
                                        setTimeTakenByUser={setTimeTakenByUser}
                                        setTestTimeLeftInSec={setTestTimeLeftInSec}
                                    />
                                }
                                {/* 16:35 */}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

interface LearningTestHeaderProp {
    countdownTime: number,
    setTimeTakenByUser: React.Dispatch<React.SetStateAction<number>>,
    setTestTimeLeftInSec: React.Dispatch<React.SetStateAction<number | null>>,
}