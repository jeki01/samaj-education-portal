import CourseCard from "@/ui/course-card/CourseCard";
import UseWishlist from "./hook/useWishlist";
import "./wishlist.css";

export default function MainPage() {
    const { courseListData, handleDeleteWishlist, walletPrice, isRefer } = UseWishlist()

    return (
        <>
            <div className="p-4">
                <div className="course-list-base">
                    {/* head */}
                    <div className="course-list-head">
                        <div className="course-list-title">Your Wishlist</div>
                    </div>
                    {/* list */}
                    <div className="course-list-box">
                        {courseListData.length > 0 && courseListData.map((courseItem, i) => (
                            <CourseCard
                                key={i}
                                course={courseItem.courseId}
                                isWishlistCard={true}
                                deleteCardFn={handleDeleteWishlist}
                                walletPrice={walletPrice}
                                isRefer={isRefer}
                                courseImage={courseItem?.courseId?.courseImages}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
