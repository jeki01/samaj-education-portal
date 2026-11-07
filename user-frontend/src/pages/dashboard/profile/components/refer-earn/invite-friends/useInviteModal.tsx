
import { useParams } from "react-router";
import UseProfileDetails from "../../../hooks/useProfileDetails";

function useInviteModal(courseId?: string, referType?: "course" | "test") {
    const { ProfileDetailsData: ProfileDetails } = UseProfileDetails();
    const slug = useParams<{ courseId: string }>();

    const fullName = `${ProfileDetails.firstName + " " + (ProfileDetails.middleName || "") + " " + (ProfileDetails.lastName || "")}`;
    const userId = ProfileDetails?._id;

    const origin = window.location.origin;

    const referParamUrl = `${referType === "test" ? `testId=${courseId}` : `courseId=${courseId ? courseId : slug.courseId}`}`;

    const inviteMessage = `Hey I am ${fullName} and I invited you to this platform. Join now: ${origin}/login?referId=${userId}&${referParamUrl}`;
    const encodedMessage = encodeURIComponent(inviteMessage);
    const inviteUrl = `${origin}/login?referId=${userId}&${referParamUrl}`;
    const encodedUrl = encodeURIComponent(inviteUrl);

    const handleWhatsApp = () => {
        const url = `https://wa.me/?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    const handleTelegram = () => {
        const inviteMessage = `Hey I am ${fullName} and I invited you to this platform. Join now.`;
        const encodedMessage = encodeURIComponent(inviteMessage);
        const url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    const handleFacebook = async () => {
        const url = "https://www.facebook.com";
        await navigator.clipboard.writeText(inviteMessage);
        window.open(url, '_blank');
    };

    const handleInstagram = async () => {
        const url = "https://www.instagram.com";
        await navigator.clipboard.writeText(inviteMessage);
        window.open(url, '_blank');
    };

    return {
        handleFacebook,
        handleInstagram,
        handleTelegram,
        handleWhatsApp,
        fullName,
        userId,
        inviteUrl
    }
}

export { useInviteModal };