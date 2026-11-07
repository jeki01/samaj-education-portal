import { useAccount } from "@/context/account/AccountContext";
import { useEffect, useState } from "react";

export function useReferral() {
    const [copied, setCopied] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState("Copy");
    const { accountId, isEligibleForSkillRefer } = useAccount();
    const [referralUrl, setReferralUrl] = useState("");

    useEffect(() => {
        function updateUrl() {
            const url = window.location.origin + `/login?skillRef=${accountId}`;
            setReferralUrl(url);
        }
        updateUrl()
    }, [accountId])


    async function handleCopy() {
        // const message = `Hey I invited you to this platform. Join now.`;

        const url = window.location.origin + `/login?skillRef=${accountId}`;
        setReferralUrl(url);

        const fullText = `${url}`;
        await navigator.clipboard.writeText(fullText);
        setCopied(true)
        setTooltipMessage("Copied")
        setTimeout(() => {
            setTooltipMessage("Copy")
            setCopied(false)
        }, 1000);
    }

    const handleOnMouseEnter = () => setCopied(true);

    const handleOnMouseLeave = () => {
        if (tooltipMessage === "Copy") {
            setCopied(false)
        }
    };

    return {
        handleCopy,
        copied,
        tooltipMessage,
        handleOnMouseEnter,
        handleOnMouseLeave,
        referralUrl,
        isEligibleForSkillRefer
    }
}