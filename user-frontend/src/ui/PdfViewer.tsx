import FullScreenIcon from "@/svg/FullScreenIcon";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.mjs",
//     import.meta.url
// ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface PdfViewerProps {
    fileUrl: string;
    markAsRead: (t: "lecture" | "ebook") => Promise<void>;
    isRead: boolean;
}

export default function PdfViewer({ fileUrl, markAsRead, isRead }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(0.6);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Sync state when user exits fullscreen via ESC
    useEffect(() => {
        const handler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`w-full mx-auto border rounded-lg flex flex-col bg-white
        ${isFullscreen ? "h-screen max-w-none" : "max-w-[600px] h-[calc(100vh-200px)]"}
      `}
        >
            {/* PDF Preview */}
            <div className="flex-1 overflow-auto flex justify-center bg-gray-50">
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div className="p-4">Loading PDF...</div>}
                >
                    <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} />
                </Document>
            </div>

            {/* Controls */}
            <div className="border-t p-3 flex flex-wrap items-center justify-center gap-3">
                <button
                    onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                    disabled={pageNumber <= 1}
                    className="text-[14px] px-3 py-1 border rounded-lg disabled:opacity-40 text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)]"
                >
                    Prev
                </button>

                <span className="text-sm font-medium">
                    {pageNumber} / {numPages}
                </span>

                <button
                    onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
                    disabled={pageNumber >= numPages}
                    className="text-[14px] px-3 py-1 border rounded-lg disabled:opacity-40 text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)]"
                >
                    Next
                </button>

                <button
                    onClick={() => setScale((s) => Math.max(s - 0.2, 0.6))}
                    className="text-[14px] px-3 py-1 border rounded-lg text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)]"
                >
                    Zoom −
                </button>

                <button
                    onClick={() => setScale((s) => Math.min(s + 0.2, 2))}
                    className="text-[14px] px-3 py-1 border rounded-lg text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)]"
                >
                    Zoom +
                </button>

                <button
                    onClick={toggleFullscreen}
                    className="px-3 py-1 rounded font-medium"
                >
                    <FullScreenIcon />
                </button>
                {
                    pageNumber >= numPages &&
                    <button
                        onClick={() => {
                            if (!isRead)
                                markAsRead("ebook")
                        }}
                        className="text-[14px] px-3 py-1 border rounded-lg text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)]"
                    >
                        {isRead ? "Already marked as Read" : "Mark as Read"}
                    </button>
                }
            </div>
        </div>
    );
}



// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();


// interface PdfViewerProps {
//     fileUrl: string;
// }

// export default function PdfViewer({ fileUrl }: PdfViewerProps) {
//     const [numPages, setNumPages] = useState<number>(0);
//     const [pageNumber, setPageNumber] = useState<number>(1);
//     const [scale, setScale] = useState<number>(1);

//     function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//         setNumPages(numPages);
//     }

//     return (
//         <div className="w-full max-w-[600px] mx-auto border rounded-lg flex flex-col h-[calc(100vh-200px)]">

//             {/* PDF Preview Area */}
//             <div className="flex-1 overflow-auto flex justify-center bg-gray-50">
//                 <Document
//                     file={fileUrl}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     loading={<div className="p-4">Loading PDF...</div>}
//                 >
//                     <Page
//                         pageNumber={pageNumber}
//                         scale={scale}
//                         renderTextLayer={false}
//                     />
//                 </Document>
//             </div>

//             {/* Controls */}
//             <div className="border-t p-3 flex items-center justify-center gap-4 bg-white">
//                 <button
//                     onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
//                     disabled={pageNumber <= 1}
//                     className="px-3 py-1 border rounded disabled:opacity-40"
//                 >
//                     Prev
//                 </button>

//                 <span className="text-sm font-medium">
//                     {pageNumber} / {numPages}
//                 </span>

//                 <button
//                     onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
//                     disabled={pageNumber >= numPages}
//                     className="px-3 py-1 border rounded disabled:opacity-40"
//                 >
//                     Next
//                 </button>

//                 <button
//                     onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.6))}
//                     className="px-3 py-1 border rounded"
//                 >
//                     Zoom -
//                 </button>

//                 <button
//                     onClick={() => setScale((prev) => Math.min(prev + 0.2, 2))}
//                     className="px-3 py-1 border rounded"
//                 >
//                     Zoom +
//                 </button>
//             </div>
//         </div>

//     );
// }
