import CalenderGreyIcon from "@/svg/CalenderGreyIcon";
import "./course-card.css";
import CourseDetailsModal from "./CourseDetailsModal";
import type { CourseListData } from "@/pages/dashboard/home/hook/useHomeDetails";
import UseCourseCard from "./hook/useCourseCard";
import { formatNumber } from "@/helper/global.helper";

export default function CourseCard({ course, isWishlistCard, deleteCardFn, walletPrice, isRefer, courseImage }: CourseCardProp) {
    const {
        isOpen,
        onOpen,
        onOpenChange,
        discountPrice,
        onClose
    } = UseCourseCard(course);

    return (
        <>
            <div className="course-card-base">
                <img src={courseImage ? courseImage : "/course-img-dummy.png"} alt="course-img" className="course-card-img" />
                <div className="course-card-details">
                    <div className="course-card-title line-clamp-1" title={course?.courseName || "-"}>{course?.courseName || "-"}</div>
                    <div className="course-card-validity"><CalenderGreyIcon /> Validity {course?.courseValidity || 0} days </div>
                    <div className="flex items-center gap-x-2 justify-between">
                        <div className="course-card-pricing">
                            <span className="course-card-final-price">₹ {formatNumber(course?.coursePrice) || 0}/-</span>
                            <span className="course-card-orignal-price">₹ {formatNumber(discountPrice) || 0}/-</span>
                        </div>
                        {
                            course?.subject?.name &&
                            <span className="course-type line-clamp-1" title={course?.subject?.name}>{course?.subject?.name}</span>
                        }
                    </div>
                    <div className="flex items-center gap-x-2">
                        <button onClick={onOpen} type="button" className="course-card-buy-btn">Buy</button>
                        {
                            isWishlistCard &&
                            <button onClick={() => {
                                if (deleteCardFn) {
                                    deleteCardFn(course?._id)
                                }
                            }} type="button" className="course-card-buy-btn">Remove</button>
                        }
                    </div>
                </div>
            </div>

            <CourseDetailsModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                course={course}
                fixedDiscountPrice={discountPrice}
                walletPrice={walletPrice}
                isRefer={isRefer}
                onClose={onClose}
            />
        </>
    )
}

interface CourseCardProp {
    course: CourseListData,
    isWishlistCard?: boolean,
    deleteCardFn?: (i: string) => void,
    walletPrice: number,
    isRefer: boolean;
    courseImage: string;
}