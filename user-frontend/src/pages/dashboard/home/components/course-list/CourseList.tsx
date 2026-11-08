import CourseCard from "@/ui/course-card/CourseCard";
import "./course-list.css";
import UseSelectExam from "@/pages/select-exam/useSelectExam";
import { Select, SelectItem } from "@heroui/react";
import MultiSelectTickIcon from "@/svg/MultiSelectTickIcon";
import UseHomeDetails from "../../hook/useHomeDetails";

export default function CourseList() {
    const { ExamListData, handleSelectionChange, handleSubCategory, SubCategoryList, selectedKeys: selectedCategory } = UseSelectExam();
    const { courseListData, getCourseList, walletPrice, isRefer } = UseHomeDetails();
    return (
        <>
            <div className="course-list-base">
                {/* head */}
                <div className="course-list-head home">
                    <div>
                        <div className="course-list-title">Courses For You</div>
                        <div className="course-list-subtitle">Find the right course for your preparation</div>
                    </div>
                    <div className="course-list-filter-base flex items-center gap-x-4">
                        <Select
                            aria-label="select-exam"
                            placeholder="Select"
                            selectionMode="single"
                            classNames={{
                                trigger: "bg-white filter-select-trigger !outline-none border border-[#E7EAE9]",
                                base: "filter-select-base home-filter-base !outline-none",
                                listbox:"select-listbox",
                                value:"filter-select-value",
                                listboxWrapper:"filter-select-listbox-wrapper",
                            }}
                            // isOpen={true}
                            disableAnimation={true}
                            defaultSelectedKeys={["all"]}
                        >
                            {ExamListData.map((item) => (
                                <SelectItem
                                    key={item.id}
                                    selectedIcon={
                                        <div className="w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100">
                                            <MultiSelectTickIcon />
                                        </div>
                                    }
                                    onClick={() => {
                                        handleSelectionChange(item?.id)
                                        handleSubCategory(item?.id)
                                        getCourseList(item?.id)
                                    }}
                                >
                                    {item?.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            aria-label="select-exam-sub-category"
                            placeholder="Select"
                            selectionMode="single"
                              classNames={{
                                trigger: "bg-white filter-select-trigger !outline-none border border-[#E7EAE9]",
                                base: "filter-select-base home-filter-base !outline-none",
                                listbox:"select-listbox",
                                value:"filter-select-value",
                                listboxWrapper:"filter-select-listbox-wrapper",
                            }}
                            popoverProps={{
                                classNames:{
                                    base:"",
                                    backdrop:""
                                }
                            }}
                            // isOpen={true}
                            disableAnimation={true}
                            defaultSelectedKeys={["all"]}
                        >
                            {SubCategoryList.map((item) => (
                                <SelectItem
                                    key={item.id}
                                    selectedIcon={
                                        <div className="w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100">
                                            <MultiSelectTickIcon />
                                        </div>
                                    }
                                    onClick={() => {
                                        // handleSelectionChange(item?.id)
                                        // handleSubCategory(item?.id)
                                        // handleGetPurchased(selectedCategory, item?.id)
                                        getCourseList(selectedCategory, item?.id)
                                    }}
                                >
                                    {item?.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                {/* list */}
                <div className="course-list-box">
                    {courseListData.length > 0 ? courseListData.map((courseItem, i) => (
                        <CourseCard
                            key={i}
                            course={courseItem}
                            walletPrice={walletPrice}
                            isRefer={isRefer}
                            courseImage={courseItem?.courseImages}
                        />
                    )) : (
                        <div className="course-empty-state">
                            <div className="course-empty-icon">🍳</div>
                            <div className="course-empty-title">We're cooking for you!</div>
                            <div className="course-empty-subtitle">Courses are coming soon. Stay tuned!</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
