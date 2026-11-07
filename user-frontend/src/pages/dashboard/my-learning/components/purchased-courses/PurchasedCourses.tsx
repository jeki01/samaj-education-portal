import UseSelectExam from "@/pages/select-exam/useSelectExam";
import "./purchased-courses.css";
import { Select, SelectItem } from "@heroui/react";
import MultiSelectTickIcon from "@/svg/MultiSelectTickIcon";
import { Link } from "react-router";
import CourseCard from "@/pages/dashboard/my-learning-course/components/course-card/CourseCard";
import UsePurchasedCourse from "../../hook/usePurchasedCourse";
export default function PurchasedCourses() {
    const { ExamListData, handleSelectionChange, handleSubCategory, SubCategoryList, selectedKeys: selectedCategory, dataFilter, handleSubCategoryChange, selectedSubCatKeys, handleFilterChange, selectedFilterKeys, handleByDateRangeChange, handleByStatusChange, selectedByStatusKeys, selectedByDateRangeKeys } = UseSelectExam();
    const { purchasedCourseList, handleGetPurchased } = UsePurchasedCourse();
    return (
        <>
            <div className="course-list-base">
                {/* head */}
                <div className="course-list-head my-learning">
                    <div className="course-list-title">My Learning</div>
                    <div className="course-list-filter-base flex items-center gap-x-4">
                        <Select
                            label="Sort By Status"
                            aria-label="select-exam"
                            placeholder="Select"
                            selectionMode="single"
                            classNames={{
                                trigger: "bg-white filter-select-trigger !outline-none border border-[#E7EAE9]",
                                base: "filter-select-base !outline-none",
                                listbox: "select-listbox",
                                listboxWrapper: "my-learning-select-listbox-wrapper",
                            }}
                            // isOpen={true}
                            disableAnimation={true}
                            defaultSelectedKeys={["all"]}
                        >
                            {dataFilter.filter(item => ["all", "notstarted", "progress", "complete"].includes(item?.id)).map((item) => (
                                <SelectItem
                                    key={item.id}
                                    selectedIcon={
                                        <div className="w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100">
                                            <MultiSelectTickIcon />
                                        </div>
                                    }
                                    onClick={() => {
                                        handleByStatusChange(item?.id)
                                        handleGetPurchased(selectedCategory, selectedSubCatKeys, selectedFilterKeys, item?.id, selectedByDateRangeKeys)
                                    }}
                                >
                                    {item?.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Sort By Date Range"
                            aria-label="select-exam"
                            placeholder="Select"
                            selectionMode="single"
                            classNames={{
                                trigger: "bg-white filter-select-trigger !outline-none border border-[#E7EAE9]",
                                base: "filter-select-base !outline-none",
                                listbox: "select-listbox",
                                listboxWrapper: "my-learning-select-listbox-wrapper",
                            }}
                            // isOpen={true}
                            disableAnimation={true}
                            defaultSelectedKeys={["all"]}
                        >
                            {dataFilter.filter(item => ["all", "latest", "oldest"].includes(item?.id)).map((item) => (
                                <SelectItem
                                    key={item.id}
                                    selectedIcon={
                                        <div className="w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100">
                                            <MultiSelectTickIcon />
                                        </div>
                                    }
                                    onClick={() => {
                                        handleFilterChange(item?.id)
                                        handleGetPurchased(selectedCategory, selectedSubCatKeys, item?.id, selectedByStatusKeys, selectedByDateRangeKeys)
                                    }}
                                >
                                    {item?.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Sort By Progress"
                            aria-label="select-exam"
                            placeholder="Select"
                            selectionMode="single"
                            classNames={{
                                trigger: "bg-white filter-select-trigger !outline-none border border-[#E7EAE9]",
                                base: "filter-select-base !outline-none",
                                listbox: "select-listbox",
                                listboxWrapper: "my-learning-select-listbox-wrapper",
                            }}
                            // isOpen={true}
                            disableAnimation={true}
                            defaultSelectedKeys={["all"]}
                        >
                            {dataFilter.filter(item => ["all", "greater", "less"].includes(item?.id)).map((item) => (
                                <SelectItem
                                    key={item.id}
                                    selectedIcon={
                                        <div className="w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100">
                                            <MultiSelectTickIcon />
                                        </div>
                                    }
                                    onClick={() => {
                                        handleByDateRangeChange(item?.id)
                                        handleGetPurchased(selectedCategory, selectedSubCatKeys, selectedFilterKeys, selectedByStatusKeys, item?.id)
                                    }}
                                >
                                    {item?.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Sort By Category"
                            aria-label="select-exam"
                            placeholder="Select"
                            selectionMode="single"
                            classNames={{
                                trigger: "bg-white filter-select-trigger !outline-none border border-[#E7EAE9]",
                                base: "filter-select-base !outline-none",
                                listbox: "select-listbox",
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
                                        if (item?.id === "all") {
                                            handleGetPurchased(item?.id, undefined, selectedFilterKeys, selectedByStatusKeys, selectedByDateRangeKeys)
                                        } else {
                                            handleGetPurchased(item?.id, selectedSubCatKeys, selectedFilterKeys, selectedByStatusKeys, selectedByDateRangeKeys)
                                        }
                                    }}
                                >
                                    {item?.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Sort By SubCategory"
                            aria-label="select-exam-sub-category"
                            placeholder="Select"
                            selectionMode="single"
                            classNames={{
                                trigger: "bg-white filter-select-trigger !outline-none border border-[#E7EAE9]",
                                base: "filter-select-base !outline-none",
                                listbox: "select-listbox",
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
                                        handleSubCategoryChange(item?.id)
                                        handleGetPurchased(selectedCategory, item?.id, selectedFilterKeys, selectedByStatusKeys, selectedByDateRangeKeys)
                                    }}
                                >
                                    {item?.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                {/* list */}
                <div className="my-learn-list-box">
                    {/* remove later */}
                    {/* <Link to={"/my-learning/123"}>Dummy Link</Link> */}
                    {
                        purchasedCourseList.length > 0 && purchasedCourseList.map((course, i) => {
                            return <Link to={`/my-learning/${course?._id}`} key={i} className="learning-course-card-base">
                                <CourseCard
                                    name={course?.courseName}
                                    validity={course?.courseValidity}
                                    subjectType={course?.subject?.name}
                                    coursePercentage={course?.overallProgress}
                                    courseImage={course?.courseImages}
                                />
                            </Link>
                        })
                    }
                </div>
            </div>
        </>
    )
}
