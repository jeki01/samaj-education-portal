import SelectFieldImgIcon from "@/svg/SelectFieldImgIcon";
import AuthBgFrame from "@/ui/frame/AuthBgFrame";
import TypeBox from "@/ui/type-box/TypeBox";
import { Link } from "react-router";
import UseSelectField from "./hook/useSelectField";
import "./select-field-page.css";

export default function SelectFieldPage() {
    const {
        selectFieldFormik,
        fieldTypeActiveHandler,
        isNextSection,
        toggleNextSection,
        examTypeActiveHandler
    } = UseSelectField();

    return (
        <>
            <AuthBgFrame>
                <div className="select-field-base">
                    {/* Illustration */}
                    <div className="sf-illustration">
                        <SelectFieldImgIcon />
                    </div>

                    {/* Step progress */}
                    <div className="sf-progress">
                        <div className={`sf-step-dot ${!isNextSection ? "sf-step-active" : "sf-step-done"}`}>
                            {isNextSection ? "✓" : "1"}
                        </div>
                        <div className={`sf-step-line ${isNextSection ? "sf-step-line-done" : ""}`} />
                        <div className={`sf-step-dot ${isNextSection ? "sf-step-active" : ""}`}>2</div>
                    </div>

                    {/* Step 1: Who are you? */}
                    {!isNextSection ? (
                        <div className="sf-content">
                            <div className="select-field-title">Sign <span>Up</span></div>
                            <p className="sf-subtitle">Who are you?</p>
                            <div className="select-field-type-base">
                                <div onClick={() => fieldTypeActiveHandler("student")} className="cursor-pointer w-full">
                                    <TypeBox
                                        text={"Student"}
                                        image={<img src="/student-icon.svg" alt="student" />}
                                        isActive={selectFieldFormik.values.studentType === "student"}
                                    />
                                </div>
                            </div>
                            <button onClick={toggleNextSection} className="common-btn-ui" type="button">Next</button>
                        </div>
                    ) : (
                        /* Step 2: What are you preparing for? */
                        <div className="sf-content">
                            <div className="select-field-title">Sign <span>Up</span></div>
                            <p className="sf-subtitle">What are you preparing for?</p>
                            <div className="select-field-type-base">
                                <div onClick={() => examTypeActiveHandler("exam")} className="cursor-pointer w-full">
                                    <TypeBox
                                        text={"Government Exams Preparation"}
                                        image={<img src="/gov-exam-icon.svg" alt="government exam" />}
                                        isActive={selectFieldFormik.values.examType === "exam"}
                                    />
                                </div>
                                <div onClick={() => examTypeActiveHandler("skills")} className="cursor-pointer w-full">
                                    <TypeBox
                                        text={"Skills Preparation"}
                                        image={<img src="/skills-icon.svg" alt="skills" />}
                                        isActive={selectFieldFormik.values.examType === "skills"}
                                    />
                                </div>
                            </div>
                            <button onClick={selectFieldFormik.submitForm} className="common-btn-ui" type="button">Get Started</button>
                        </div>
                    )}

                    <div className="signup-btm-text" style={{ margin: "8px 0 2px" }}>
                        Already have an account? <Link to={"/login"}>Log In</Link>
                    </div>
                </div>
            </AuthBgFrame>
        </>
    )
}
