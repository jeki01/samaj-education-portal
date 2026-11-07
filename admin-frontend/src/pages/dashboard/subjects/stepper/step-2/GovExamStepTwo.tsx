import { FileUploader } from "react-drag-drop-files";
import StepHead from "../../components/StepHead";
import UseStudyNoteStep from "./useStudyNoteStep";
import { useState } from "react";
import ImageUploadIcon from "@/svg/ImageUploadIcon";

const fileTypes = ["PDF"];

export default function GovExamStepTwo({ handleBack, handleSkipNext, handleCancelCourse }: GovExamStepTwoProp) {
    const { formik } = UseStudyNoteStep(handleSkipNext);
    const [fileName, setFileName] = useState("")

    const handleChangeFile = (file: File) => {
        setFileName(file.name);
        formik.setFieldValue("studyNoteFile", file)
    };

    function HandleStudyCourseTypes() {
        return <div className="step-one-base">
            <div className="create-course-image-label">Upload Study Notes</div>
            <FileUploader handleChange={handleChangeFile} name="file" types={fileTypes} classes={"drop__box"}
                onTypeError={(e: string) => {
                    console.log(e);
                }}
            >
                <div className="create-course-image-uploader">
                    <div className="create-course-image-file-input">
                        <ImageUploadIcon />
                        {
                            formik.values?.studyNoteFile && typeof formik.values.studyNoteFile === "string" ? <div className="flex flex-col items-center justify-center gap-y-2">
                                <div className="create-course-image-input-label">{formik.values?.studyNoteFile || "Drop your files here"}</div>
                                <div className="create-course-image-input-btn">{formik.values?.studyNoteFile ? "Change file" : "Choose file"}</div>
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
                <StepHead stepCount={2} handleBack={handleBack} handleCancelCourse={handleCancelCourse} />
                <div className="stepper-body !mt-4">
                    {/*  */}
                    <HandleStudyCourseTypes />
                    {/*  */}
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

interface GovExamStepTwoProp {
    handleBack: () => void,
    handleSkipNext: () => void,
    handleCancelCourse: () => void,
    // createCourseForm: FormikProps<CreateCourseFormValues>
}