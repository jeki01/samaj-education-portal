import { useContext, useEffect, useState } from "react";
import { calculateTestCourseItemPrice, calculateVideoCourseItemPrice, getCourseCategoryPrice, handleWalletPrice } from "@/helper/course-pricing.helper";
import type { CourseListData } from "@/pages/dashboard/home/hook/useHomeDetails";
import VideoLecIcon from "@/svg/VideoLecIcon";
import StudyNotesIcon from "@/svg/StudyNotesIcon";
import EBooksIcon from "@/svg/EBooksIcon";
import TestSeriesIcon from "@/svg/TestSeriesIcon";
import { COURSE_CALCULATION, COURSE_CATEGORY } from "@/constant/course.const";
import { addCourseToWishlist, checkWishlistItem, deleteWishlist } from "@/services/wishlist.service";
import { buyCourseApi } from "@/services/purchase.service";
import { toast } from "react-toastify";
import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import HomeThemeContext from "@/pages/dashboard/home/hook/HomeContext";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import WishlistThemeContext from "@/pages/dashboard/wishlist/hook/WishContext";

const itemsInitVal: { id: string, label: string, icon: React.ReactNode, count: number }[] = [
    // { id: "ebooks", label: "E-Books", icon: <EBooksIcon />, count: 0 },
];


export default function UseCoursePriceDistribution(course: CourseListData, isOpen: boolean, walletPrice: number, onClose: () => void) {
    const [testCount, setTestCount] = useState(course.testSeries.length);
    const [videoCount, setVideoCount] = useState(course.videoLectures.length);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [items, setItems] = useState(itemsInitVal);

    const [coursePrice, setCoursePrice] = useState<number>(0);
    const [discountPrice, setDiscountPrice] = useState<number>(0);

    const [isWishlistItem, setIsWishlistItem] = useState(false);

    const { handleGetCourseList } = useContext(HomeThemeContext);
    const { handleGetCourseList: handleWishlistCoursesAPI } = useContext(WishlistThemeContext);

    const location = useLocation();
    const currentPath = location.pathname;

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        setTestCount(course.testSeries.length);
        setVideoCount(course.videoLectures.length);
    }, [course.videoLectures.length, course.testSeries.length])


    // handle change test count
    function handleChange_testCount(type: "increment" | "decrement") {
        switch (type) {
            case "increment":
                if (testCount < course.testSeries.length) {
                    setTestCount(a => a + 1)
                }
                break;
            case "decrement":
                if (testCount > 1)
                    setTestCount(a => a - 1)
                break;
        }
    }

    // handle change video count
    function handleChange_videoCount(type: "increment" | "decrement") {
        switch (type) {
            case "increment":
                if (videoCount < course.videoLectures.length)
                    setVideoCount(a => a + 1)
                break;
            case "decrement":
                if (videoCount > 1)
                    setVideoCount(a => a - 1)
                break;
        }
    }

    // multiselect 
    const toggleSelection = (id: string) => {
        setSelectedItems((prev) => {
            if (prev.includes(id)) {
                if (prev.length === 1) {
                    return prev;
                }
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };


    // set initial select val
    useEffect(() => {
        if (course?.ebook) {
            setSelectedItems(a => [...a, COURSE_CATEGORY.EBOOK])
            setItems(b => [...b, { id: COURSE_CATEGORY.EBOOK, label: "E-Books", icon: <EBooksIcon />, count: 1 }])
        }
        if (course?.studyNotes) {
            setSelectedItems(a => [...a, COURSE_CATEGORY.STUDY_NOTE])
            setItems(b => [...b, { id: COURSE_CATEGORY.STUDY_NOTE, label: "Study Notes", icon: <StudyNotesIcon />, count: 1 }])
        }
        if (course.videoLectures.length > 0) {
            setSelectedItems(a => [...a, COURSE_CATEGORY.VIDEO_LECTURE])
            setItems(b => [...b, { id: COURSE_CATEGORY.VIDEO_LECTURE, label: "Video Lectures", icon: <VideoLecIcon />, count: course.videoLectures.length }])
        };
        if (course.testSeries.length > 0) {
            setSelectedItems(a => [...a, COURSE_CATEGORY.TEST_SERIES])
            setItems(b => [...b, { id: COURSE_CATEGORY.TEST_SERIES, label: "Test Series", icon: <TestSeriesIcon />, count: course.testSeries.length }])
        }

        return () => {
            setSelectedItems([]);
            setItems([])
        }
    }, [course])

    useEffect(() => {
        calculatePrice(testCount, videoCount);
        calculateDiscount();
    }, [selectedItems, testCount, videoCount])


    function calculatePrice(testCount: number, videoCount: number) {
        let total = 0;

        if (selectedItems.includes(COURSE_CATEGORY.EBOOK) && course.ebookPercentage) {
            const ebookPrice = getCourseCategoryPrice(course.coursePrice, course.ebookPercentage);
            total += ebookPrice;
        }
        if (selectedItems.includes(COURSE_CATEGORY.STUDY_NOTE) && course.notePercentage) {
            const notePrice = getCourseCategoryPrice(course.coursePrice, course.notePercentage);
            total += notePrice;
        }
        if (selectedItems.includes(COURSE_CATEGORY.VIDEO_LECTURE) && course.videoPercentage) {
            const videoPrice = calculateVideoCourseItemPrice(course, course.videoPercentage, videoCount);
            total += videoPrice;
        }
        if (selectedItems.includes(COURSE_CATEGORY.TEST_SERIES) && course.testPercentage) {
            const testPrice = calculateTestCourseItemPrice(course, course.testPercentage, testCount);
            total += testPrice;
        }

        setCoursePrice(Number(total.toFixed(2)))
    }

    // ===============================

    function calculateDiscount() {
        let total = 0;

        if (selectedItems.includes(COURSE_CATEGORY.EBOOK) && course.ebookPercentage) {
            const ebookPrice = getCourseCategoryPrice(course.coursePrice, course.ebookPercentage);
            const addingDiscountAmount = getCourseCategoryPrice(ebookPrice, COURSE_CALCULATION.DISCOUNT_PERCENTAGE);
            const ebookWithDiscountedAmount = ebookPrice + addingDiscountAmount;
            total += ebookWithDiscountedAmount;
        }
        if (selectedItems.includes(COURSE_CATEGORY.STUDY_NOTE) && course.notePercentage) {
            const notePrice = getCourseCategoryPrice(course.coursePrice, course.notePercentage);
            const addingDiscountAmount = getCourseCategoryPrice(notePrice, COURSE_CALCULATION.DISCOUNT_PERCENTAGE);
            const studyNotesWithDiscountedAmount = notePrice + addingDiscountAmount;
            total += studyNotesWithDiscountedAmount;
        }
        if (selectedItems.includes(COURSE_CATEGORY.VIDEO_LECTURE) && course.videoPercentage) {
            const videoPriceOfOneItem = calculateVideoCourseItemPrice(course, course.videoPercentage, COURSE_CALCULATION.ITEM_COUNT);
            const includePercentageWithPerItem = videoPriceOfOneItem * videoCount;
            total += includePercentageWithPerItem;
        }
        if (selectedItems.includes(COURSE_CATEGORY.TEST_SERIES) && course.testPercentage) {
            const testPriceOfOneItem = calculateTestCourseItemPrice(course, course.testPercentage, COURSE_CALCULATION.ITEM_COUNT);
            const includePercentageWithPerItem = testPriceOfOneItem * testCount;
            total += includePercentageWithPerItem;
        }

        setDiscountPrice(Number(total.toFixed(2)))
    }


    // add to wishlist
    async function handleAddWishlist(courseId: string, isAlreadyWishlistItem: boolean) {
        try {
            if (isAlreadyWishlistItem) {
                await deleteWishlist(courseId);
                await handleCheckWishlistItem(courseId);
                toast.success("removed from wishlist");
            } else {
                await addCourseToWishlist({ courseId });
                await handleCheckWishlistItem(courseId);
                toast.success("added to wishlist");
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    // buy now
    async function handleBuy() {
        const referId = searchParams.get("referId");
        const courseId = searchParams.get("courseId");

        try {
            if (referId && courseId) {
                const resp = await buyCourseApi({
                    courseId: course?._id,
                    paymentstatus: true,
                    ebook: selectedItems.includes(COURSE_CATEGORY.EBOOK),
                    studyNotes: selectedItems.includes(COURSE_CATEGORY.STUDY_NOTE),
                    videoLectures: videoCount,
                    testseries: testCount,
                    walletBalance: handleWalletPrice(coursePrice, walletPrice),
                    userreferId: referId,
                    coursereferId: courseId,
                    amount: (coursePrice - handleWalletPrice(coursePrice, walletPrice)) || 0
                });
                if (resp?.data?.paymentUrl && resp?.data?.paymentUrl !== null) {
                    window.open(resp?.data?.paymentUrl, "_blank");
                } else {
                    toast.success("this course is purchased successfully");
                    setTimeout(() => {
                        navigate("/my-learning")
                    }, 2000);
                }
            } else {
                const resp = await buyCourseApi({
                    courseId: course?._id,
                    paymentstatus: true,
                    ebook: selectedItems.includes(COURSE_CATEGORY.EBOOK),
                    studyNotes: selectedItems.includes(COURSE_CATEGORY.STUDY_NOTE),
                    videoLectures: videoCount,
                    testseries: testCount,
                    walletBalance: handleWalletPrice(coursePrice, walletPrice),
                    amount: (coursePrice - handleWalletPrice(coursePrice, walletPrice)) || 0
                });
                if (resp?.data?.paymentUrl && resp?.data?.paymentUrl !== null) {
                    window.open(resp?.data?.paymentUrl, "_blank");
                } else {
                    toast.success("this course is purchased successfully");
                    setTimeout(() => {
                        navigate("/my-learning")
                    }, 2000);
                }
            }
            onClose();
            if (currentPath === "/home") {
                handleGetCourseList();
            } else if (currentPath === "/wishlist") {
                handleWishlistCoursesAPI();
            }
            // toast.success("this course is purchased successfully")
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    // check wishlist item
    async function handleCheckWishlistItem(courseId: string) {
        try {
            const resp = await checkWishlistItem(courseId);
            setIsWishlistItem(resp?.data?.isInWishlist)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        if (isOpen) {
            handleCheckWishlistItem(course?._id)
        }
    }, [course?._id, isOpen])


    return {
        items,
        selectedItems,
        coursePrice,
        discountPrice,
        handleChange_testCount,
        handleChange_videoCount,
        toggleSelection,
        videoCount,
        testCount,
        handleAddWishlist,
        handleBuy,
        isWishlistItem
    }
}
