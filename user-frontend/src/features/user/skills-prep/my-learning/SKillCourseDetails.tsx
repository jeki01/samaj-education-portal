import PdfViewer from "@/ui/PdfViewer";
import { Tab, Tabs } from "@heroui/react";
import { useContext } from "react";
import AssessmentTab from "./AssessmentTab";
import CertificateTab from "./CertificateTab";
import LectureTabSection from "./LectureTabSection";
import { SkillLearnContext } from "./context/SkillLearnContext";

export default function SKillCourseDetails() {
    const { handleChangeCourseTab, courseTab, courseDetails, handleMarkAsRead } = useContext(SkillLearnContext);
    return (
        <>
            <div className="my-learn-course-content-base">
                <div className="w-full">
                    <div className="my-learn-breadcrumb line-clamp-1" title={`${courseDetails?.SkillName}`}>
                        {`${courseDetails?.SkillName}`}
                    </div>
                    <Tabs
                        aria-label="course-categories"
                        variant={"underlined"}
                        classNames={{ base: "course-categories-tabs-base mb-4 w-full", tabList: "w-full rounded-lg shadow-[0_1px_4px_0px_#00000026] pb-0", tab: "font-semibold" }}
                        selectedKey={courseTab}
                        color="secondary"
                    >
                        <Tab key="e-book" title="E-Book" onClick={() => handleChangeCourseTab("e-book")}>
                            {
                                courseDetails?.ebook &&
                                <PdfViewer fileUrl={courseDetails?.ebook} markAsRead={handleMarkAsRead} isRead={courseDetails?.isReadEbook} />
                            }
                        </Tab>
                        <Tab key="lecture" title="Lectures" onClick={() => handleChangeCourseTab("lecture")} ><LectureTabSection /></Tab>
                        <Tab key="assessment" title="Assessment" onClick={() => handleChangeCourseTab("assessment")}><AssessmentTab /></Tab>
                        <Tab key="certificate" title="Certificate" onClick={() => handleChangeCourseTab("certificate")}><CertificateTab /></Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
