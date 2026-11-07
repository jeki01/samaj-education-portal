import useSkillLectureDetail from "@/hooks/useSkillLectureDetail";
import { SkillLearnContext } from "./SkillLearnContext";

export default function SkillLearnProvider({ children }: { children: React.ReactNode }) {
    const {
        handleSetLectureDetails,
        lectureDetails,
        courseTab,
        handleChangeCourseTab,
        courseDetails,
        handleTakeAssessment,
        assessmentScore,
        handleMarkAsRead
    } = useSkillLectureDetail();
    return (
        <>
            <SkillLearnContext.Provider value={{
                handleSetLectureDetails,
                lectureDetails,
                courseTab,
                handleChangeCourseTab,
                courseDetails,
                handleTakeAssessment,
                assessmentScore,
                handleMarkAsRead
            }}>
                {children}
            </SkillLearnContext.Provider>
        </>
    )
}
