import { forwardRef } from "react";
import IncorrectIcon from "@/svg/IncorrectIcon";
import CorrectIcon from "@/svg/CorrectIcon";
import NotAttemptedIcon from "@/svg/NotAttemptedIcon";
import type { questionDetails } from "../hook/useCheckResult";
import { Link } from "react-router";

interface QuesListsProp {
    data: questionDetails[];
}

const QuesLists = forwardRef<(HTMLDivElement | null)[], QuesListsProp>(({ data }, ref) => {
    return (
        <div className="check-result__question-list">
            <div className="question-list__header">
                <Link to={"/home"}>
                    <img src="/brand-logo.svg" alt="logo" />
                </Link>
            </div>

            <div className="question-list__container">
                {data.length > 0 &&
                    data.map((ques, idx) => (
                        <div
                            key={idx}
                            ref={(el) => {
                                if (ref && typeof ref !== "function") {
                                    (ref as React.RefObject<(HTMLDivElement | null)[]>).current[
                                        idx
                                    ] = el;
                                }
                            }}
                            className="ques-item-wrapper"
                        >
                            <div className="ques-item">
                                <h4 className="ques-item__title">
                                    <span>{idx + 1} :</span> {ques?.question}
                                </h4>

                                {ques?.questionImage && (
                                    <img
                                        src={ques?.questionImage}
                                        alt="que-img"
                                        className="ques-item__title-img"
                                    />
                                )}

                                <ul className="ques-item__option-list">
                                    {ques?.options.length > 0 &&
                                        ques?.options.map((options, i) => (
                                            <li
                                                key={i}
                                                className={`ques-item__option-list__item ${ques?.selectedAnswer?.key === options?.key
                                                    ? "selected"
                                                    : ""
                                                    }`}
                                            >
                                                {options?.text || ""}
                                                {options?.image && (
                                                    <img
                                                        src={options?.image}
                                                        alt="option"
                                                        className="ques-item__option-list__item-img"
                                                    />
                                                )}
                                            </li>
                                        ))}
                                </ul>

                                {ques?.status === "Wrong" &&
                                    ques?.selectedAnswer?.key !== ques?.correctAnswer?.key ? (
                                    <>
                                        <div className="ques-item__incorrect">
                                            <span>
                                                <IncorrectIcon />
                                            </span>
                                            <span>Incorrect:</span>
                                            <span className="value">
                                                {ques?.selectedAnswer?.text || ""}
                                                {ques?.selectedAnswer?.image && (
                                                    <img
                                                        src={ques?.selectedAnswer?.image}
                                                        alt="correct-answer"
                                                        className="correct-value-img"
                                                    />
                                                )}
                                            </span>
                                        </div>
                                        <div className="ques-item__correct">
                                            <span>
                                                <CorrectIcon />
                                            </span>
                                            <span>Correct Answer is :</span>
                                            <span className="value">
                                                {ques?.correctAnswer?.text || ""}
                                                {ques?.correctAnswer?.image && (
                                                    <img
                                                        src={ques?.correctAnswer?.image}
                                                        alt="correct-answer"
                                                        className="correct-value-img"
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </>
                                ) : ques?.status === "Correct" ? (
                                    <div className="ques-item__correct">
                                        <span>
                                            <CorrectIcon />
                                        </span>
                                        <span>Correct :</span>
                                        <span className="value">
                                            {ques?.selectedAnswer?.text || ""}
                                            {ques?.selectedAnswer?.image && (
                                                <img
                                                    src={ques?.selectedAnswer?.image}
                                                    alt="correct-answer"
                                                    className="correct-value-img"
                                                />
                                            )}
                                        </span>
                                    </div>
                                ) : ques?.status === "Not Attempted" ? (
                                    <div className="ques-item__not-attempted">
                                        <span>
                                            <NotAttemptedIcon />
                                        </span>
                                        <span>Not attempted </span>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            {idx !== data.length - 1 && (
                                <div className="ques-item__divider"></div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
});

QuesLists.displayName = "QuesLists";

export default QuesLists;
