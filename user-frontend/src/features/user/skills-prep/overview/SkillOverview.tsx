import SearchBar from "@/ui/search/SearchBar";
import Banner from "./Banner";
import BundleOverview from "./BundleOverview";
import InfoSection from "./InfoSection";
import "./overview.css";
import ReferralSection from "./referral/ReferralSection";
export default function SkillOverview() {
    return (
        <div className="p-4">
            <SearchBar />
            <Banner />
            <BundleOverview />
            <InfoSection />
            <ReferralSection />
        </div>
    )
}
