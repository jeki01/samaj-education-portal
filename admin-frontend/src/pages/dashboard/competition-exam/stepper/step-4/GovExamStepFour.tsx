import StepHead from "../../components/StepHead";
import TestSeries from "./TestSeries";
// import { useEffect, useState } from "react";
import UseTestSeriesStep from "./useTestSeriesStep";

export default function GovExamStepFour({ handleBack, handleCancelCourse, handleSkipNext }: GovExamStepFourProp) {
    // const [isSelected, setIsSelected] = useState(false);
    const { formik } = UseTestSeriesStep(handleSkipNext);

    // useEffect(() => {

    //     if (isSelected === false) {
    //         formik.setFieldValue("negativeMarkings", 0);
    //     }

    // }, [isSelected])

    // useEffect(() => {
    //     if (formik.values?.negativeMarkings === undefined) {
    //         formik.setFieldValue("negativeMarkings", 0)
    //     }

    //     if (formik.values.negativeMarkings && formik.values.negativeMarkings !== 0) {
    //         setIsSelected(true)
    //     }
    // }, [formik.values.negativeMarkings])

    // useEffect(() => {
    //     if (formik.values?.maximumMark === undefined) {
    //         formik.setFieldValue("maximumMark", 1)
    //     }
    // }, [formik.values.maximumMark])



    return (
        <>
            <div className="create-course-base">
                <StepHead stepCount={2} handleBack={handleBack} handleCancelCourse={handleCancelCourse} />
                {/* <MarkingSection /> */}

                <div className="stepper-body !mt-4">
                    {/*  */}
                    <TestSeries createCourseForm={formik} keyName="topics" sectionTitle="Test Series" />
                    {/*  */}
                    <div className="flex justify-center gap-x-4">
                        <button type="button"
                            className={`text-lg text-primary border-2 border-primary font-bold w-full max-w-[250px] rounded-[10px] h-[54px] mt-4 `}
                            onClick={handleSkipNext}
                        >Skip and Next</button>
                        <button
                            onClick={formik.submitForm}
                            disabled={!true}
                            type="submit"
                            className={`${"bg-[linear-gradient(90deg,#6633CC,#9933FF)]"}  text-lg disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium w-full max-w-[250px] rounded-[10px] h-[54px] mt-4 `}>{"Save and Next"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

interface GovExamStepFourProp {
    handleBack: () => void,
    handleSkipNext: () => void,
    handleCancelCourse: () => void,
}