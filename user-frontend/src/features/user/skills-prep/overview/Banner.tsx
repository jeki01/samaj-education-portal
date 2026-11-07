import { Link } from "react-router";

export default function Banner() {
    return (
        <div className="my-2">
            <div className="mb-2 text-[14px] text-[#9533FB]">Welcome, User</div>
            <div className="skill-banner-base">
                <div>
                    <div className="skill-banner-content">
                        <div className="skill-banner-title">Start Your Learning Journey!</div>
                        <p className="skill-banner-para">Buy a bundle and get lifetime access + referral rewards.</p>
                    </div>
                    <div>
                        <Link className="skill-banner-cta" to={"/explore-bundle"}>Explore bundles</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
