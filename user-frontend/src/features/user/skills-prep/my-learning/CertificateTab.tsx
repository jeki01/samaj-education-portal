import LockOutlineIcon from "@/svg/LockOutlineIcon";
import { useContext } from "react";
import CertificateMain from "./components/CertificateMain";
import { SkillLearnContext } from "./context/SkillLearnContext";
export default function CertificateTab() {
    const { assessmentScore, handleChangeCourseTab } = useContext(SkillLearnContext);
    return (
        <div>
            {
                assessmentScore?.percentage !== null ?
                    <CertificateMain />
                    :
                    <CertificateLocked />
            }
        </div>
    )

    // function CertificateUI() {
    //     return (
    //         <div className="w-full max-w-[1152px] mx-auto">
    //             <div className="
    //     relative
    //     border border-[#9533FB]
    //     rounded-lg
    //     p-6
    //     flex flex-col
    //     justify-around
    //     items-center
    //     gap-4
    //     w-full
    //     aspect-[1152/556]
    //     bg-white
    //     overflow-hidden
    //   ">
    //                 {/* Background Decorations */}
    //                 <img
    //                     src="/certificate-top-bg.svg"
    //                     alt="top-right-img"
    //                     className="absolute top-0 right-0 w-[25%] max-w-[250px]"
    //                 />
    //                 <img
    //                     src="/certificate-bottom-bg.svg"
    //                     alt="bottom-left-img"
    //                     className="absolute bottom-0 left-0 w-[25%] max-w-[250px]"
    //                 />

    //                 {/* Main Content */}
    //                 <div className="w-full h-full max-w-[700px] mx-auto flex flex-col items-center justify-evenly gap-4 text-center px-4">

    //                     <img
    //                         src="/brand-logo.svg"
    //                         alt="logo"
    //                         className="w-[120px] md:w-[146px]"
    //                     />

    //                     <div className="font-medium text-xl md:text-4xl tracking-wide">
    //                         CERTIFICATE OF COMPLETION
    //                     </div>

    //                     <div className="text-sm md:text-lg">
    //                         Presented To
    //                     </div>

    //                     <div className="w-full">
    //                         <div className="font-semibold text-2xl md:text-5xl">
    //                             John Doe
    //                         </div>

    //                         <div className="bg-[#9533FB] mt-2 mb-6 h-[1px] w-full max-w-[360px] mx-auto"></div>

    //                         <p className="text-sm md:text-base px-2">
    //                             In recognition of the successful completion and active participation
    //                             in the ReactJS Skill Development Program.
    //                         </p>
    //                     </div>

    //                     {/* Footer Section */}
    //                     <div className="flex items-end justify-between gap-4 w-full flex-wrap md:flex-nowrap">

    //                         {/* Date */}
    //                         <div className="flex flex-col items-center min-w-[120px] gap-1">
    //                             <div className="text-xs md:text-sm px-4">
    //                                 10 January, 2026
    //                             </div>
    //                             <div className="bg-[#9533FB] h-[1px] w-full"></div>
    //                             <div className="text-xs md:text-sm">
    //                                 Date
    //                             </div>
    //                         </div>

    //                         <CertificateBadgeIcon />

    //                         {/* Signature */}
    //                         <div className="flex flex-col items-center min-w-[120px] gap-1">
    //                             <img
    //                                 src="/hand-signature.png"
    //                                 alt="hand-signature"
    //                                 className="max-h-[40px] md:max-h-[60px]"
    //                             />
    //                             <div className="bg-[#9533FB] h-[1px] w-full"></div>
    //                             <div className="text-xs md:text-sm">
    //                                 Signature
    //                             </div>
    //                         </div>

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    // function CertificateUI() {
    //     return <div className="border border-[#9533FB] rounded-lg p-4 flex flex-col justify-around items-center gap-4 h-[556px] relative">
    //         <img src="/certificate-top-bg.svg" alt="top-right-img" className="absolute top-0 right-0" />
    //         <img src="/certificate-bottom-bg.svg" alt="bottom-left-img" className="absolute bottom-0 left-0" />
    //         <div className="w-full h-full max-w-[600px] mx-auto flex flex-col items-center justify-evenly gap-4">
    //             <img src="/brand-logo.svg" alt="logo" className="w-[146px] h-[45px]" />
    //             <div className="font-medium text-4xl">CERTIFICATE OF COMPLETION</div>
    //             <div className="text-lg">Presented To</div>
    //             <div className="w-full">
    //                 <div className="text-center font-semibold text-5xl">John Doe</div>
    //                 <div className="bg-[#9533FB] mt-2 mb-8 h-[1px] w-full max-w-[360px] mx-auto"></div>
    //                 <p className="text-center">In recognition of the successful completion and active participation
    //                     in the ReactJS Skill Development Program.</p>
    //             </div>
    //             <div className="flex items-end justify-between gap-4 w-full">
    //                 <div className="flex flex-col items-center min-w-[162px] gap-1">
    //                     <div className="text-[14px] px-6">10 January, 2026</div>
    //                     <div className="bg-[#9533FB] h-[1px] w-full"></div>
    //                     <div className="text-[14px]">Date</div>
    //                 </div>
    //                 <CertificateBadgeIcon />
    //                 <div className="flex flex-col items-center min-w-[162px] gap-1">
    //                     <img src="/hand-signature.png" alt="hand-signature" />
    //                     <div className="bg-[#9533FB] h-[1px] w-full"></div>
    //                     <div className="text-[14px]">Signature</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // }

    function CertificateLocked() {
        return <div>
            <div className="border border-[#9533FB] rounded-lg p-4 flex flex-col justify-around items-center gap-4">
                <div className="font-semibold">Unlock Your Achievement!</div>
                <LockOutlineIcon />
                <div className="text-[14px]">Complete the final Assessment to unlock your certificate.</div>
            </div>
            <div className="flex justify-center mt-12">
                <button type="button" onClick={() => handleChangeCourseTab("assessment")} className="text-[14px] w-full max-w-[363px] rounded-md text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)] py-1 px-4">Go To Assessments</button>
            </div>
        </div>
    }
}
