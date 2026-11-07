import { calculateOriginalPrice } from "@/helper/global.helper";
import usePricePlan, { type BundleList } from "@/hooks/usePricePlan";
import BundleIncludeIcon from "@/svg/BundleIncludeIcon";
import CertificateIcon from "@/svg/CertificateIcon";
import CoursesIcon from "@/svg/CoursesIcon";
import HoursLearningIcon from "@/svg/HoursLearningIcon";
import LifeTimeAccessIcon from "@/svg/LifeTimeAccessIcon";
import AuthBgFrame from "@/ui/frame/AuthBgFrame";
import { Divider } from "@heroui/react";
import { Link } from "react-router";

export default function PricingPlans() {
    const { bundleList, handleBuyPlan } = usePricePlan();
    return (
        <div className="pricing-plans-base">
            <AuthBgFrame>
                <div className="py-2 flex justify-center items-stretch gap-4 w-full">
                    {
                        bundleList.map((item, index) => (
                            <PriceCard key={index} item={item} />
                        ))
                    }
                </div>
            </AuthBgFrame>
        </div>
    )

    function PriceCard({ item }: { item: BundleList }) {
        return <div className="bg-white justify-between rounded-xl p-4 flex-1 flex flex-col 2xl:gap-4 gap-2 max-w-[334px]">
            <div className="rounded-[4px] py-2 bg-[#F7F1FF] border border-[#9933FF] w-full text-center font-extrabold 2xl:text-[16px] text-[12px] text-[#9533FB]">{item?.BundleName}</div>
            <div className="bg-[#FFF1DE42] border border-[#9533FB] rounded-[5px] 2xl:h-[180px] h-[100px]">
                {
                    item?.BundleImages &&
                    <img src={item?.BundleImages || "/"} alt="img" className="w-full h-full object-cover" />
                }
            </div>
            <div className="w-full font-bold 2xl:text-2xl text-sm bg-[#F7F1FF] rounded-[5px] p-2">
                ₹{item?.price}
                <sub className="text-[#6C6A6A] 2xl:text-[14px] text-[10px] font-medium ml-1 line-through">₹{calculateOriginalPrice(Number(item?.price))}</sub>
                <sub className="2xl:text-[10px] text-[8px] text-[#6C6A6A] font-normal ml-1 inline-block">inclusive of all taxes</sub>
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-semibold 2xl:text-[16px] text-[14px]">Bundle Includes</div>
                {
                    item?.names &&
                    <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                        <BundleIncludeIcon />
                        <span className="2xl:text-[14px] text-[10px]">{item?.names} Bundle</span>
                    </div>
                }
                <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                    <CoursesIcon />
                    <span className="2xl:text-[14px] text-[10px]">{item?.SkillCourseId.length} Courses</span>
                </div>
                <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                    <LifeTimeAccessIcon />
                    <span className="2xl:text-[14px] text-[10px]">Lifetime access</span>
                </div>
                <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                    <HoursLearningIcon />
                    <span className="2xl:text-[14px] text-[10px]">{item?.TimeInHours} Of Learning</span>
                </div>
                <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                    <CertificateIcon />
                    <span className="2xl:text-[14px] text-[10px]">Course Certificate</span>
                </div>
            </div>
            <Divider className="bg-[#9533FB] my-2" />
            <div>
                <div className="font-semibold 2xl:text-[16px] text-[14px]">Course Content</div>
                <span className="2xl:text-[14px] text-[10px] block leading-[14px]">E-Book, Video Lectures, Assessment </span>
            </div>
            <div className="flex flex-col gap-2">
                <Link target="_blank" to={`/bundle/${item?._id}`} className="py-2 text-center 2xl:text-[14px] text-[12px] text-[#9933FF] font-bold bg-[#F7F1FF] border border-[#9533FB] rounded-[5px] w-full">View More</Link>
                <button onClick={() => {
                    if (item?.status === "Buy" || item?.status === "Upgrade") {
                        handleBuyPlan({ BundleId: item?._id, amount: Number(item?.price) })
                    }
                }} className="py-2 text-center 2xl:text-[14px] text-[12px] text-white font-bold bg-[#7433DA] border border-[#9533FB] rounded-[5px] w-full">{item?.status}</button>
                <Link to={`/explore-bundle`} className="py-2 text-center 2xl:text-[14px] text-[12px] text-[#9933FF] font-bold bg-[#F7F1FF] border border-[#9533FB] rounded-[5px] w-full">Go to dashboard</Link>
            </div>
        </div>
    }
}
