import useBundleDetails from "@/hooks/useBundleDetails";
import BundleIncludeIcon from "@/svg/BundleIncludeIcon";
import CertificateIcon from "@/svg/CertificateIcon";
import CoursesIcon from "@/svg/CoursesIcon";
import HoursLearningIcon from "@/svg/HoursLearningIcon";
import LifeTimeAccessIcon from "@/svg/LifeTimeAccessIcon";
import WhiteCourseIcon from "@/svg/WhiteCourseIcon";
import { Divider } from "@heroui/react";
import parse from "html-react-parser";
import { Link } from "react-router";
import CertificateSection from "./CertificateSection";
import FAQSection from "./FAQSection";
import TestimonialSection from "./TestimonialSection";
export default function BundleDetails() {
    const { bundleDetails, handleBuyPlan } = useBundleDetails();
    return (
        <div>
            <div className="bg-[linear-gradient(90deg,#6633CC,#9933FF)] h-[300px] px-4 py-10">
                <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full mx-auto">
                    <h2 className="text-white font-semibold xl:text-2xl text-xl">{bundleDetails?.BundleName || "-"}</h2>
                    <div className="text-white font-normal xl:text-[16px] text-[14px]">{bundleDetails?.tagline || "-"}</div>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex items-center gap-2">
                            <WhiteCourseIcon color="#FFF" />
                            <span className="text-white xl:text-[14px] text-[12px]">{bundleDetails?.SkillCourseId.length} Courses</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <WhiteCourseIcon color="#FFF" />
                            <span className="text-white xl:text-[14px] text-[12px]">{bundleDetails?.TimeInHours}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full mx-auto py-10 flex items-start justify-between gap-8">
                <div className="flex-2 max-w-[1111px] bg-[#F8F1FF] rounded-[20px] p-4 w-full">
                    <div className="font-semibold text-lg mb-2">Course Overview</div>
                    <div className="[&>p]:text-[14px] [&>p]:leading-[20px] [&>p]:mb-2 [&>ul]:text-[14px] [&>ol]:text-[14px] [&>ol]:mb-2 [&>ul]:mb-2 [&>ol]:list-decimal [&>ul]:list-disc [&>ol]:pl-4 [&>ul]:pl-4">
                        {bundleDetails?.description ? parse(bundleDetails?.description) : "NA"}
                    </div>
                </div>
                <div className="flex-1 max-w-[500px] bg-[#F8F1FF] border border-[#AE61FF] rounded-[20px] p-4 -mt-[200px]">
                    <div className="bg-[#FFF1DE42] border border-[#9533FB] rounded-[5px] 2xl:h-[250px] h-[200px] w-[350px]">
                        {
                            bundleDetails?.BundleImages &&
                            <img src={bundleDetails?.BundleImages || "/"} alt="img" className="w-full h-full object-cover" />
                        }
                    </div>
                    <div className="w-full font-bold 2xl:text-2xl text-sm bg-white rounded-[10px] p-2 my-4 shadow-[0_1px_4px_0px_#00000040] ">
                        ₹{bundleDetails?.price}
                        <sub className="text-[#6C6A6A] 2xl:text-[14px] text-[10px] font-medium ml-1 line-through">₹4,000</sub>
                        <sub className="2xl:text-[10px] text-[8px] text-[#6C6A6A] font-normal ml-1 inline-block">inclusive of all taxes</sub>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold 2xl:text-[16px] text-[14px]">Bundle Includes</div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <BundleIncludeIcon />
                            <span className="2xl:text-[14px] text-[10px]">{bundleDetails?.BundleName}</span>
                        </div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <CoursesIcon />
                            <span className="2xl:text-[14px] text-[10px]">{bundleDetails?.SkillCourseId.length} Courses</span>
                        </div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <LifeTimeAccessIcon />
                            <span className="2xl:text-[14px] text-[10px]">Lifetime access</span>
                        </div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <HoursLearningIcon />
                            <span className="2xl:text-[14px] text-[10px]">{bundleDetails?.TimeInHours} Of Learning</span>
                        </div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <CertificateIcon />
                            <span className="2xl:text-[14px] text-[10px]">Course Certificate</span>
                        </div>
                    </div>
                    <Divider className="bg-[#9533FB] my-2" />
                    <div>
                        <div className="font-semibold 2xl:text-[16px] text-[14px] mb-2">Course Content</div>
                        <span className="2xl:text-[14px] text-[10px] block leading-[14px]">E-Book, Video Lectures, Assessment </span>
                    </div>
                    <div className="flex flex-col gap-2 mt-6">
                        <button type="button" onClick={() => {
                            if (bundleDetails?.status === "Buy" || bundleDetails?.status === "Upgrade") {
                                handleBuyPlan({ BundleId: bundleDetails?._id, amount: Number(bundleDetails?.price) })
                            }
                        }} className="py-2 text-center 2xl:text-[14px] text-[12px] text-white font-bold bg-[#7433DA] border border-[#9533FB] rounded-[5px] w-full">{bundleDetails?.status}</button>
                    </div>
                </div>
            </div>

            <div className="bg-[#F8F1FF]">
                <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full mx-auto py-10 ">
                    <div className="flex items-center justify-between mb-8">
                        <div className="font-semibold text-lg">Course Content</div>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <WhiteCourseIcon color="#7D00FF" />
                                <span className="xl:text-[14px] text-[12px] font-medium">{bundleDetails?.SkillCourseId.length} Lectures</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <WhiteCourseIcon color="#7D00FF" />
                                <span className="xl:text-[14px] text-[12px] font-medium">{bundleDetails?.TimeInHours}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            bundleDetails?.SkillCourseId.map((item, i) => (
                                <Link to={`/course/${item?._id}`} key={i} className="bg-white border border-[#AE61FF] rounded-[20px] p-4 min-w-[300px] max-w-[380px] flex-1 shadow-[0_1px_4px_0px_#00000040]">
                                    <div className="rounded-[10px] bg-[#FFF1DE42] border border-[#AE61FF] h-[200px]">
                                        {
                                            item?.SkillcourseImages &&
                                            <img src={item?.SkillcourseImages || "/"} alt="img" className="w-full h-full object-cover" />
                                        }
                                    </div>
                                    <div className="w-full font-bold 2xl:text-lg text-sm bg-white rounded-[10px] p-2 my-4 shadow-[0_1px_4px_0px_#00000040] ">
                                        {item?.SkillName}
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>

            <CertificateSection />
            <FAQSection />
            <TestimonialSection />
        </div>
    )
}
