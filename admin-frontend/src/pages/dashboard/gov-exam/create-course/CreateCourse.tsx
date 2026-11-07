import CancelBlackIcon from "@/svg/CancelBlackIcon";
import "./create-course.css";
import InputSelect from "@/ui/select-input/InputSelect";
import UseCreateCourse from "../hooks/useCreateCourse";
import ImageUploadIcon from "@/svg/ImageUploadIcon";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import type { FormikProps } from "formik";
import type { CreateCourseFormValues } from "../gov-exam.types";
import MyEditor from "@/ui/editor/MyEditor";
import { DatePicker } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";

const fileTypes = ["JPG", "PNG"];

export default function CreateCourse({ handleCancelCourse, createCourseForm }: CreateCourseProp) {
    const { CategoryList,
        SubCategoryList,
        SubjectList,
        handleStateList,
        getSubjectList,
        handleDecreaseValidityDays,
        handleIncreaseValidityDays,
        handleDecreaseCoursePrice,
        handleIncreaseCoursePrice,
        days,
        setDays,
        price,
        setPrice
    } = UseCreateCourse();
    const [fileName, setFileName] = useState("");

    // for get subcat
    useEffect(() => {
        if (createCourseForm.values.category) {
            handleStateList(createCourseForm.values.category)
        }
    }, [createCourseForm.values.category])

    // for get subject
    useEffect(() => {
        if (createCourseForm.values.category && createCourseForm.values.subcategory) {
            if (createCourseForm.values.categoryType !== "Syllabus") {
                getSubjectList(createCourseForm.values.category, createCourseForm.values.subcategory)
            }
        }
    }, [createCourseForm.values.subcategory, createCourseForm.values.category, createCourseForm.values.categoryType])

    // for set days validity
    useEffect(() => {
        createCourseForm.setFieldValue("courseValidity", days)
    }, [days])

    useEffect(() => {
        if (createCourseForm.values.courseValidity) {
            if (days === 0) {
                setDays(Number(createCourseForm.values.courseValidity))
            }
        }
    }, [createCourseForm.values.courseValidity])

    useEffect(() => {
        createCourseForm.setFieldValue("coursePrice", price)
    }, [price])

    useEffect(() => {
        if (createCourseForm.values.coursePrice) {
            if (price === 0) {
                setPrice(Number(createCourseForm.values.coursePrice))
            }
        }
    }, [createCourseForm.values.coursePrice])


    const handleChangeFile = (file: File) => {
        setFileName(file.name);
        createCourseForm.setFieldValue("courseImages", file) // set image to form
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
                        <InputSelect
                            base="w-full !max-w-full"
                            trigger="complete-profile__input__field"
                            items={CategoryList}
                            placeholder={"Select"}
                            id={"category"}
                            setFieldValue={createCourseForm.setFieldValue}
                            className="w-full"
                            error={createCourseForm.errors.category}
                            isError={!!(createCourseForm.touched.category && createCourseForm.errors.category)}
                            onBlur={createCourseForm.handleBlur}
                            defaultSelectedKey={createCourseForm.values.category}
                            levelName="Category"
                        />
                        <InputSelect
                            base="w-full !max-w-full"
                            trigger="complete-profile__input__field"
                            items={SubCategoryList}
                            placeholder={"Select"}
                            id="subcategory"
                            setFieldValue={createCourseForm.setFieldValue}
                            className="w-full"
                            error={createCourseForm.errors.subcategory}
                            isError={!!(createCourseForm.touched.subcategory && createCourseForm.errors.subcategory)}
                            onBlur={createCourseForm.handleBlur}
                            defaultSelectedKey={createCourseForm.values.subcategory}
                            levelName="Sub Category"
                        />
                    </div>
                    <div className="flex xl:flex-nowrap flex-nowrap gap-x-20 mb-4 complete-profile-field-row">
                        {/* <InputSelect
                            base="w-full !max-w-full"
                            trigger="complete-profile__input__field"
                            items={SubSubCategoryList}
                            placeholder={"Select"}
                            id="subsubcategory"
                            setFieldValue={createCourseForm.setFieldValue}
                            className="w-full"
                            error={createCourseForm.errors.subsubcategory}
                            isError={!!(createCourseForm.touched.subsubcategory && createCourseForm.errors.subsubcategory)}
                            onBlur={createCourseForm.handleBlur}
                            defaultSelectedKey={createCourseForm.values.subsubcategory}
                            levelName="SubSubCategory"
                        /> */}
                        {/* name field */}
                        <div className="flex flex-col w-full">
                            <label htmlFor={""} className="text-[16px] font-medium mb-2 block">Course Name</label>
                            <input
                                type="text"
                                id="courseName"
                                onChange={createCourseForm.handleChange}
                                onBlur={createCourseForm.handleBlur}
                                value={createCourseForm.values.courseName}
                                placeholder="Enter Course Name"
                                className="border border-[#70707099] rounded-[6px] h-[52px] px-4"
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
                        {/* <textarea
                            name="courseDescription"
                            id="courseDescription"
                            placeholder="description"
                            className="create-course-desc"
                            value={createCourseForm.values.courseDescription}
                            onChange={createCourseForm.handleChange}
                            onBlur={createCourseForm.handleBlur}
                        >
                        </textarea> */}
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
                                        typeof createCourseForm.values.courseImages === "string" ? <div className="flex flex-col items-center justify-center gap-y-2">
                                            <div className="create-course-image-input-label">{createCourseForm?.values?.courseImages || "Drop your files here"}</div>
                                            <div className="create-course-image-input-btn">{createCourseForm?.values?.courseImages ? "Change file" : "Choose file"}</div>
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
                    <div className="flex gap-x-8 create-course-count-base">

                        <div className="create-course-validity-base">
                            <div className="create-course-validity-text">Course Validity</div>
                            <button onClick={handleDecreaseValidityDays}>-</button>
                            <div className="create-course-validity-input">
                                <input
                                    type="number"
                                    className="create-course-validity-count min-w-[60px] w-[80px] text-center"
                                    value={days.toString().replace(/^0+/, '0')}
                                    id="courseValidity"
                                    min={1}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numberValue = Math.abs(Number(inputValue));
                                        if (!isNaN(numberValue)) {
                                            setDays(numberValue);
                                            createCourseForm.setFieldValue("courseValidity", days);
                                        }
                                    }}
                                />
                                <div className="create-course-validity-day">Days</div>
                            </div>
                            <button onClick={handleIncreaseValidityDays}>+</button>
                        </div>
                        <div className="flex gap-x-2 create-course-price-base">
                            <div className="create-course-validity-text">Course Price</div>
                            <button onClick={handleDecreaseCoursePrice}>-</button>
                            <div className="create-course-validity-input">
                                <input
                                    type="number"
                                    className="create-course-validity-count min-w-[60px] w-[100px] text-center"
                                    id="coursePrice"
                                    name="coursePrice"
                                    min={0}
                                    placeholder="enter price"
                                    value={price.toString().replace(/^0+/, '0')}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const numberValue = Math.abs(Number(inputValue));
                                        if (!isNaN(numberValue)) {
                                            setPrice(numberValue);
                                            createCourseForm.setFieldValue("coursePrice", price);
                                        }
                                    }}
                                />
                                <div className="create-course-validity-day">rupees</div>
                            </div>
                            <button onClick={handleIncreaseCoursePrice}>+</button>
                        </div>
                    </div>
                    <div className="course-expiry-date">
                        <div className="create-course-validity-text text-nowrap mr-4">Course Expiry Date</div>
                        <DatePicker
                            aria-label="endDate"
                            minValue={today(getLocalTimeZone())}
                            value={createCourseForm.values.expireDate}
                            onChange={(date) => createCourseForm.setFieldValue("expireDate", date)}
                            onBlur={() => createCourseForm.setFieldTouched("expireDate", true)}
                            classNames={{
                                inputWrapper:
                                    "shadow-[0_0_10px_#00000026] rounded-[6px] h-[52px] px-4 bg-white hover:bg-white group[data-invalid=true] group-data-[invalid=true]:bg-white",
                                calendarContent: "course-expiry-datepicker",
                            }}
                            isInvalid={
                                Boolean(
                                    createCourseForm.errors.expireDate &&
                                    createCourseForm.touched.expireDate
                                )
                            }
                            errorMessage={createCourseForm.errors.expireDate}
                        />

                        {createCourseForm.errors.expireDate && createCourseForm.touched.expireDate && (
                            <p className="text-red-500 text-sm mt-1">
                                {createCourseForm.errors.expireDate}
                            </p>
                        )}


                        {/* <DatePicker
                            defaultValue={today(getLocalTimeZone())}
                            aria-label="endDate"
                            // label="Course Expiry Date"
                            minValue={today(getLocalTimeZone())}
                            classNames={{
                                base: "",
                                inputWrapper: "shadow-[0_0_10px_#00000026] rounded-[6px] h-[52px] px-4 bg-white hover:bg-white group[data-invalid=true] group-data-[invalid=true]:bg-white",
                                calendarContent: "course-expiry-datepicker",
                            }}
                            value={createCourseForm.values.expireDate ? new Date(createCourseForm.values.expireDate) : null}
                            onChange={(date) => {
                                if (date)
                                    createCourseForm.setFieldValue("expireDate", date.toString())
                            }}
                        /> */}
                    </div>
                    <div className="step-course-type-base xl:w-[70%] !mx-auto">
                        <button
                            onClick={() => createCourseForm.setFieldValue("categoryType", "Syllabus")}
                            className={`step-course-type-btn w-full ${createCourseForm.values.categoryType === "Syllabus" ? "active" : ""}`}>syllabus wise</button>
                        <button
                            onClick={() => createCourseForm.setFieldValue("categoryType", "Subject")}
                            className={`step-course-type-btn w-full ${createCourseForm.values.categoryType === "Subject" ? "active" : ""}`}>subject wise</button>
                        <button
                            onClick={() => createCourseForm.setFieldValue("categoryType", "Topic")}
                            className={`step-course-type-btn w-full ${createCourseForm.values.categoryType === "Topic" ? "active" : ""}`}>Topic wise</button>
                    </div>
                    <div className="w-[70%] mx-auto">
                        {
                            createCourseForm.values.categoryType !== "Syllabus" &&
                            <InputSelect
                                base="w-full !max-w-full"
                                trigger="complete-profile__input__field !border-[#6633CC] h-[30px] min-w-[150px] w-fit !rounded-lg subject--name"
                                items={SubjectList}
                                placeholder={"Subject type"}
                                id="subject"
                                setFieldValue={createCourseForm.setFieldValue}
                                className="w-full"
                                error={createCourseForm.errors.subject}
                                isError={!!(createCourseForm.touched.subject && createCourseForm.errors.subject)}
                                onBlur={createCourseForm.handleBlur}
                                defaultSelectedKey={createCourseForm.values.subject}
                            />
                        }
                    </div>
                    <div className="flex justify-center">
                        <button
                            disabled={!true}
                            type="submit"
                            className={`${"bg-[linear-gradient(90deg,#6633CC,#9933FF)]"}  text-lg disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium w-full max-w-[435px] rounded-[10px] h-[54px] mt-4 mx-auto`}
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