import { useAccount } from "@/context/account/AccountContext";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";
import "./course-test.css";
import useAssessmentTest from "./hook/useAssessmentTest";
import UseQATest from "./hook/useQATest";
import InfoBottomBar from "./learn-test-components/info-bottom-bar/InfoBottomBar";
import LearningTestHeader from "./learn-test-components/LearningTestHeader";
import MCQLearningBody from "./learn-test-components/mcq-learning-body/MCQLearningBody";
import QuesListBoxMobile from "./learn-test-components/ques-list-box/QuesListBoxMobile";
import SubmitTestBtn from "./learn-test-components/submit-test-btn/SubmitTestBtn";
import SubmitTest from "./learn-test-components/submit-test/SubmitTest";
export default function CourseTest() {
    const { accountMode } = useAccount();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });

    switch (accountMode) {
        case "exam":
            return <ExamComponent />
        case "skills":
            return <SkillComponent />
        default:
            return null;
    }

    function ExamComponent() {
        const {
            // setTimesUp,
            // setTimeInSec,
            QuizTimeLimit,
            QuizListData,
            QueCount,
            handleNext,
            handlePrevious,
            handleMarkLater,
            selectedAnswer,
            setSelectedAnswer,
            statusCount,
            learningName,
            QueCountList,
            handleSubmitQuiz,
            handleSwitchQues,
            QueProgress,
            setTimeTakenByUser,
            setTestTimeLeftInSec
        } = UseQATest()
        return (
            <>
                <div className="pt-2 pb-8 h-screen">
                    <div className="learning-test-frame h-full mx-auto flex justify-center items-center">
                        {/* flex flex-col justify-between h-full*/}
                        <div className="left--panel xl:w-[916px] h-full">
                            <LearningTestHeader
                                countdownTime={QuizTimeLimit}
                                setTimeTakenByUser={setTimeTakenByUser}
                                setTestTimeLeftInSec={setTestTimeLeftInSec}
                            />
                            {
                                isTabletOrMobile ?
                                    // Create seprate component
                                    <QuesListBoxMobile
                                        QueCountList={QueCountList}
                                        handleSwitchQues={handleSwitchQues}
                                    />
                                    : ""
                            }
                            <MCQLearningBody
                                QuizListData={QuizListData}
                                QueCount={QueCount}
                                hanldeNext={handleNext}
                                hanldePrevious={handlePrevious}
                                hanldeMarkLater={handleMarkLater}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                                learningName={learningName}
                            />
                            {
                                isTabletOrMobile ?
                                    <>
                                        <InfoBottomBar
                                            statusCount={statusCount}
                                        />
                                        <div className="md:w-[40%] w-full mx-auto">
                                            <SubmitTestBtn
                                                QueProgress={QueProgress}
                                                handleSubmitQuizz={handleSubmitQuiz}
                                            />
                                        </div>
                                    </>
                                    :
                                    <InfoBottomBar
                                        statusCount={statusCount}
                                    />
                            }
                        </div>
                        <div className="lg:w-[315px] h-full right--panel border-l border-[#7B788066] pl-4 ml-4">
                            {/* <LevelContainer /> */}
                            <SubmitTest
                                QueCountList={QueCountList}
                                handleSubmitQuizz={handleSubmitQuiz}
                                allScore={0}
                                handleSwitchQues={handleSwitchQues}
                                QueProgress={QueProgress}
                            />
                        </div>
                    </div>

                    {/* <DragableCameraPreview stream={streamRef.current} /> */}
                </div>
                <ToastContainer />
            </>
        )
    }

    function SkillComponent() {
        const {
            // setTimesUp,
            // setTimeInSec,
            QuizTimeLimit,
            QuizListData,
            QueCount,
            handleNext,
            handlePrevious,
            handleMarkLater,
            selectedAnswer,
            setSelectedAnswer,
            statusCount,
            learningName,
            QueCountList,
            handleSubmitQuiz,
            handleSwitchQues,
            QueProgress,
            setTimeTakenByUser,
            setTestTimeLeftInSec
        } = useAssessmentTest()
        return (
            <>
                <div className="pt-2 pb-8 h-screen">
                    <div className="learning-test-frame h-full mx-auto flex justify-center items-center">
                        {/* flex flex-col justify-between h-full*/}
                        <div className="left--panel xl:w-[916px] h-full">
                            <LearningTestHeader
                                countdownTime={QuizTimeLimit}
                                setTimeTakenByUser={setTimeTakenByUser}
                                setTestTimeLeftInSec={setTestTimeLeftInSec}
                            />
                            {
                                isTabletOrMobile ?
                                    // Create seprate component
                                    <QuesListBoxMobile
                                        QueCountList={QueCountList}
                                        handleSwitchQues={handleSwitchQues}
                                    />
                                    : ""
                            }
                            <MCQLearningBody
                                QuizListData={QuizListData}
                                QueCount={QueCount}
                                hanldeNext={handleNext}
                                hanldePrevious={handlePrevious}
                                hanldeMarkLater={handleMarkLater}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                                learningName={learningName}
                            />
                            {
                                isTabletOrMobile ?
                                    <>
                                        <InfoBottomBar
                                            statusCount={statusCount}
                                        />
                                        <div className="md:w-[40%] w-full mx-auto">
                                            <SubmitTestBtn
                                                QueProgress={QueProgress}
                                                handleSubmitQuizz={handleSubmitQuiz}
                                            />
                                        </div>
                                    </>
                                    :
                                    <InfoBottomBar
                                        statusCount={statusCount}
                                    />
                            }
                        </div>
                        <div className="lg:w-[315px] h-full right--panel border-l border-[#7B788066] pl-4 ml-4">
                            {/* <LevelContainer /> */}
                            <SubmitTest
                                QueCountList={QueCountList}
                                handleSubmitQuizz={handleSubmitQuiz}
                                allScore={0}
                                handleSwitchQues={handleSwitchQues}
                                QueProgress={QueProgress}
                            />
                        </div>
                    </div>

                    {/* <DragableCameraPreview stream={streamRef.current} /> */}
                </div>
                <ToastContainer />
            </>
        )
    }
}
