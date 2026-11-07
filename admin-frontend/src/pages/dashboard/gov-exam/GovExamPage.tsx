import CreateCourse from "./create-course/CreateCourse";
import { GOV_STEPPER } from "./gov-exam.types";
import GovExamStepOne from "./stepper/step-1/GovExamStepOne";
import "./gov-exam-page.css";
import UseGovExamMain from "./hooks/useGovExamMain";
import GovExamStepTwo from "./stepper/step-2/GovExamStepTwo";
import GovExamStepThree from "./stepper/step-3/GovExamStepThree";
import GovExamStepFour from "./stepper/step-4/GovExamStepFour";
import CourseContent from "./stepper/course-content/CourseContent";
export default function GovExamPage() {
    const { currentPageNo,
        handleBack,
        handleSkipNext,
        handleCancelCourse,
        createCourseForm,
        EditCourse,
        publishedCourseApi
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
            return <GovExamStepTwo
                handleBack={handleBack}
                handleSkipNext={handleSkipNext}
                handleCancelCourse={handleCancelCourse}
            />;
        case GOV_STEPPER.STEP_THREE:
            return <GovExamStepThree
                handleBack={handleBack}
                handleSkipNext={handleSkipNext}
                handleCancelCourse={handleCancelCourse}
                categoryType={createCourseForm.values.categoryType}
            />;
        case GOV_STEPPER.STEP_FOUR:
            return <GovExamStepFour
                handleBack={handleBack}
                handleSkipNext={handleSkipNext}
                handleCancelCourse={handleCancelCourse}
                categoryType={createCourseForm.values.categoryType}
            />;
        case GOV_STEPPER.STEP_FIVE:
            return <CourseContent
                handleCancelCourse={handleCancelCourse}
                EditCourse={EditCourse}
                publishedCourseApi={publishedCourseApi}
            />
    }
}

