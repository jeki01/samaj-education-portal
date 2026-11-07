import CalenderGreyIcon from "@/svg/CalenderGreyIcon";
import "./course-card.css";
import { Progress } from "@heroui/react";

export default function CourseCard({ name, validity, subjectType, coursePercentage, courseImage }: CourseCardProp) {
    return (
        <>
            <div className="learning-course-card">
                <img src={courseImage ? courseImage : "/course-img-dummy.png"} alt="course-img" className="learning-course-card-img" />
                <div className="learning-course-card-box">
                    <div className="learning-course-card-title line-clamp-1" title={name}>{name}</div>
                    <div className="flex items-center gap-x-2 justify-between w-full min-h-[25px]">
                        <div className="learning-course-card-content">
                            <div className="txn-validity"><CalenderGreyIcon /> Validity {validity} days</div>
                        </div>
                        {
                            subjectType &&
                            <span className="course-type line-clamp-1" title={subjectType}>{subjectType}</span>
                        }
                    </div>
                </div>
                <div className="progress-bar-base">
                    <Progress aria-label="Loading..." size="sm" value={coursePercentage} classNames={{ indicator: "bg-[#7634DC]" }} />
                    <div className="progress-text">{coursePercentage}% Completed </div>
                </div>
            </div>
        </>
    )
}

interface CourseCardProp {
    name: string,
    validity: number,
    subjectType: string,
    coursePercentage: number;
    courseImage: string;
}