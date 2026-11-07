import SuccessCheckIcon from "@/svg/SuccessCheckIcon";
import "./mcq-learning-body.css";
import { type SaveAndNextQueAns_BodyData } from "@/services/my-learning.service";
import type { TopicQuestions } from "@/pages/dashboard/my-learning/learning.type";
import { useParams } from "react-router";
import type { LearningNamesI } from "../../hook/useQATest";

export default function MCQLearningBody({ QuizListData, QueCount, hanldeNext, hanldePrevious, hanldeMarkLater, selectedAnswer, setSelectedAnswer, learningName }: MCQLearningBodyProp) {
    const slug = useParams();
    return (
        <>
            {/* Top info bar */}
            <div className="h-[28px] flex items-center gap-x-2 flex-wrap test-top-info-bar-base">
                {/* <div className="text-primary text-[12px] font-bold">My Learning</div> */}
                {/* <div className="w-[3px] h-[3px] bg-primary rounded-full"></div> */}
                <div className="text-primary text-[12px] font-bold">{learningName?.courseName} </div>
                <div className="w-[3px] h-[3px] bg-primary rounded-full"></div>
                <div className="text-primary text-[12px] font-bold">{learningName?.topicName} </div>
            </div>

            <div className="option-container">
                {/* Question bar */}
                <div className="question--bar">
                    <div className="question--no text-[#9533FB] text-[24px] font-bold">{QueCount + 1} Question: <span className=" text-[#202020]">{QuizListData[QueCount]?.question || "-"}</span></div>
                    {
                        QuizListData[QueCount]?.questionImage &&
                        <img src={QuizListData[QueCount]?.questionImage} alt="question-img" className="w-[300px] h-[200px] border border-[#5f5f5f] bg-[#F7F1FF] " />
                    }
                    {/* <div className="question--name text-[#202020] text-[24px] font-bold"></div> */}
                </div>

                {/* Multi choice answer */}
                <div className="mb-4 ">

                    {
                        [
                            {
                                sno: "A",
                                option: QuizListData[QueCount]?.option1 || "-",
                                answer: "option1",
                                image: QuizListData[QueCount]?.option1Image
                            },
                            {
                                sno: "B",
                                option: QuizListData[QueCount]?.option2 || "-",
                                answer: "option2",
                                image: QuizListData[QueCount]?.option2Image
                            },
                            {
                                sno: "C",
                                option: QuizListData[QueCount]?.option3 || "-",
                                answer: "option3",
                                image: QuizListData[QueCount]?.option3Image
                            },
                            {
                                sno: "D",
                                option: QuizListData[QueCount]?.option4 || "-",
                                answer: "option4",
                                image: QuizListData[QueCount]?.option4Image
                            },
                            ...(QuizListData[QueCount]?.option5 || QuizListData[QueCount]?.option5Image
                                ? [{
                                    sno: "E",
                                    option: QuizListData[QueCount].option5,
                                    answer: "option5",
                                    image: QuizListData[QueCount]?.option5Image
                                }]
                                : [])
                        ].map(({ option, answer, sno, image }, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between cursor-pointer bg-[#F7F1FF] p-2 rounded-[10px] my-4" onClick={() => {
                                    setSelectedAnswer(answer)
                                }}>
                                    <div className={`flex items-start gap-x-2 test-option-wrapper ${option !== "-" && !image ? "items-center" : "items-start"}`}>
                                        <div className="bg-[#EEDEFF] xl:w-[48px] w-[30px] h-[30px] xl:h-[48px] lg:h-[38px] border border-[#E0E0E0] text-[#202020] text-[16px] md:text-[18px] font-bold flex justify-center items-center rounded-[12px]">{sno}</div>
                                        <div className={`flex flex-col items-start gap-y-4 test-option-text`}>
                                            {
                                                option !== "-" ? <>
                                                    <div className="text-[#202020] text-[16px] md:text-[18px] font-bold">{option}</div>
                                                    {image && <img src={image} alt={`option-${sno}-img`} className="w-[300px] h-[200px] border border-[#5f5f5f] bg-[#F7F1FF] " />}
                                                </>
                                                    :
                                                    image && <img src={image} alt={`option-${sno}-img`} className="w-[300px] h-[200px] border border-[#5f5f5f] bg-[#F7F1FF] " />

                                            }
                                        </div>
                                    </div>
                                    {
                                        selectedAnswer === answer ?
                                            <div className="check-box-indicator xl:w-[48px] lg:w-[38px] xl:h-[48px] lg:h-[38px] w-[30px] h-[30px] rounded-full border border-[#259800] bg-[#2598001A] flex justify-center items-center mr-4 mt-auto"><SuccessCheckIcon /></div>
                                            :
                                            (selectedAnswer === null && QuizListData[QueCount]?.clientAnswer === answer) ?
                                                <div className="check-box-indicator xl:w-[48px] lg:w-[38px] xl:h-[48px] lg:h-[38px] w-[30px] h-[30px] rounded-full border border-[#259800] bg-[#2598001A] flex justify-center items-center mr-4 mt-auto"><SuccessCheckIcon /></div>
                                                :
                                                <div className="check-box-indicator xl:w-[48px] lg:w-[38px] xl:h-[48px] lg:h-[38px] w-[30px] h-[30px] rounded-full border border-[#A8A8A8] bg-transparent mr-4 mt-auto"></div>
                                    }
                                </div>
                                {/* <div className="bg-[#D5D7D9] h-[1px] my-4"></div> */}
                            </div>
                        ))
                    }

                </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center my-4 test-btn-actions-box">
                <button onClick={() => {
                    hanldeMarkLater();
                    setSelectedAnswer(null);
                }} className="font-semibold text-[16px] text-[#6633CC] h-[54px] bg-white border border-[#6633CC] rounded-[16px] w-[200px]">Mark for later</button>
                <div className="flex items-center gap-x-4 test-btn-next-prev-box">
                    <button onClick={() => {
                        hanldePrevious();
                        setSelectedAnswer(null);
                    }} className="font-semibold text-[16px] text-[#6633CC] h-[54px] bg-[#F7F1FF] border border-[#6633CC] rounded-[16px] w-[200px]">Previous</button>
                    <button
                        disabled={!(selectedAnswer !== null)}
                        className="disabled:bg-gray-500 font-semibold text-[16px] text-white h-[54px] common-btn-ui !rounded-[16px] w-[200px]"
                        onClick={() => {
                            if (selectedAnswer && slug?.courseId && slug?.topicId) {
                                hanldeNext({
                                    courseId: slug?.courseId,
                                    testSeriesId: slug?.topicId,
                                    questionId: QuizListData[QueCount]?._id,
                                    selectedAnswer: selectedAnswer
                                }, selectedAnswer, QueCount)
                            }
                            setSelectedAnswer(null)
                        }}
                    >Save & Next</button>
                </div>
            </div>
        </>
    )
}

interface MCQLearningBodyProp {
    QuizListData: TopicQuestions[],
    hanldeNext: (data: SaveAndNextQueAns_BodyData, answer: string, idx: number | null) => void,
    QueCount: number,
    hanldePrevious: () => void,
    hanldeMarkLater: () => void,
    selectedAnswer: null | string,
    setSelectedAnswer: React.Dispatch<React.SetStateAction<string | null>>,
    learningName: LearningNamesI,
}