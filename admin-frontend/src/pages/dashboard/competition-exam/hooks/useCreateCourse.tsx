// import type { ErrResp } from "@/config/axios-instance";
// import { checkAuthUserHelper, convertIntoSelectItems } from "@/helper/global.helper";
// import { getCountryList, getLocationList, handleGetSubjectListAPI } from "@/services/course.service";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

import { useState } from "react";


export default function UseCreateCourse() {
    // const [CategoryList, setCountryList] = useState<{ label: string, id: string }[]>([]);
    // const [SubCategoryList, setStateList] = useState<{ label: string, id: string }[]>([]);
    // const [SubjectList, setSubjectList] = useState<{ label: string, id: string }[]>([]);
    // const [days, setDays] = useState(0);
    const [price, setPrice] = useState(0);


    // GET SubCategory
    // async function handleStateList(id: string) {
    //     try {
    //         const resp = await getLocationList("SubCategory", id);
    //         const filteredList = convertIntoSelectItems(resp.data?.examType);
    //         setStateList(filteredList);
    //     } catch (error) {
    //         console.log(error);
    //         const err = error as ErrResp;
    //         toast.error(err?.response?.data?.message);
    //         checkAuthUserHelper(err)
    //     }
    // }


    // // GET SubSubCategory
    // async function handleCityList(id: string) {
    //     try {
    //         const resp = await getLocationList("SubSubCategory", id);
    //         const filteredList = convertIntoSelectItems(resp.data?.examType);
    //         setCityList(filteredList)
    //     } catch (error) {
    //         console.log(error);
    //         const err = error as ErrResp;
    //         toast.error(err?.response?.data?.message);
    //         checkAuthUserHelper(err)
    //     }
    // }


    // GET Category
    // async function handleCountry() {
    //     try {
    //         const resp = await getCountryList();
    //         const filteredList = convertIntoSelectItems(resp.data?.examType);
    //         setCountryList(filteredList)
    //     } catch (error) {
    //         console.log(error);
    //         const err = error as ErrResp;
    //         toast.error(err?.response?.data?.message);
    //         checkAuthUserHelper(err)
    //     }
    // }

    // GET subjects a/c to cat and subCat
    // async function getSubjectList(categoryId: string, subcategoryId: string) {
    //     try {
    //         const resp = await handleGetSubjectListAPI(categoryId, subcategoryId);
    //         const filteredList = convertIntoSelectItems(resp?.data?.data);
    //         setSubjectList(filteredList)
    //     } catch (error) {
    //         console.log(error);
    //         const err = error as ErrResp;
    //         toast.error(err?.response?.data?.message);
    //         checkAuthUserHelper(err)
    //     }
    // }

    // useEffect(() => {
    //     handleCountry();
    // }, [])


    // handle decrease validity days
    // function handleDecreaseValidityDays() {
    //     if (days > 1) {
    //         setDays(a => a - 1)
    //     }
    // }

    // handle increase validity days
    // function handleIncreaseValidityDays() {
    //     // if (days > 1) {
    //     // }
    //     setDays(a => a + 1)
    // }

    function handleDecreaseCoursePrice() {
        if (price > 1) {
            setPrice(a => a - 1)
        }
    }

    function handleIncreaseCoursePrice() {
        setPrice(a => a + 1)
    }

    return {
        // CategoryList,
        // SubCategoryList,
        // SubjectList,
        // handleStateList,
        // handleDecreaseValidityDays,
        // handleIncreaseValidityDays,
        // days,
        // setDays,
        handleDecreaseCoursePrice,
        handleIncreaseCoursePrice,
        price,
        setPrice,
        // getSubjectList
    }
}
