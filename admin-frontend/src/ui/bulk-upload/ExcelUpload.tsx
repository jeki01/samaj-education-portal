import type { QuestionForm } from "@/pages/dashboard/gov-exam/hooks/useTestSeries";
import SpinnerIcon from "@/svg/SpinnerIcon";
import { Button } from "@heroui/react";
import UseExcelUpload from "./useExcelUpload";

const ExcelUpload = ({ handleBulkUploadedData }: ExcelUploadProp) => {
    const {
        isLoading,
        handleFileUpload,
        handleQAndAFileUpload,
        onFileUpload,
        uploadMCQFileInputRef
    } = UseExcelUpload(handleBulkUploadedData);
    return (
        <div className="p-4 flex items-center gap-x-2">
            <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                onPress={onFileUpload}
                color="primary"
                className="sample-file-download-btn"
                spinner={<SpinnerIcon />}
            >
                {isLoading ? "Uploading..." : "Upload File"}
            </Button>
            <a href="/topic-sample-file.csv" download className="sample-file-download-btn">
                Download Sample File
            </a>
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            <input type="file" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" className="hidden" ref={uploadMCQFileInputRef} onChange={handleQAndAFileUpload} />
        </div>
    );
};

export default ExcelUpload;

interface ExcelUploadProp {
    handleBulkUploadedData: (a: QuestionForm[]) => void
}
