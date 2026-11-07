import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import type { QuestionForm } from "@/pages/dashboard/gov-exam/hooks/useTestSeries";
import { getParsedMCQ_fromFile_API } from "@/services/gov-exam.service";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export default function UseExcelUpload(handleBulkUploadedData: (a: QuestionForm[]) => void) {
    const uploadMCQFileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = evt.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: ExcelSheetColKeyNames[] = XLSX.utils.sheet_to_json(worksheet, { raw: false });

            const mappedQuestions: QuestionForm[] = (jsonData as ExcelSheetColKeyNames[]).map((row) => {
                // Trim all keys in the row
                const cleanedRow = Object.fromEntries(
                    Object.entries(row).map(([key, value]) => [key.trim(), typeof value === "string" ? value.trim() : value])
                );

                return {
                    question: cleanedRow["Questions"] || "",
                    option1: cleanedRow["Option1"] || "",
                    option2: cleanedRow["Option2"] || "",
                    option3: cleanedRow["Option3"] || "",
                    option4: cleanedRow["Option4"] || "",
                    option5: cleanedRow["Option5"] || "",
                    answer: cleanedRow["Answer"].toLowerCase() || "",
                };
            });
            handleBulkUploadedData(mappedQuestions)
        };

        reader.readAsArrayBuffer(file);
        e.target.value = "";
    };

    const handleQAndAFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Allowed extensions and mime types
        const allowedExtensions = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
        const allowedMimeTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/jpeg",
            "image/png"
        ];

        const fileName = file.name.toLowerCase();
        const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
        const isValidMime = allowedMimeTypes.includes(file.type);

        if (!isValidExtension || !isValidMime) {
            alert("Invalid file type. Please upload PDF, Word, or Image files only.");
            e.target.value = "";
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            const resp = await getParsedMCQ_fromFile_API(formData);
            const MCQList = resp?.data?.topicQuestions;
            handleBulkUploadedData(MCQList);
            setIsLoading(false);
        } catch (error) {
            if (uploadMCQFileInputRef.current) {
                uploadMCQFileInputRef.current.files = null;
                uploadMCQFileInputRef.current.value = "";
            }
            setIsLoading(false);
            console.log(error);
            const err = error as ErrResp;
            if (err?.response?.data?.message) {
                toast.error(err?.response?.data?.message);
            } else {
                toast.error("something went wrong");
            }
            checkAuthUserHelper(err)
        }
    }

    const onFileUpload = () => uploadMCQFileInputRef.current?.click();

    return {
        isLoading,
        handleFileUpload,
        handleQAndAFileUpload,
        uploadMCQFileInputRef,
        onFileUpload
    }
}

export interface ExcelSheetColKeyNames {
    Questions: string,
    Option1: string,
    Option2: string,
    Option3: string,
    Option4: string,
    Option5: string,
    Answer: string
}