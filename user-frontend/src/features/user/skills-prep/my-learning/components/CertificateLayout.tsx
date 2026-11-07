import CertificateBadgeIcon from "@/svg/CertificateBadgeIcon";

interface Props {
    name: string;
    date: string;
    course: string;
}

export default function CertificateLayout({ name, date, course }: Props) {
    return (
        <div
            style={{ width: 1152, height: 556 }}
            className="relative border border-[#9533FB] rounded-lg p-8 bg-white flex flex-col justify-around items-center"
        >
            <img
                src="/certificate-top-bg.svg"
                alt="top-right"
                className="absolute top-0 right-0"
            />
            <img
                src="/certificate-bottom-bg.svg"
                alt="bottom-left"
                className="absolute bottom-0 left-0"
            />

            <div className="w-full max-w-[700px] flex flex-col items-center justify-evenly gap-6 text-center">

                <img src="/brand-logo.svg" alt="logo" className="w-[146px]" />

                <div className="font-medium text-4xl tracking-wide">
                    CERTIFICATE OF COMPLETION
                </div>

                <div className="text-lg">Presented To</div>

                <div className="w-full">
                    <div className="flex flex-col items-center mb-8 gap-6">
                        <div
                            style={{
                                fontSize: 48,
                                fontWeight: 600,
                                lineHeight: 1.2,
                            }}
                        >
                            {name}
                        </div>

                        <div
                            style={{
                                width: 360,
                                height: 1,
                                backgroundColor: "#9533FB",
                                // marginTop: 12,
                            }}
                        />
                    </div>
                    <p>
                        In recognition of the successful completion and active participation
                        in the {course} Skill Development Program.
                    </p>
                </div>

                <div className="flex items-end justify-between gap-4 w-full">

                    <div className="flex flex-col items-center min-w-[162px] gap-2 max-h-[133px]">
                        <div className="text-[14px] px-6 pb-1">{date}</div>
                        <div className="bg-[#9533FB] h-[1px] w-full"></div>
                        <div className="text-[14px]">Date</div>
                    </div>
                    <CertificateBadgeIcon />

                    <div className="flex flex-col items-center min-w-[162px] gap-1 max-h-[133px]">
                        <img src="/hand-signature.png" alt="signature" />
                        <div className="bg-[#9533FB] h-[1px] w-full"></div>
                        <div className="text-[14px]">Signature</div>
                    </div>

                </div>
            </div>
        </div>
    );
}