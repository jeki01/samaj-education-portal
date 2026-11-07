import { assessmentIniVal, courseDetailsIniVal, lectureIniVal, type AssessmentScoreI, type CourseDetailsI, type LectureDetailsI } from "@/hooks/useSkillLectureDetail";
import { createContext } from "react";

type SkillLearnContextI = {
    courseTab: string,
    handleChangeCourseTab: (tab: string) => void,
    courseDetails: CourseDetailsI,
    handleSetLectureDetails: (item: LectureDetailsI) => void,
    lectureDetails: LectureDetailsI,
    handleTakeAssessment: () => void;
    assessmentScore: AssessmentScoreI;
    handleMarkAsRead: (type: "lecture" | "ebook") => Promise<void>
}

const initVal: SkillLearnContextI = {
    courseTab: "",
    handleChangeCourseTab: () => { },
    courseDetails: courseDetailsIniVal,
    handleSetLectureDetails: () => { },
    lectureDetails: lectureIniVal,
    handleTakeAssessment: () => { },
    assessmentScore: assessmentIniVal,
    handleMarkAsRead: async () => { }
}

export const SkillLearnContext = createContext<SkillLearnContextI>(initVal);