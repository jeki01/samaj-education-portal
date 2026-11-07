import { COURSE_CALCULATION } from "@/constant/course.const";
import type { CourseListData } from "@/pages/dashboard/home/hook/useHomeDetails";

export function getCourseCategoryPrice(price: number, percentage: number): number {
    // Check if inputs are valid numbers
    if (typeof price !== "number" || typeof percentage !== "number") {
        throw new TypeError("Both price and percentage must be numbers.");
    }

    // Check for NaN or Infinity
    if (!Number.isFinite(price) || !Number.isFinite(percentage)) {
        throw new Error("Price and percentage must be finite numbers.");
    }

    // Check for negative price
    if (price < 0) {
        throw new RangeError("Price must not be negative.");
    }

    // Check for invalid percentage range (0–100)
    if (percentage < 0 || percentage > 100) {
        throw new RangeError("Percentage must be between 0 and 100 (inclusive).");
    }

    // Final calculation
    return (price * percentage) / 100;
}

export function getCourseItemPrice(
    courseCategoryPrice: number,
    totalCourseItems: number,
    selectedItems: number,
    discount: number
): number {
    // Validate courseCategoryPrice
    if (typeof courseCategoryPrice !== "number" || !Number.isFinite(courseCategoryPrice) || courseCategoryPrice < 0) {
        throw new RangeError("courseCategoryPrice must be a non-negative finite number.");
    }

    // Validate totalCourseItems
    if (!Number.isInteger(totalCourseItems) || totalCourseItems <= 0) {
        throw new RangeError("totalCourseItems must be a positive integer.");
    }

    // Validate selectedItems (cannot be 0 and must be <= totalCourseItems)
    if (!Number.isInteger(selectedItems) || selectedItems <= 0 || selectedItems > totalCourseItems) {
        throw new RangeError("selectedItems must be a positive integer less than or equal to totalCourseItems.");
    }

    // Validate discount (between 0 and 1 inclusive)
    if (typeof discount !== "number" || !Number.isFinite(discount) || discount < 0 || discount > 1) {
        throw new RangeError("discount must be a number between 0 and 1 (inclusive).");
    }

    const ratio = selectedItems / totalCourseItems;
    const discountedPart = (1 - ratio) * discount;

    const finalVal = courseCategoryPrice * (ratio + discountedPart);

    return finalVal;
    // return Math.round(finalVal);
}

export function userBasedCourseCategoryPrice(
    totalItemCount: number,
    userSelectedPerItemPrice: number
): number {
    // Validate totalItemCount
    if (!Number.isInteger(totalItemCount) || totalItemCount <= 0) {
        throw new RangeError("totalItemCount must be a positive integer.");
    }

    // Validate per-item price
    if (
        typeof userSelectedPerItemPrice !== "number" ||
        !Number.isFinite(userSelectedPerItemPrice) ||
        userSelectedPerItemPrice < 0
    ) {
        throw new RangeError("userSelectedPerItemPrice must be a non-negative finite number.");
    }

    const total = userSelectedPerItemPrice * totalItemCount;
    return Math.round(total); // round to nearest integer
}

export function calculateNonDiscounted_CoursePrice(...prices: number[]): number {
    // Require at least one argument
    if (prices.length === 0) {
        throw new Error("At least one course price must be provided.");
    }

    for (const price of prices) {
        if (typeof price !== "number" || !Number.isFinite(price)) {
            throw new TypeError("All inputs must be finite numbers.");
        }
        if (price < 0) {
            throw new RangeError("Course prices must not be negative.");
        }
    }

    return prices.reduce((acc, curr) => acc + curr, 0);
}

export function calculateTestCourseItemPrice(course: CourseListData, testPercentage: number, testCount: number) {
    const price = course.coursePrice;

    if (price && testPercentage) {
        const itemPackPrice = getCourseCategoryPrice(price, testPercentage);
        const totalItem = course.testSeries.length;
        const selectedItemCount = testCount;
        const discount = COURSE_CALCULATION.DISCOUNT_VALUE;
        const priceAccordingToSelectedItem = getCourseItemPrice(itemPackPrice, totalItem, selectedItemCount, discount);
        return priceAccordingToSelectedItem;
    }
    return 0;
}

export function calculateVideoCourseItemPrice(course: CourseListData, videoPercentage: number, videoCount: number) {
    const price = course.coursePrice;

    if (price && videoPercentage) {
        const itemPackPrice = getCourseCategoryPrice(price, videoPercentage);
        const totalItem = course.videoLectures.length;
        const selectedItemCount = videoCount;
        const discount = COURSE_CALCULATION.DISCOUNT_VALUE;
        const priceAccordingToSelectedItem = getCourseItemPrice(itemPackPrice, totalItem, selectedItemCount, discount);
        return priceAccordingToSelectedItem;
    }
    return 0;
}

export function handleWalletPrice(coursePrice: number, walletPrice: number) {
    return walletPrice < coursePrice ? walletPrice : coursePrice;
}