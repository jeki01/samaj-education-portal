import StepHead from "../../components/StepHead";
import VideoLectures from "./VideoLectures";
import UseVideoLectureStep from "./useVideoLectureStep";

export default function GovExamStepThree({ handleBack, handleSkipNext, handleCancelCourse, categoryType }: GovExamStepThreeProp) {
    const { formik } = UseVideoLectureStep(handleSkipNext);

    return (
        <>
            <div className="create-course-base">
                <StepHead stepCount={categoryType === "Topic" ? 1 : 3} categoryType={categoryType} handleBack={handleBack} handleCancelCourse={handleCancelCourse} />
                <div className="stepper-body !mt-4">
                    {/*  */}
                    <VideoLectures createCourseForm={formik} keyName="videoLectureGroups" sectionTitle="Video Lectures" />
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

interface GovExamStepThreeProp {
    handleBack: () => void,
    handleSkipNext: () => void,
    handleCancelCourse: () => void,
    categoryType: string
}