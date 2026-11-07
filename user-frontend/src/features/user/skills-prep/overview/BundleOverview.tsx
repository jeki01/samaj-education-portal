import CourseCertificateIcon from "@/svg/CourseCertificateIcon";
import CourseIcon from "@/svg/CourseIcon";
import HoursLearnIcon from "@/svg/HoursLearnIcon";
import LifeTimeIcon from "@/svg/LifeTimeIcon";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { calculateOriginalPrice } from "@/helper/global.helper";
import usePricePlan from "@/hooks/usePricePlan";
import NextCircleIcon from "@/svg/NextCircleIcon";
import PrevCircleIcon from "@/svg/PrevCircleIcon";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function BundleOverview() {
    const { bundleList } = usePricePlan();

    return (
        <div className="py-4 my-4 relative">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                // onSwiper={setSwiper}
                navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                }}
                className="mySwiper"
            >
                {
                    bundleList.map((item, i) => (
                        <SwiperSlide key={`overview-bundle-${i + 1}`}>
                            <div className="bundle-overview-base">
                                <div className="bundle-overview-img-wrapper bg-gray-300">
                                    {
                                        item?.BundleImages &&
                                        <img src={item?.BundleImages} alt="bundle" className="object-contain w-full h-full" />
                                    }
                                </div>
                                <div className="bundle-overview-content-wrapper">
                                    {/* <a >View More</a> */}
                                    <a className="bundle-overview-view" href={`/bundle/${item?._id}`} target="_blank" rel="noopener noreferrer">View more</a>
                                    <div className="bundle-overview-content">
                                        <div className="w-full max-w-[190px]">
                                            <div className="text-[14px] bg-[#FDFCFF] border border-[#9933FF] rounded-md w-full max-w-[190px] mb-2 text-center text-[#7533DB] font-bold">{item?.BundleName}</div>
                                            <div className="bg-[#FDFCFF] rounded-md shadow-[0_0px_2px_0px_#00000033] flex flex-col justify-center items-center">
                                                <div className="font-semibold">₹{item?.price} <sub className="line-through text-[#6C6A6A]">₹{calculateOriginalPrice(Number(item?.price))}</sub></div>
                                                <div className="text-[#6C6A6A] text-[12px]">inclusive of all taxes</div>
                                            </div>
                                        </div>
                                        <div className="w-[1px] bg-[#D2B0FF]"></div>
                                        <div className="bundle-overview-includes">
                                            <div className="font-semibold">Bundle Includes</div>
                                            <div className="flex justify-between items-center my-2">
                                                <div className="flex items-center gap-2 text-[14px] min-w-[180px]"><CourseIcon /> {item?.SkillCourseId.length} Courses</div>
                                                <div className="flex items-center gap-2 text-[14px] min-w-[180px]"><CourseCertificateIcon /> Course Certificate</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-[14px] min-w-[180px]"><LifeTimeIcon /> Lifetime access</div>
                                                <div className="flex items-center gap-2 text-[14px] min-w-[180px]"><HoursLearnIcon /> {item?.TimeInHours} Of Learning</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <button className="custom-prev disabled:opacity-50 absolute translate-y-[-50%] z-10 top-[50%] left-0 [&>svg]:w-6"><PrevCircleIcon /></button>
            <button className="custom-next disabled:opacity-50 absolute translate-y-[-50%] z-10 top-[50%] right-0 [&>svg]:w-6"><NextCircleIcon /></button>
        </div>
    )
}
