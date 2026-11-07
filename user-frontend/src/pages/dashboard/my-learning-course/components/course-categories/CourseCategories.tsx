import { Tab, Tabs } from "@heroui/react";
import "./course-categories.css";
import TestSeries from "../test-series/TestSeries";
import type { PurchasedCoursesI } from "@/pages/dashboard/my-learning/learning.type";

export default function CourseCategories({ courseDetails }: CourseCategoriesProp) {
    return (
        <>
            <Tabs aria-label="course-categories" variant={"underlined"} classNames={{ base: "course-categories-tabs-base", tabList: "course-categories-tablist" }}>
                {
                    courseDetails?.videoLectures && courseDetails?.videoLectures.length > 0 &&
                    <Tab key="recorded-lectures" title="Recorded Lectures" >
                    </Tab>
                }
                {
                    courseDetails?.studyNotes && courseDetails?.studyNotes.length > 0 &&
                    <Tab key="study-notes" title="Study Notes" >
                    </Tab>
                }
                {
                    courseDetails?.testSeries && courseDetails?.testSeries.length > 0 &&
                    <Tab key="test-series" title="Test Series" >
                        <TestSeries
                            testTime={courseDetails?.testTime}
                            topicList={courseDetails?.testSeries}
                            courseId={courseDetails?._id}
                        />
                    </Tab>
                }
            </Tabs>
        </>
    )
}

interface CourseCategoriesProp {
    courseDetails: PurchasedCoursesI
}