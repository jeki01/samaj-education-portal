import StepHead from "../../components/StepHead";
import TestSeries from "./TestSeries";
import { useEffect, useState } from "react";
import UseTestSeriesStep from "./useTestSeriesStep";
import { Switch } from "@heroui/react";

export default function GovExamStepFour({ handleBack, handleCancelCourse, handleSkipNext, categoryType }: GovExamStepFourProp) {
    const [isSelected, setIsSelected] = useState(false);
    const { formik } = UseTestSeriesStep(handleSkipNext);

    useEffect(() => {

        if (isSelected === false) {
            formik.setFieldValue("negativeMark", 0);
        }

    }, [isSelected])

    useEffect(() => {
        if (formik.values?.negativeMark === undefined) {
            formik.setFieldValue("negativeMark", 0)
        }

        if (formik.values.negativeMark && formik.values.negativeMark !== 0) {
            setIsSelected(true)
        }
    }, [formik.values.negativeMark])

    useEffect(() => {
        if (formik.values?.maximumMark === undefined) {
            formik.setFieldValue("maximumMark", 1)
        }
    }, [formik.values.maximumMark])



    return (
        <>
            <div className="create-course-base">
                <StepHead stepCount={categoryType === "Topic" ? 2 : 4} categoryType={categoryType} handleBack={handleBack} handleCancelCourse={handleCancelCourse} />
                {/* <MarkingSection /> */}
                <div className="marking-section">
                    <div className="marking-row">
                        <div className="marking-para">
                            <span>
                                Maximum marks for each question is
                            </span>
                            <input
                                type="number"
                                className="test-time-input min-w-[60px] w-[80px] text-center"
                                value={formik.values.maximumMark}
                                id="maximumMark"
                                min={1}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numberValue = Math.abs(Number(inputValue));
                                    if (!isNaN(numberValue)) {
                                        formik.setFieldValue("maximumMark", Math.round(numberValue))
                                    }
                                }}
                            />
                            <span>, test time would be</span>
                            <input
                                type="number"
                                className="test-time-input min-w-[60px] w-[80px] text-center"
                                value={formik.values.testTime}
                                id="testTime"
                                min={1}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numberValue = Math.abs(Number(inputValue));
                                    if (!isNaN(numberValue)) {
                                        formik.setFieldValue("testTime", Math.round(numberValue))
                                    }
                                }}
                            />
                            <span>minutes and</span>
                            <div className="neg-marks-text">
                                <Switch
                                    size="sm"
                                    classNames={{ wrapper: `group[data-selected="true"] group-data-[selected=true]:bg-[#6633CC]` }}
                                    defaultSelected
                                    aria-label="negative marks"
                                    isSelected={isSelected}
                                    onValueChange={setIsSelected}
                                />
                            </div>
                            {
                                isSelected &&
                                <>
                                    <span>there is negative marking of</span>
                                    {/* <button onClick={() => handleUpdateNegMarks("decrease")} className="ml-4">-</button> */}
                                    <input
                                        type="number"
                                        className="test-time-input min-w-[60px] w-[80px] text-center"
                                        value={formik.values.negativeMark}
                                        id="negativeMark"
                                        min={0}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            const numberValue = Math.abs(Number(inputValue));
                                            if (!isNaN(numberValue)) {
                                                formik.setFieldValue("negativeMark", numberValue)
                                            }
                                        }}
                                    />
                                    {/* <button onClick={() => handleUpdateNegMarks("increase")}>+</button> */}
                                    {/* <div className="max-marks-text--note">For each incorrect answer</div> */}
                                    <span>for each incorrect answer.</span>
                                </>
                            }
                        </div>
                        {/* <div className="max-marks-text">Maximum Marks</div>
                        <button onClick={() => handleUpdateMaxMarks("decrease")}>-</button>

                        <button onClick={() => handleUpdateMaxMarks("increase")}>+</button>
                        <div className="max-marks-text--note">For each correct answer</div> */}
                    </div>
                    {/* <div className="course-test-time"> */}

                    {/* <span className="ml-2 max-marks-text--note">Test Time (In Min.)</span> */}
                    {/* </div> */}


                </div>
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
    categoryType: string
}