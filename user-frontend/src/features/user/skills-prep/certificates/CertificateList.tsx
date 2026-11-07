import ReferralSection from "../overview/referral/ReferralSection";

export default function CertificateList() {
    return (
        <div className="course-list-base">
            {/* head */}
            <div className="course-list-head">
                <div className="course-list-title">My Certificates</div>
            </div>
            <ReferralSection />
        </div>
    )
}
