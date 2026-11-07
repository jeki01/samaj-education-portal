import { Divider } from "@heroui/react";
import "./timeline-divider.css";

export default function TimelineDivider({ text }: TimelineDividerProps) {
    return (
        <>
            <div className="timeline-divider-container">
                <Divider />
                <div className="timeline-divider-text">{text}</div>
                <Divider />
            </div>
        </>
    )
}

interface TimelineDividerProps {
    text: string
}