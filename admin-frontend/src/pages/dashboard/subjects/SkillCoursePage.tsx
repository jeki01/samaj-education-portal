import CreateCourse from "./create-course/CreateCourse";
import "./gov-exam-page.css";
import { GOV_STEPPER } from "./gov-exam.types";
import UseGovExamMain from "./hooks/useGovExamMain";
// import CourseContent from "./stepper/course-content/CourseContent";
import GovExamStepOne from "./stepper/step-1/GovExamStepOne";
// import GovExamStepTwo from "./stepper/step-2/GovExamStepTwo";
import GovExamStepThree from "./stepper/step-3/GovExamStepThree";
import GovExamStepFour from "./stepper/step-4/GovExamStepFour";
export default function SkillCoursePage() {
    const { currentPageNo,
        handleBack,
        handleSkipNext,
        handleCancelCourse,
        createCourseForm,
        // EditCourse,
        // publishedCourseApi
    } = UseGovExamMain();

    switch (currentPageNo) {
        case GOV_STEPPER.CREATE:
            return (
                <>
                    <CreateCourse
                        handleCancelCourse={handleCancelCourse}
                        createCourseForm={createCourseForm}
                    />
                </>
            );
        case GOV_STEPPER.STEP_ONE:
            return <GovExamStepOne
                handleBack={handleBack}
                handleSkipNext={handleSkipNext}
                handleCancelCourse={handleCancelCourse}
            />;
        case GOV_STEPPER.STEP_TWO:
            return <GovExamStepThree
                handleBack={handleBack}
                handleSkipNext={handleSkipNext}
                handleCancelCourse={handleCancelCourse}
            />;
        case GOV_STEPPER.STEP_THREE:
            return <GovExamStepFour
                handleBack={handleBack}
                handleSkipNext={handleSkipNext}
                handleCancelCourse={handleCancelCourse}
            />;
    }
}

