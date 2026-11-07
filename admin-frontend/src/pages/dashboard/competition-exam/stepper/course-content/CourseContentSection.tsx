import EBookIcon from "@/svg/EBookIcon";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import PrimaryCheckedIcon from "@/svg/PrimaryCheckedIcon";
import StudyNotesIcon from "@/svg/StudyNotesIcon";
import TestSeriesIcon from "@/svg/TestSeriesIcon";
import VidLetcureIcon from "@/svg/VidLetcureIcon";
import type { FormikProps } from "formik";
import type { CourseDetailsI } from "./useCourseDetails";

export default function CourseContentSection({ videoLecture, testSeries, studyNotes, ebook, categoryType,
    handleInputChange, preventInvalidKey, formik, percentageError, isEditable, setIsEditable }: CourseContentSectionProp) {
    return (
        <>
            <div>
                <div className="flex justify-end items-end gap-x-4 h-[40px]">
                    {percentageError && <p className="text-[14px] text-red-500">{percentageError}</p>}
                    {
                        isEditable ?
                            <button className="save-percentage-btn" onClick={() => {
                                formik.submitForm();
                            }}>Save</button>
                            :
                            <button onClick={() => setIsEditable(true)}><EditPrimaryIcon /></button>
                    }
                </div>
                <div className="flex items-center justify-start gap-x-6 my-8">
                    {
                        categoryType && categoryType !== "Topic" &&
                        <div className={`flex items-center justify-between gap-x-8 step-checkbox ${ebook === 0 ? "grayscale" : ""}`}>
                            <div className="flex items-center gap-x-6">
                                <PrimaryCheckedIcon />
                                <div className="flex items-center gap-x-2">
                                    <EBookIcon />
                                    <div className="font-semibold min-w-[120px]">E- Books</div>
                                    <div className="text-[#888888] min-w-[130px]">{ebook} E - Book</div>
                                </div>
                            </div>
                            <div className="count-box">
                                <input
                                    type="number"
                                    disabled={!isEditable ? true : ebook === 0 ? true : false}
                                    name="ebookPercentage"
                                    value={formik.values.ebookPercentage}
                                    onChange={handleInputChange}
                                    onKeyDown={preventInvalidKey}
                                    min={1}
                                    max={100}
                                    step={1}
                                />
                                <span>%</span>
                            </div>
                        </div>
                    }
                    <div className={`flex items-center justify-between gap-x-8 step-checkbox ${videoLecture === 0 ? "grayscale" : ""}`}>
                        <div className="flex items-center gap-x-6">
                            <PrimaryCheckedIcon />
                            <div className="flex items-center gap-x-2">
                                <VidLetcureIcon />
                                <div className="font-semibold min-w-[120px]">Video Lectures</div>
                                <div className="text-[#888888] min-w-[130px]">{videoLecture} Video Lectures</div>
                            </div>
                        </div>
                        <div className="count-box">
                            <input
                                type="number"
                                name="videoPercentage"
                                value={formik.values.videoPercentage}
                                onChange={handleInputChange}
                                onKeyDown={preventInvalidKey}
                                min={1}
                                max={100}
                                step={1}
                                disabled={!isEditable ? true : videoLecture === 0 ? true : false}
                            />
                            <span>%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-start gap-x-6 mb-8">
                    {
                        categoryType && categoryType !== "Topic" &&
                        <div className={`flex items-center justify-between gap-x-8 step-checkbox ${studyNotes === 0 ? "grayscale" : ""}`}>
                            <div className="flex items-center gap-x-6">
                                <PrimaryCheckedIcon />
                                <div className="flex items-center gap-x-2">
                                    <StudyNotesIcon />
                                    <div className="font-semibold min-w-[120px]">Study Notes</div>
                                    <div className="text-[#888888] min-w-[130px]">{studyNotes} Study Notes</div>
                                </div>
                            </div>
                            <div className="count-box">
                                <input
                                    type="number"
                                    name="notePercentage"
                                    value={formik.values.notePercentage}
                                    onChange={handleInputChange}
                                    onKeyDown={preventInvalidKey}
                                    min={1}
                                    max={100}
                                    step={1}
                                    disabled={!isEditable ? true : studyNotes === 0 ? true : false}
                                />
                                <span>%</span>
                            </div>
                        </div>
                    }
                    <div className={`flex items-center justify-between gap-x-8 step-checkbox ${testSeries === 0 ? "grayscale" : ""}`}>
                        <div className="flex items-center gap-x-6">
                            <PrimaryCheckedIcon />
                            <div className="flex items-center gap-x-2">
                                <TestSeriesIcon />
                                <div className="font-semibold min-w-[120px]">Test Series</div>
                                <div className="text-[#888888] min-w-[130px]">{testSeries} Test Series</div>
                            </div>
                        </div>
                        <div className="count-box">
                            <input
                                type="number"
                                name="testPercentage"
                                value={formik.values.testPercentage}
                                onChange={handleInputChange}
                                onKeyDown={preventInvalidKey}
                                min={1}
                                max={100}
                                step={1}
                                disabled={!isEditable ? true : testSeries === 0 ? true : false}
                            />
                            <span>%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface CourseContentSectionProp {
    ebook: number,
    studyNotes: number,
    videoLecture: number,
    testSeries: number,
    categoryType?: string,
    formik: FormikProps<CourseDetailsI>,
    preventInvalidKey: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    percentageError: string,
    isEditable: boolean
    setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
}