import DownloadIcon from "@/svg/DownloadIcon";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import CertificatePreview from "./CertificatePreview";
import CertificatePrint from "./CertificatePrint";
export default function CertificateMain() {
    const printRef = useRef<HTMLDivElement>(null);
    const handleDownload = async () => {
        if (!printRef.current) return;

        const element = printRef.current;
        await document.fonts.ready;

        const canvas = await html2canvas(element, {
            scale: 3, // High resolution
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [1152, 556],
        });

        pdf.addImage(imgData, "PNG", 0, 0, 1152, 556);
        pdf.save("certificate.pdf");
    };
    return (
        <>
            <CertificatePreview
                name="John Doe"
                date="10 January, 2026"
                course="ReactJS"
            />

            <CertificatePrint
                ref={printRef}
                name="John Doe"
                date="10 January, 2026"
                course="ReactJS"
            />
            <button type="button" onClick={handleDownload} className="text-[14px] flex items-center justify-center gap-2 w-full max-w-[1152px] mx-auto my-4 rounded-md text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)] py-2 px-4"><DownloadIcon /> Download Certificate</button>
        </>
    )
}
