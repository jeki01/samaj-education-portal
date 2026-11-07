import useSkillOverview from "@/hooks/useSkillOverview";
import SearchBar from "@/ui/search/SearchBar";
import { Link } from "react-router";
import ReferralTable from "./ReferralTable";

export default function ReferralsIndex() {
    const { overviewInfo } = useSkillOverview();
    return (
        <div className="p-4">
            <SearchBar />
            <div className="my-2">
                <div className="mb-2 text-[14px] text-[#9533FB]">Welcome, User</div>
                <div className="skill-banner-base">
                    <div>
                        <div className="skill-banner-content">
                            <div className="skill-banner-title">Referral Earning</div>
                            <p className="skill-banner-para font-semibold">INR {overviewInfo?.balance}/-</p>
                        </div>
                        <div>
                            <Link className="skill-banner-cta" to={"/explore-bundles"}>Withdraw</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ReferralTable />
        </div>
    )
}
