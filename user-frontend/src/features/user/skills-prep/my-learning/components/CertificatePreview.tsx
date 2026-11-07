import { useEffect, useRef, useState } from "react";
import CertificateLayout from "./CertificateLayout";

interface Props {
    name: string;
    date: string;
    course: string;
}

export default function CertificatePreview({ name, date, course }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        function updateScale() {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const newScale = containerWidth / 1152;
            setScale(newScale);
        }

        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-[1152px] mx-auto"
            style={{ aspectRatio: "1152 / 556" }}
        >
            <div
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    width: 1152,
                    height: 556,
                }}
            >
                <CertificateLayout name={name} date={date} course={course} />
            </div>
        </div>
    );
}