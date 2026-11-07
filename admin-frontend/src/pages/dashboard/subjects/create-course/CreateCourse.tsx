import CancelBlackIcon from "@/svg/CancelBlackIcon";
import ImageUploadIcon from "@/svg/ImageUploadIcon";
import MyEditor from "@/ui/editor/MyEditor";
// import InputSelect from "@/ui/select-input/InputSelect";
// import { DatePicker } from "@heroui/react";
// import { getLocalTimeZone, today } from "@internationalized/date";
import type { FormikProps } from "formik";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import type { CreateCourseFormValues } from "../gov-exam.types";
// import UseCreateCourse from "../hooks/useCreateCourse";
import "./create-course.css";

const fileTypes = ["JPG", "PNG"];

export default function CreateCourse({ handleCancelCourse, createCourseForm }: CreateCourseProp) {
    // const {
    //     // CategoryList,
    //     // SubCategoryList,
    //     // SubjectList,
    //     handleStateList,
    //     getSubjectList,
    //     // handleDecreaseValidityDays,
    //     // handleIncreaseValidityDays,
    //     // handleDecreaseCoursePrice,
    //     // handleIncreaseCoursePrice,
    //     days,
    //     setDays,
    //     price,
    //     setPrice
    // } = UseCreateCourse();
    const [fileName, setFileName] = useState("");

    const handleChangeFile = (file: File) => {
        setFileName(file.name);
        createCourseForm.setFieldValue("courseImage", file) // set image to form
    };
    return (
        <>
            <div className="create-course-base">
                {/* Head */}
                <div className="create-course-head">
                    <div className="create-course-title">Create Course</div>
                    <button onClick={handleCancelCourse} className="create-course-cancel-btn"><CancelBlackIcon /></button>
                </div>
                {/* Course Form */}
                <div className="create-course-form">
                    <div className="flex xl:flex-nowrap flex-nowrap gap-x-20 mb-4 complete-profile-field-row">
                        {/* name field */}
                        <div className="flex flex-col w-full">
                            <label htmlFor={""} className="text-[14px] font-medium mb-2 block">Course Name</label>
                            <input
                                type="text"
                                id="courseName"
                                onChange={createCourseForm.handleChange}
                                onBlur={createCourseForm.handleBlur}
                                value={createCourseForm.values.courseName}
                                placeholder="Enter Course Name"
                                className="border border-[#70707099] rounded-[6px] h-[40px] px-4 text-[14px]"
                            />
                        </div>
                    </div>
                    <div className="flex xl:flex-nowrap flex-nowrap gap-x-20 mb-4 complete-profile-field-row">
                        {/* name field */}
                        <div className="flex flex-col w-full">
                            <label htmlFor={""} className="text-[14px] font-medium mb-2 block">Tagline</label>
                            <input
                                type="text"
                                id="tagline"
                                onChange={createCourseForm.handleChange}
                                onBlur={createCourseForm.handleBlur}
                                value={createCourseForm.values.tagline}
                                placeholder="Enter Tagline"
                                className="border border-[#70707099] rounded-[6px] h-[40px] px-4 text-[14px]"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="create-course-image-label">Course Description</div>
                        <MyEditor
                            value={createCourseForm.values.courseDescription}
                            onChange={(value) => {
                                createCourseForm.setFieldValue("courseDescription", value)
                            }}
                        />
                    </div>
                    <div className="create-course-image-base">
                        <div className="create-course-image-label">Course Image</div>
                        <FileUploader handleChange={handleChangeFile} name="file" types={fileTypes} classes={"drop__box"}
                            onTypeError={(e: string) => {
                                console.log(e);
                            }}
                        >
                            <div className="create-course-image-uploader">
                                <div className="create-course-image-file-input">
                                    <ImageUploadIcon />
                                    {
                                        typeof createCourseForm.values.courseImage === "string" ? <div className="flex flex-col items-center justify-center gap-y-2">
                                            <div className="create-course-image-input-label break-words px-4 text-center !text-[14px]">{createCourseForm?.values?.courseImage || "Drop your files here"}</div>
                                            <div className="create-course-image-input-btn">{createCourseForm?.values?.courseImage ? "Change file" : "Choose file"}</div>
                                        </div>
                                            : <div className="flex flex-col items-center justify-center gap-y-2">
                                                <div className="create-course-image-input-label break-words px-4 text-center !text-[14px]">{fileName ? fileName : "Drop your files here"}</div>
                                                <div className="create-course-image-input-btn">{fileName ? "Change file" : "Choose file"}</div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </FileUploader>
                    </div>
                    <div className="flex justify-center">
                        <button
                            disabled={!true}
                            type="submit"
                            className={`${"bg-[linear-gradient(90deg,#6633CC,#9933FF)]"}  text-[16px] disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium w-full max-w-[435px] rounded-[10px] h-[40px] mt-4 mx-auto`}
                            onClick={createCourseForm.submitForm}
                        >{"Save and Next"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}


interface CreateCourseProp {
    handleCancelCourse: () => void,
    createCourseForm: FormikProps<CreateCourseFormValues>
}