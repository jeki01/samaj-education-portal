import StepHead from "../../components/StepHead";
import TestSeries from "./TestSeries";
import UseTestSeriesStep from "./useTestSeriesStep";

export default function GovExamStepFour({ handleBack, handleCancelCourse }: GovExamStepFourProp) {
    const { formik } = UseTestSeriesStep();



    return (
        <>
            <div className="create-course-base">
                <StepHead stepCount={3} handleBack={handleBack} handleCancelCourse={handleCancelCourse} />
                <div className="stepper-body !mt-4">
                    {/*  */}
                    <TestSeries formik={formik} keyName="assessment" sectionTitle="Assessments" />
                    {/*  */}
                    <div className="flex justify-center gap-x-4">
                        <button
                            onClick={formik.submitForm}
                            disabled={!true}
                            type="submit"
                            className={`${"bg-[linear-gradient(90deg,#6633CC,#9933FF)]"}  text-[16px] disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium w-full max-w-[250px] rounded-[10px] h-[40px] mt-4 `}>Submit</button>
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
    // categoryType: string
}