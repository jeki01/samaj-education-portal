import useCourseDetails from "@/hooks/useCourseDetails";
import BundleIncludeIcon from "@/svg/BundleIncludeIcon";
import CertificateIcon from "@/svg/CertificateIcon";
import CoursesIcon from "@/svg/CoursesIcon";
import HoursLearningIcon from "@/svg/HoursLearningIcon";
import LifeTimeAccessIcon from "@/svg/LifeTimeAccessIcon";
import WhiteClockIcon from "@/svg/WhiteClockIcon";
import WhiteCourseIcon from "@/svg/WhiteCourseIcon";
import { Divider } from "@heroui/react";
import CertificateSection from "../bundle/CertificateSection";
import FAQSection from "../bundle/FAQSection";
import TestimonialSection from "../bundle/TestimonialSection";
import CourseOffer from "./CourseOffer";
// import CertificateSection from "./CertificateSection";
// import FAQSection from "./FAQSection";
// import TestimonialSection from "./TestimonialSection";
import parse from "html-react-parser";

export default function CourseDetails() {
    const { courseDetails } = useCourseDetails();
    return (
        <div>
            <div className="bg-[linear-gradient(90deg,#6633CC,#9933FF)] h-[300px] px-4 py-10">
                <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full mx-auto">
                    <h2 className="text-white font-semibold xl:text-2xl text-xl">{courseDetails?.SkillName || "-"}</h2>
                    <div className="text-white font-normal xl:text-[16px] text-[14px]">{courseDetails?.tagline || "-"}</div>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex items-center gap-2">
                            <WhiteCourseIcon color="#FFF" />
                            <span className="text-white xl:text-[14px] text-[12px]">{courseDetails?.lectures.length} Contents</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <WhiteClockIcon />
                            <span className="text-white xl:text-[14px] text-[12px]">{courseDetails?.TimeInHours || "- hours"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <WhiteClockIcon />
                            <span className="text-white xl:text-[14px] text-[12px]">Students Enrolled</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full mx-auto py-10 flex items-start justify-between gap-8">
                <div className="flex-2 w-full">
                    <div className="max-w-[1111px] bg-[#F8F1FF] border border-[#7F33E5] rounded-[20px] p-4 flex items-stretch justify-around mb-8 min-h-[150px] -mt-[118px]">
                        <div className="flex flex-col items-center justify-center gap-2 flex-1">
                            <div className="font-semibold">Lifetime access</div>
                            <div className="text-[14px]">Full lifetime access</div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 border-x border-[#7F33E5] flex-1">
                            <div className="font-semibold">Online training</div>
                            <div className="text-[14px]">Learning format</div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 flex-1">
                            <div className="font-semibold">Certificate</div>
                            <div className="text-[14px]">Certificate of Completion</div>
                        </div>
                    </div>
                    <div className="max-w-[1111px] bg-[#F8F1FF] rounded-[20px] p-4">
                        <div className="font-semibold text-lg mb-2">Course Overview</div>
                        <div className="[&>p]:text-[14px] [&>p]:leading-[20px] [&>p]:mb-2 [&>ul]:text-[14px] [&>ol]:text-[14px] [&>ol]:mb-2 [&>ul]:mb-2 [&>ol]:list-decimal [&>ul]:list-disc [&>ol]:pl-4 [&>ul]:pl-4">
                            {courseDetails?.About ? parse(courseDetails?.About) : "NA"}
                        </div>
                    </div>
                    <div className="max-w-[1111px] bg-[#F8F1FF] rounded-[20px] p-4 mt-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="font-semibold text-lg">Course Content</div>
                            <div className="flex items-center gap-2 mt-4">
                                <div className="flex items-center gap-2">
                                    <WhiteCourseIcon color="#7D00FF" />
                                    <span className="xl:text-[14px] text-[12px] font-medium">{courseDetails?.lectures.length} Lectures</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <WhiteCourseIcon color="#7D00FF" />
                                    <span className="xl:text-[14px] text-[12px] font-medium">{courseDetails?.TimeInHours || "- hours"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            {
                                courseDetails?.lectures.map((item, i) => (
                                    <div key={i} className="border-b border-[#DEBEFF] pb-2 mb-2 flex items-center gap-2 px-2 w-full">
                                        <WhiteCourseIcon color="#7D00FF" />
                                        <div>{item?.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="flex-1 max-w-[500px] bg-[#F8F1FF] border border-[#AE61FF] rounded-[20px] p-4 -mt-[200px]">
                    <div className="bg-[#FFF1DE42] border border-[#9533FB] rounded-[5px] 2xl:h-[250px] h-[200px] w-[350px]">
                        {
                            courseDetails?.SkillcourseImages &&
                            <img src={courseDetails?.SkillcourseImages || "/"} alt="img" className="w-full h-full object-cover" />
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold 2xl:text-[16px] text-[14px] mt-2">Course Includes</div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <BundleIncludeIcon />
                            <span className="2xl:text-[14px] text-[10px]">Bronze Bundle</span>
                        </div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <CoursesIcon />
                            <span className="2xl:text-[14px] text-[10px]">{courseDetails?.lectures.length} Lectures</span>
                        </div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <LifeTimeAccessIcon />
                            <span className="2xl:text-[14px] text-[10px]">Lifetime access</span>
                        </div>
                        <div className="flex gap-2 items-center 2xl:[&>svg]:w-5 2xl:[&>svg]:h-5 [&>svg]:w-3 [&>svg]:h-3">
                            <HoursLearningIcon />
                            <span className="2xl:text-[14px] text-[10px]">{courseDetails?.TimeInHours} Of Learning</span>
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
                </div>
            </div>

            <CourseOffer />
            <CertificateSection />
            <FAQSection />
            <TestimonialSection />
        </div>
    )
}
