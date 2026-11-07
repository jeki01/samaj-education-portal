import type React from "react"
import "./section-title.css";

export default function SectionTitle({ text, Icon }: SectionTitleProp) {
    return (
        <>
            <div className="section--title">
                {Icon}
                <span>{text}</span>
            </div>
        </>
    )
}

type SectionTitleProp = {
    text: string,
    Icon: React.ReactNode
}