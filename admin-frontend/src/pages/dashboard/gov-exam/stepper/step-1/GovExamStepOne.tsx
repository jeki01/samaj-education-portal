import { useState } from "react";
import StepHead from "../../components/StepHead";
import { FileUploader } from "react-drag-drop-files";
import ImageUploadIcon from "@/svg/ImageUploadIcon";
import UseEBookStep from "./useEBookStep";

const fileTypes = ["PDF"];

export default function GovExamStepOne({ handleBack, handleSkipNext, handleCancelCourse }: GovExamStepOneProp) {
    const [fileName, setFileName] = useState("")
    const { formik } = UseEBookStep(handleSkipNext)

    const handleChangeFile = (file: File) => {
        setFileName(file.name);
        formik.setFieldValue("ebookFile", file)
    };

    function HandleStudyCourseTypes() {
        return <div className="step-one-base">
            <div className="create-course-image-label">Upload E-Book</div>
            <FileUploader handleChange={handleChangeFile} name="file" types={fileTypes} classes={"drop__box"}
                onTypeError={(e: string) => {
                    console.log(e);
                }}
            >
                <div className="create-course-image-uploader">
                    <div className="create-course-image-file-input">
                        <ImageUploadIcon />
                        {
                            formik.values?.ebookFile && typeof formik.values.ebookFile === "string" ? <div className="flex flex-col items-center justify-center gap-y-2">
                                <div className="create-course-image-input-label">{formik.values.ebookFile || "Drop your files here"}</div>
                                <div className="create-course-image-input-btn">{formik.values.ebookFile ? "Change file" : "Choose file"}</div>
                            </div>
                                : <div className="flex flex-col items-center justify-center gap-y-2">
                                    <div className="create-course-image-input-label">{fileName ? fileName : "Drop your files here"}</div>
                                    <div className="create-course-image-input-btn">{fileName ? "Change file" : "Choose file"}</div>
                                </div>
                        }
                    </div>
                </div>
            </FileUploader>
        </div>
    }
    return (
        <>
            <div className="create-course-base">
                <StepHead stepCount={1} handleBack={handleBack} handleCancelCourse={handleCancelCourse} />
                <div className="stepper-body">
                    <HandleStudyCourseTypes />
                    <div className="flex justify-center gap-x-4">
                        <button type="button"
                            className={`text-lg text-primary border-2 border-primary font-bold w-full max-w-[250px] rounded-[10px] h-[54px] mt-4 `}
                            onClick={handleSkipNext}
                        >Skip and Next</button>
                        <button
                            disabled={!true}
                            type="submit"
                            className={`${"bg-[linear-gradient(90deg,#6633CC,#9933FF)]"}  text-lg disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium w-full max-w-[250px] rounded-[10px] h-[54px] mt-4 `}
                            onClick={formik.submitForm}
                        >Save and Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}

interface GovExamStepOneProp {
    handleBack: () => void,
    handleSkipNext: () => void,
    handleCancelCourse: () => void
}