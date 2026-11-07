import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { createLocation, deleteLocation, getCountryList, getLocationList, updateLocationList } from "@/services/course.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UseCourse() {
    const [countryList, setCountryList] = useState<ListRespType[]>([]);
    const [stateList, setStateList] = useState<ListRespType[]>([]);
    const [cityList, setCityList] = useState<ListRespType[]>([]);
    const [countryId, setCountryId] = useState("");
    const [stateId, setStateId] = useState("");

    async function handleDeleteLocation(id: string, type: string) {
        try {
            await deleteLocation(id);
            if (type === "SubCategory") {
                handleStateList(countryId)
            } else if (type === "SubSubCategory") {
                handleCityList(stateId)
            } else if (type === "Category") {
                handleCountry();
            }
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    async function handleUpdateLocation(id: string, name: string, type: string) {
        const data = {
            name, type
        }
        try {
            await updateLocationList(id, data);
            if (type === "SubCategory") {
                handleStateList(countryId)
            } else if (type === "SubSubCategory") {
                handleCityList(stateId)
            } else if (type === "Category") {
                handleCountry();
            }
            return "done"
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
            return "error"
        }
    }

    async function handleCreateLocation(name: string, type: string) {
        const data = {
            name,
            type: type.toLocaleLowerCase()
        }
        if (type === "SubCategory") {
            Object.assign(data, { parentId: countryId })
        } else if (type === "SubSubCategory") {
            Object.assign(data, { parentId: stateId })
        }
        try {
            await createLocation(data);
            if (type === "SubCategory") {
                handleStateList(countryId)
            } else if (type === "SubSubCategory") {
                handleCityList(stateId)
            } else if (type === "Category") {
                handleCountry();
            }
            return "done"
        } catch (error) {
            console.log("create", error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
            return "error"
        }
    }

    async function handleStateList(id: string) {
        try {
            const resp = await getLocationList("SubCategory", id);
            setStateList(resp.data?.examType);
            setCityList([])
            setStateId("")
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    async function handleCityList(id: string) {
        try {
            const resp = await getLocationList("SubSubCategory", id);
            setCityList(resp.data?.examType)
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    async function handleCountry() {
        try {
            const resp = await getCountryList();
            setCountryList(resp.data?.examType)
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    useEffect(() => {
        handleCountry();
    }, [])

    return { countryList, stateList, cityList, handleStateList, handleCityList, handleCreateLocation, setCountryId, setStateId, handleUpdateLocation, handleDeleteLocation }
}


export interface ListRespType {
    "_id": string,
    "name": string,
    "type": string,
    "parent": string | null,
}

