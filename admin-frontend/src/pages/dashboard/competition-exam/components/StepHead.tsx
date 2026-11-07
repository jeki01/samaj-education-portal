import BackArrowIcon from "@/svg/BackArrowIcon";
import CancelBlackIcon from "@/svg/CancelBlackIcon";
import "./step-head.css";
// import { useEffect, useState } from "react";

// const stepList = [
//     "E-Book",
//     "Study Notes",
//     "Video Lectures",
//     "Test Series"
// ]

// const topicStepList = [
//     "Video Lectures",
//     "Test Series"
// ]

// const enum CategoryType { TOPIC = "Topic" }

export default function StepHead({ stepCount, handleBack, handleCancelCourse }: StepHeadProp) {
    // const [stepName, setstepName] = useState("");
    // useEffect(() => {
    //     if (categoryType && categoryType === CategoryType.TOPIC) {
    //         const name = topicStepList.filter((_, i) => (i + 1) === stepCount)[0];
    //         setstepName(name)
    //     } else {
    //         const name = stepList.filter((_, i) => (i + 1) === stepCount)[0];
    //         setstepName(name)
    //     }
    // }, [stepCount])


    return (
        <>
            {/* Nav */}
            <div className="create-course-head">
                <div className="flex items-center gap-x-4 ml-4">
                    <button onClick={handleBack}><BackArrowIcon /></button>
                    <div className="create-course-title">Step {stepCount} of {2}</div>
                </div>
                <button onClick={handleCancelCourse} className="create-course-cancel-btn"><CancelBlackIcon /></button>
            </div>

            {/* Stepper Head */}
            <div className={`stepper-head  "stepper-topic-head" : ""}`}>
                <div className="stepper-title">Course Content <span>Test Series</span></div>
                {/* <div className="stepper-indicator">
                    {
                        categoryType && categoryType === CategoryType.TOPIC ?
                            topicStepList.map((name, idx) => (
                                <div className="stepper-indicator-box" key={idx}>
                                    <div className={`stepper-indicator-count ${stepCount > (idx + 1) ? "completed" : stepCount === (idx + 1) ? "current-step" : ""}`}>
                                        {stepCount === (idx + 1) ? stepCount : ""}
                                    </div>
                                    <div className="stepper-indicator-name">{name}</div>
                                </div>
                            ))
                            :
                            stepList.map((name, idx) => (
                                <div className="stepper-indicator-box" key={idx}>
                                    <div className={`stepper-indicator-count ${stepCount > (idx + 1) ? "completed" : stepCount === (idx + 1) ? "current-step" : ""}`}>
                                        {stepCount === (idx + 1) ? stepCount : ""}
                                    </div>
                                    <div className="stepper-indicator-name">{name}</div>
                                </div>
                            ))
                    }
                </div> */}
            </div>
        </>
    )
}

interface StepHeadProp {
    stepCount: number,
    handleBack: () => void,
    handleCancelCourse: () => void,
}