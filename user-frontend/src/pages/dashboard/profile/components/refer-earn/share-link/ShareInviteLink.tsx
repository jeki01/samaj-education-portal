import CopyIcon from "@/svg/CopyIcon";
import { Tooltip } from "@heroui/react";
import { useState } from "react";
import { useParams } from "react-router";

export default function ShareInviteLink({ name, id, courseId, referType }: ShareInviteLinkProps) {
    const [copied, setCopied] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState("Copy");
    const slug = useParams<{ courseId: string }>();

    async function handleCopy() {
        const message = `Hey I am ${name} and I invited you to this platform. Join now.`;

        const referParamUrl = `${referType === "test" ? `testId=${courseId}` : `courseId=${courseId ? courseId : slug.courseId}`}`;

        const url = window.location.origin + `/login?referId=${id}&${referParamUrl}`;

        const fullText = `${url} ${message}`;
        await navigator.clipboard.writeText(fullText);
        setCopied(true)
        setTooltipMessage("Copied")
        setTimeout(() => {
            setTooltipMessage("Copy")
            setCopied(false)
        }, 1000);
    }
    return (
        <>
            <Tooltip
                content={tooltipMessage}
                isOpen={copied}
                closeDelay={0}
            >
                <button
                    onClick={handleCopy}
                    onMouseEnter={() => setCopied(true)}
                    onMouseLeave={() => {
                        if (tooltipMessage === "Copy") {
                            setCopied(false)
                        }
                    }}
                >
                    <CopyIcon />
                </button>
            </Tooltip>
        </>
    )
}

interface ShareInviteLinkProps {
    name: string,
    id: string,
    courseId?: string,
    referType?: "course" | "test"
}