import SkillLearnProvider from "./context/SkillLearnProvider";
import SKillCourseDetails from "./SKillCourseDetails";

export default function SkillCourseIndex() {
    return (
        <SkillLearnProvider>
            <SKillCourseDetails />
        </SkillLearnProvider>
    )
}
