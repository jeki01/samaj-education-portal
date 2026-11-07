import CalenderGreyIcon from "@/svg/CalenderGreyIcon";
import MultiSelectTickIcon from "@/svg/MultiSelectTickIcon";
import {
    Modal,
    ModalContent,
    ModalBody,
    Divider,
} from "@heroui/react";
import "./course-details-modal.css";
import VideoLecIcon from "@/svg/VideoLecIcon";
import StudyNotesIcon from "@/svg/StudyNotesIcon";
import EBooksIcon from "@/svg/EBooksIcon";
import TestSeriesIcon from "@/svg/TestSeriesIcon";
import type { CourseListData } from "@/pages/dashboard/home/hook/useHomeDetails";
import UseCoursePriceDistribution from "./hook/useCoursePriceDistribution";
import CoursePackIcon from "@/svg/CoursePackIcon";
import ReferButton from "./components/refer-btn/ReferButton";
import CourseDescription from "./components/course-description/CourseDescription";
import HeartOutlineIcon from "@/svg/HeartOutlineIcon";
import { handleWalletPrice } from "@/helper/course-pricing.helper";
import { formatNumber } from "@/helper/global.helper";

export default function CourseDetailsModal({ isOpen, onOpenChange, course, fixedDiscountPrice, walletPrice, onClose }: CourseDetailsModalProp) {
    const {
        items,
        coursePrice,
        discountPrice,
        selectedItems,
        videoCount,
        testCount,
        handleChange_testCount,
        handleChange_videoCount,
        toggleSelection,
        handleAddWishlist,
        handleBuy,
        isWishlistItem
    } = UseCoursePriceDistribution(course, isOpen, walletPrice, onClose)

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                disableAnimation={true}
                isDismissable={true}
                classNames={{
                    base: "max-w-[988px] course-details-modal-base",
                    body: "course-details-modal-body",
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalBody>
                                <div className="course-details-modal-content-base">
                                    <div className="course-details-modal-content-left">
                                        <div className="course-details-modal-content-title">{course?.courseName || "-"} </div>
                                        <div className="saving--amount--container">
                                            <div className="saving--amount--content--base">
                                                <div className="saving--amount--content">
                                                    <div className="saving--amount--label">Purchase the complete course bundle and save </div>
                                                    <div className="saving--amount--course">₹ {formatNumber(fixedDiscountPrice - course?.coursePrice)}/-</div>
                                                </div>
                                            </div>
                                            <div className="saving--amount">
                                                <div className="saving--amount--icon">
                                                    <CoursePackIcon />
                                                </div>
                                            </div>
                                        </div>
                                        <Divider className="mt-6 mb-4" />
                                        <div className="course-detailed-content-box">
                                            <div className="flex items-center justify-between mb-2 w-[98%]">
                                                <div className="course-details-section-title">Course Offer</div>
                                                <div className="course-card-validity"><CalenderGreyIcon /> Validity {course?.courseValidity || 0} days </div>
                                            </div>
                                            <div className="course-details-offer-container">
                                                {
                                                    items.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className={`course-details-offer-card cursor-pointer ${item?.count === 0 ? "disabled" : ""}`}
                                                            onClick={() => toggleSelection(item.id)}
                                                        >
                                                            <div className="flex gap-x-2 course-offer--box">
                                                                {/* <TestSeriesIcon /> */}
                                                                {item?.icon}
                                                                <div>
                                                                    <div className="course-details-offer-name">{item?.label}</div>
                                                                    <div className="course-details-offer-count">{item?.count || 0} {item?.label}</div>
                                                                </div>
                                                            </div>
                                                            {selectedItems.includes(item.id) ? <span className="course-details-check-list-item-checked"><MultiSelectTickIcon /></span>
                                                                : <div className="check-list-item-unchecked"></div>}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <ReferButton />
                                            <CourseDescription
                                                name={course?.courseName}
                                                desc={course?.courseDescription}
                                            />
                                        </div>
                                    </div>
                                    <div className="course-details-modal-content-right">
                                        <img src={course?.courseImages || "/course-img-dummy.png"} alt="course-img" className="course-card-img" />
                                        <div className="course-details-modal-content-right-box">
                                            <div className="min-h-[180px]">
                                                <div className="course-card-title">Your Bundle Includes </div>
                                                {
                                                    selectedItems.includes("ebooks") &&
                                                    <div
                                                        className="check-list-item cursor-pointer"
                                                    >
                                                        <div className="check-list-item-name flex items-center gap-2">
                                                            <EBooksIcon />
                                                            E-Book
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    selectedItems.includes("study-notes") &&
                                                    <div
                                                        className="check-list-item cursor-pointer"
                                                    >
                                                        <div className="check-list-item-name flex items-center gap-2">
                                                            <StudyNotesIcon />
                                                            Study Notes
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    selectedItems.includes("video-lectures") &&
                                                    <div
                                                        className="check-list-item cursor-pointer"
                                                    >
                                                        <div className="check-list-item-name flex items-center gap-2">
                                                            <VideoLecIcon />
                                                            Video Lectures
                                                        </div>
                                                        <div className="course-counter">
                                                            <button className="decrement" onClick={() => handleChange_videoCount("decrement")}>-</button>
                                                            <span>{videoCount}</span>
                                                            <button className="increment" onClick={() => handleChange_videoCount("increment")}>+</button>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    selectedItems.includes("test-series") &&
                                                    <div
                                                        className="check-list-item cursor-pointer"
                                                    >
                                                        <div className="check-list-item-name flex items-center gap-2">
                                                            <TestSeriesIcon />
                                                            Test Series
                                                        </div>
                                                        <div className="course-counter">
                                                            <button onClick={() => handleChange_testCount("decrement")}>-</button>
                                                            <span>{testCount}</span>
                                                            <button onClick={() => handleChange_testCount("increment")}>+</button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div>

                                                <Divider />
                                                <div className="course-card-pricing course--bottom-price my-4">
                                                    <span className="text-[14px] font-semibold mr-2">Item SubTotal:</span>
                                                    <span className="course-card-final-price subtotal">₹ {formatNumber(coursePrice) || 0}/-</span>
                                                </div>
                                                <div className="course-card-pricing course--bottom-price my-4">
                                                    <span className="text-[12px] font-semibold mr-2">Wallet Balance utilized:</span>
                                                    <span className="course-card-final-price wallet-balance">₹ {formatNumber(handleWalletPrice(coursePrice, walletPrice)) || 0}/-</span>
                                                </div>
                                                <Divider />
                                                <div className="course-card-pricing course--bottom-price my-4">
                                                    <span className="text-[14px] font-semibold mr-2">To pay:</span>
                                                    <span className="course-card-final-price to-pay">₹ {formatNumber(coursePrice - handleWalletPrice(coursePrice, walletPrice)) || 0}/-</span>
                                                </div>
                                                <div className="course-card-pricing course--bottom-price my-4">
                                                    <span className="text-[13px] font-semibold mr-2">You Saved</span>
                                                    <span className="course-card-final-price you-saved">₹ {
                                                        formatNumber((discountPrice - coursePrice) + handleWalletPrice(coursePrice, walletPrice))}/-</span>
                                                </div>
                                                <div className="course-actions">
                                                    <button className={`course-actions-wishlist ${isWishlistItem ? "heart-fill" : ""}`} onClick={() => handleAddWishlist(course?._id, isWishlistItem)}>
                                                        <HeartOutlineIcon />
                                                    </button>
                                                    <button className="course-actions-buy" onClick={handleBuy}>Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

interface CourseDetailsModalProp {
    isOpen: boolean,
    onOpenChange: () => void,
    course: CourseListData,
    fixedDiscountPrice: number,
    walletPrice: number,
    isRefer: boolean,
    onClose: () => void
}