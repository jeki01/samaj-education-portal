import type { ErrResp } from "@/config/axios-instance";
import { convertIntoSelectItems } from "@/helper/global.helper";
import { getSubCategoryAPI } from "@/services/home.service";
import { handleExamList, handleGetUserAccountMode, handleSubmitSaveUserCategory } from "@/services/user-auth.service";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";
export default function UseSelectExam() {
    const [ExamListData, setExamListData] = useState<{ id: string, label: string }[]>([]);
    const [SubCategoryList, setSubCategoryList] = useState<{ id: string, label: string }[]>([]);
    const [selectedKeys, setSelectedKeys] = useState("");
    const [selectedSubCatKeys, setSelectedSubCatKeys] = useState("");
    const [selectedFilterKeys, setSelectedFilterKeys] = useState("");
    const [selectedByStatusKeys, setSelectedByStatusKeys] = useState("");
    const [selectedByDateRangeKeys, setSelectedByDateRangeKeys] = useState("");
    const [searchParams] = useSearchParams();


    const dataFilter: { id: string, label: string }[] = [
        {
            id: "all",
            label: "All"
        },
        {
            id: "notstarted",
            label: "Not Started"
        },
        {
            id: "progress",
            label: "In Progress"
        },
        {
            id: "complete",
            label: "Completed"
        },
        {
            id: "latest",
            label: "Most Latest to Oldest"
        },
        {
            id: "oldest",
            label: "Most Oldest to Latest"
        },
        {
            id: "greater",
            label: "High to Low"
        },
        {
            id: "less",
            label: "Low to High"
        }
    ];

    const handleByStatusChange = (keys: string) => {
        setSelectedByStatusKeys(keys);
    };

    const handleByDateRangeChange = (keys: string) => {
        setSelectedByDateRangeKeys(keys);
    };

    const handleFilterChange = (keys: string) => {
        setSelectedFilterKeys(keys);
    };

    const handleSubCategoryChange = (keys: string) => {
        setSelectedSubCatKeys(keys);
    };

    const handleSelectionChange = (keys: string) => {
        setSelectedKeys(keys);
    };

    const slug = useParams();
    async function getExamList() {
        try {
            const resp = await handleExamList();
            const examList = convertIntoSelectItems(resp?.data?.data)
            setExamListData([{ id: "all", label: "All" }, ...examList])
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }

    useEffect(() => {
        getExamList()
    }, [])

    // final submit
    async function submitFinalData() {
        try {
            if (slug?.id) {
                const resp = await handleSubmitSaveUserCategory({
                    userId: slug?.id,
                    categoryId: selectedKeys
                });
                const accesstoken = resp.data?.token as string;
                Cookies.set("buuid", accesstoken)

                const referId = searchParams.get("referId");
                const courseId = searchParams.get("courseId");
                const testId = searchParams.get("testId");
                if (referId && courseId) {
                    window.location.href = `/home?referId=${referId}&courseId=${courseId}`;
                } else if (referId && testId) {
                    window.location.href = `/competitions?referId=${referId}&testId=${testId}`;
                } else {
                    const modeResp = await handleGetUserAccountMode();
                    const mode = modeResp?.data?.data?.AccountMode;
                    window.location.href = mode === "exam" ? "/home" : "/overview";
                }
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }

    // get subcategory
    async function handleSubCategory(id: string) {
        if (id === "all") {
            setSelectedSubCatKeys("");
            setSubCategoryList([]);
            return null;
        }
        try {
            const resp = await getSubCategoryAPI(id);
            const data = convertIntoSelectItems(resp?.data?.examType);
            setSubCategoryList([{ id: "all", label: "All" }, ...data])
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message)
        }
    }

    return {
        ExamListData,
        submitFinalData,
        handleSelectionChange,
        SubCategoryList,
        handleSubCategory,
        selectedKeys,
        dataFilter,
        handleSubCategoryChange,
        selectedSubCatKeys,
        selectedFilterKeys,
        handleFilterChange,
        selectedByStatusKeys,
        selectedByDateRangeKeys,
        handleByDateRangeChange,
        handleByStatusChange
    }
}
