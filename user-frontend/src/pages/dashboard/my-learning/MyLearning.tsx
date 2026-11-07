import { useAccount } from "@/context/account/AccountContext";
import SkillMyLearning from "@/features/user/skills-prep/my-learning/SkillMyLearning";
import SearchBar from "@/ui/search/SearchBar";
import PurchasedCourses from "./components/purchased-courses/PurchasedCourses";
import "./my-learning.css";

export default function MyLearning() {
    const { accountMode } = useAccount();

    switch (accountMode) {
        case "exam":
            return (
                <>
                    <div className="p-4">
                        <SearchBar />
                        <PurchasedCourses />
                    </div>
                </>
            );
        case "skills":
            return (
                <>
                    <div className="p-4">
                        <SearchBar />
                        <SkillMyLearning />
                    </div>
                </>
            );
        default:
            return null;
    }
}
