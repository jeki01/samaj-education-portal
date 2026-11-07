import { Accordion, AccordionItem } from "@heroui/react";
import "./course-description.css";
import DOMPurify from 'dompurify';
import DownArrowIcon from "@/svg/DownArrowIcon";

export default function CourseDescription({ name, desc }: CourseDescriptionProp) {
    return (
        <div className="course-desc-base-wrapper">
            <Accordion
                disableAnimation={!true}
                defaultExpandedKeys={["1"]}
            >
                <AccordionItem
                    key="1"
                    aria-label={name}
                    title={"Courses Description"}
                    classNames={{
                        base: "course-desc-base",
                        trigger: "course-desc-trigger",
                        indicator:"rotate-[90deg] data-[open=true]:rotate-0"
                    }}
                    indicator={<DownArrowIcon />}
                >
                    <div className="course-details-section-subtitle">{name || "-"}</div>
                    <p className="course-details-section-desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }}></p>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

interface CourseDescriptionProp {
    name: string,
    desc: string
}