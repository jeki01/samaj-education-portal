import CalenderGreyIcon from "@/svg/CalenderGreyIcon";
import UseHomeDetails from "../home/hook/useHomeDetails";
import CourseCard from "./components/course-card/CourseCard";
import CourseCategories from "./components/course-categories/CourseCategories";
import ReferEarnList from "./components/earn-list/ReferEarnList";
import UsePurchasedCourseDetails from "./hook/usePurchasedCourseDetails";

export default function MyLearnCourseContent() {
    const { purchasedCourseDetails } = UsePurchasedCourseDetails();
    const { courseListData } = UseHomeDetails();
    return (
        <>
            <div className="my-learn-course-content-base">
                <div className="my-learn-course-category">
                    <div className="my-learn-breadcrumb line-clamp-1" title={`My Learning > ${purchasedCourseDetails?.courseName}`}>{`My Learning > ${purchasedCourseDetails?.courseName}`}</div>
                    <CourseCategories courseDetails={purchasedCourseDetails} />
                </div>
                <div className="my-learn-course-similar !pt-8">
                    {
                        purchasedCourseDetails?.expireStatus &&
                        <div className="refer-info-box">
                            <div className="refer-info-content">
                                <h6 className="refer-info-title">Referred by</h6>
                                <div className="refer-info-value">{purchasedCourseDetails?.referName ? purchasedCourseDetails?.referName : "NA"}</div>
                            </div>
                        </div>
                    }
                    <CourseCard
                        name={purchasedCourseDetails?.courseName}
                        validity={purchasedCourseDetails?.courseValidity}
                        subjectType={purchasedCourseDetails?.subject?.name}
                        coursePercentage={purchasedCourseDetails?.overallProgress}
                        courseImage={purchasedCourseDetails?.courseImages}
                    />
                    {
                        purchasedCourseDetails?.expireStatus &&
                        <ReferEarnList courseId={purchasedCourseDetails?._id} />
                    }
                    <div className="title">Similar Courses</div>
                    {
                        courseListData.length > 0 && courseListData.slice(0, 3).map((courseItem, i) => (
                            <div className="course-suggested-item" key={i} >
                                <div className="txn-history-details">
                                    <img src="/dummy-tnx.png" alt="txn-img" />
                                    <div className="txn-contents">
                                        <div className="txn-title line-clamp-1" title={courseItem?.courseName || "-"}>{courseItem?.courseName || "-"}</div>
                                        <div className="txn-validity"><CalenderGreyIcon /> Validity {courseItem?.courseValidity || 0} days</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
