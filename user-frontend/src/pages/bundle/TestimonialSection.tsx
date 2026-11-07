import LeftDoubleQuoteIcon from "@/svg/LeftDoubleQuoteIcon";
import RightDoubleQuoteIcon from "@/svg/RightDoubleQuoteIcon";
import { Divider } from "@heroui/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function TestimonialSection() {
    return (
        <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full my-10 mx-auto py-10 bg-[#F8F1FF]">
            <div className="font-semibold text-lg mb-6 text-center">What Our Student Says</div>

            <Swiper
                modules={[Autoplay, Pagination]}
                className="hero-curve-img-swiper"
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                // speed={6000}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
            >
                {[1, 2, 3].map((_, index) => (
                    <SwiperSlide key={`business-all-img-${index + 1}`} className="flex justify-center">
                        <div className="max-w-[1000px] mx-auto flex gap-2 justify-center">
                            <div className="flex">
                                <LeftDoubleQuoteIcon />
                            </div>
                            <div className="h-[200px] flex flex-col items-start justify-center">
                                <p className="text-[14px] font-medium px-4">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                                    from 45 BC, making it over 2000 years old.</p>
                                <Divider className="bg-[#9533FB] my-4" />
                                <div className="text-[14px] font-medium px-4">Vedika Vishwas</div>
                                <div className="text-[14px] font-medium px-4">Student</div>
                            </div>
                            <div className="flex items-end">
                                <RightDoubleQuoteIcon />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
