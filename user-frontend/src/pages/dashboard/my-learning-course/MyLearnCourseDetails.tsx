import { useAccount } from "@/context/account/AccountContext";
import SkillCourseIndex from "@/features/user/skills-prep/my-learning/SkillCourseIndex";
import SearchBar from "@/ui/search/SearchBar";
import "./my-learning-course.css";
import MyLearnCourseContent from "./MyLearnCourseContent";

export default function MyLearnCourseDetails() {
    const { accountMode } = useAccount();

    switch (accountMode) {
        case "exam":
            return (
                <>
                    <div className="p-4 pb-0">
                        <SearchBar />
                        <MyLearnCourseContent />
                    </div>
                </>
            );
        case "skills":
            return (
                <>
                    <div className="p-4 pb-0">
                        <SearchBar />
                        <SkillCourseIndex />
                    </div>
                </>
            );
        default:
            return null;
    }
}
