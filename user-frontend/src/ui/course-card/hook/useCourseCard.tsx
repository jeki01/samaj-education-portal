import { COURSE_CALCULATION } from "@/constant/course.const";
import { calculateTestCourseItemPrice, calculateVideoCourseItemPrice, getCourseCategoryPrice } from "@/helper/course-pricing.helper";
import type { CourseListData } from "@/pages/dashboard/home/hook/useHomeDetails";
import { useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function UseCourseCard(course: CourseListData) {
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
    const [discountPrice, setDiscountPrice] = useState<number>(0);
    // const buyBtn = useRef<HTMLButtonElement>(null);
    const [searchParams] = useSearchParams();

    function calculateDiscount() {
        let total = 0;

        if (course.ebookPercentage) {
            const ebookPrice = getCourseCategoryPrice(course.coursePrice, course.ebookPercentage);
            const addingDiscountAmount = getCourseCategoryPrice(ebookPrice, COURSE_CALCULATION.DISCOUNT_PERCENTAGE);
            const ebookWithDiscountedAmount = ebookPrice + addingDiscountAmount;
            total += ebookWithDiscountedAmount;
        }
        if (course.notePercentage) {
            const notePrice = getCourseCategoryPrice(course.coursePrice, course.notePercentage);
            const addingDiscountAmount = getCourseCategoryPrice(notePrice, COURSE_CALCULATION.DISCOUNT_PERCENTAGE);
            const studyNotesWithDiscountedAmount = notePrice + addingDiscountAmount;
            total += studyNotesWithDiscountedAmount;
        }
        if (course.videoPercentage) {
            const videoPriceOfOneItem = calculateVideoCourseItemPrice(course, course.videoPercentage, COURSE_CALCULATION.ITEM_COUNT);
            const includePercentageWithPerItem = videoPriceOfOneItem * course.videoLectures.length;
            total += includePercentageWithPerItem;
        }
        if (course.testPercentage) {
            const testPriceOfOneItem = calculateTestCourseItemPrice(course, course.testPercentage, COURSE_CALCULATION.ITEM_COUNT);
            const includePercentageWithPerItem = testPriceOfOneItem * course.testSeries.length;
            total += includePercentageWithPerItem;
        }

        setDiscountPrice(Number(total.toFixed(2)))
    }
    useEffect(() => {
        calculateDiscount()
    }, [course]);

    // open
    useEffect(() => {
        const courseId = searchParams.get("courseId");
        if (courseId === course._id) {
            onOpen();
        }
    }, [course._id, searchParams, onOpen]);


    return {
        isOpen,
        onOpenChange,
        onOpen,
        discountPrice,
        onClose,
    }
}
