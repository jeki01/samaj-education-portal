import React from "react";

type Props = {
    url: string;
    height?: number;
};

const VideoEmbed: React.FC<Props> = ({ url }) => {
    const getEmbedUrl = (videoUrl: string) => {
        // YouTube
        if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
            const regExp =
                /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
            const match = videoUrl.match(regExp);
            const videoId = match?.[1];

            return videoId
                ? `https://www.youtube.com/embed/${videoId}`
                : "";
        }

        // Vimeo
        if (videoUrl.includes("vimeo.com")) {
            const regExp = /vimeo\.com\/(\d+)/;
            const match = videoUrl.match(regExp);
            const videoId = match?.[1];

            return videoId
                ? `https://player.vimeo.com/video/${videoId}`
                : "";
        }

        return "";
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) return <p>Invalid video URL</p>;

    return (
        <div style={{ position: "relative" }} className="h-full">
            <iframe
                src={embedUrl}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default VideoEmbed;