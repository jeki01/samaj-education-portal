import type React from "react"
import "./page-title.css";
export default function PageTitle({ text, Icon }: PageTitleProp) {
    return (
        <>
            <div className="page-title">
                {Icon}
                <span>{text}</span>
            </div>
        </>
    )
}

type PageTitleProp = {
    Icon: React.ReactNode
    text: string
}