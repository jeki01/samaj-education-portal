import "./type-box.css";

export default function TypeBox({ image, text, isActive }: TypeBoxProp) {
    return (
        <div className={`type-box-base ${isActive ? "active" : ""}`}>
            <div className="type-box-icon-wrap">
                {image}
            </div>
            <div className="type-box-title">{text}</div>
            <div className="type-box-radio" />
        </div>
    )
}

interface TypeBoxProp {
    text: string,
    image: React.ReactNode,
    isActive: boolean
}