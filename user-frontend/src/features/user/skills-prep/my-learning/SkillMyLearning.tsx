import useSkillMyLearning from "@/hooks/useSkillMyLearning";
import MultiSelectTickIcon from "@/svg/MultiSelectTickIcon";
import { Select, SelectItem } from "@heroui/react";
import { Link } from "react-router";
import CourseCard from "./CourseCard";

export default function SkillMyLearning() {
    const { skillPurchasedCourseList } = useSkillMyLearning();
    return (
        <div className="course-list-base">
            <div className="course-list-head my-learning">
                <div className="course-list-title">My Learning</div>
                <div className="course-list-filter-base flex items-center gap-x-4">
                    <Select
                        // label="Sort By"
                        aria-label="sort-by-bundle"
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
                        {["all"].map((item) => (
                            <SelectItem
                                key={item}
                                selectedIcon={
                                    <div className="w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100">
                                        <MultiSelectTickIcon />
                                    </div>
                                }
                                onClick={() => {
                                    // handleByStatusChange(item?.id)
                                    // handleGetPurchased(selectedCategory, selectedSubCatKeys, selectedFilterKeys, item?.id, selectedByDateRangeKeys)
                                }}
                            >
                                {item}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="my-learn-list-box">
                {
                    skillPurchasedCourseList.length > 0 && skillPurchasedCourseList.map((course, i) => {
                        return <Link to={`/my-learning/${course?._id}`} key={i} className="learning-course-card-base">
                            <CourseCard
                                name={course?.SkillName}
                                validity={12}
                                subjectType={course?.bundle?.bundleName}
                                coursePercentage={0}
                                courseImage={course?.SkillcourseImages}
                            />
                        </Link>
                    })
                }
            </div>
        </div>
    )
}
