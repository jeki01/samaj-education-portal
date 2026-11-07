import useSkillOverview from "@/hooks/useSkillOverview";
import BookCircleIcon from "@/svg/BookCircleIcon";
import UsersCircleIcon from "@/svg/UsersCircleIcon";
import WalletCircleIcon from "@/svg/WalletCircleIcon";

export default function InfoSection() {
    const { overviewInfo } = useSkillOverview();
    return (
        <div className="flex items-center gap-4">
            <div className="skill-info-card">
                <div className="skill-info-card-content">
                    <BookCircleIcon />
                    <div className="skill-info-card-content-wrapper">
                        <div className="skill-info-card-title">Courses</div>
                        <div className="skill-info-card-value">{overviewInfo?.totalCourses || "NA"}</div>
                    </div>
                    <div></div>
                </div>
                <button type="button" className="skill-info-card-cta">learn</button>
            </div>
            <div className="skill-info-card">
                <div className="skill-info-card-content">
                    <UsersCircleIcon />
                    <div className="skill-info-card-content-wrapper">
                        <div className="skill-info-card-title">Referrals</div>
                        <div className="skill-info-card-value">{overviewInfo?.totalUsers || "NA"}</div>
                    </div>
                    <div></div>
                </div>
                <button type="button" className="skill-info-card-cta">View more</button>
            </div>
            <div className="skill-info-card">
                <div className="skill-info-card-content">
                    <WalletCircleIcon />
                    <div className="skill-info-card-content-wrapper">
                        <div className="skill-info-card-title">Referral Earning</div>
                        <div className="skill-info-card-value">INR {overviewInfo?.balance}/-</div>
                    </div>
                    <div></div>
                </div>
                <button type="button" className="skill-info-card-cta">Withdraw</button>
            </div>
        </div>
    )
}
