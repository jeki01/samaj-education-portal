import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handleCreateSkillBundle, handleDeleteBundle, handleGetByIdBundle, handleGetSkillBundle, handleGetSkillCourse, handleUpdateSkillBundle } from "@/services/skill.service";
import { useDisclosure } from "@heroui/react";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialValues: BundleFormI = {
    name: "",
    price: "",
    tagline: "",
    about: "",
    image: "",
    courseIds: [],
    imageName: ""
};

export default function useSkill() {
    const [skillBundleList, setSkillBundleList] = useState<BundleListI[]>([]);
    const [courseList, setCourseList] = useState<{ key: string, label: string }[]>([]);
    const { isOpen: isOpenC, onOpen: onOpenC, onOpenChange: onOpenChangeC, onClose: onCloseC } = useDisclosure();

    const handleGetAllBundleList = useCallback(async () => {
        try {
            const resp = await handleGetSkillBundle();
            setSkillBundleList(resp?.data?.data || []);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }, []);

    const handleGetAllCourseList = useCallback(async () => {
        try {
            const resp = await handleGetSkillCourse();
            const data: CourseListI[] = resp?.data?.data || [];
            const convertedData = data.map(a => ({ key: a._id, label: a.SkillName }));
            setCourseList(convertedData);
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }, []);

    useEffect(() => {
        handleGetAllBundleList()
        handleGetAllCourseList()
    }, [handleGetAllBundleList, handleGetAllCourseList])


    const formik = useFormik<BundleFormI>({
        initialValues,
        onSubmit: async (val) => {
            try {
                const formData = new FormData;
                formData.append("BundleName", val?.name);
                formData.append("BundleImages", val?.image);
                formData.append("price", val?.price);
                formData.append("tagline", val?.tagline);
                formData.append("description", val?.about);
                formData.append("SkillCourseId", JSON.stringify(val?.courseIds));

                if (val?.id) {
                    const resp = await handleUpdateSkillBundle(formData, val?.id);
                    toast.success(resp?.data?.message || "updated");
                } else {
                    const resp = await handleCreateSkillBundle(formData);
                    toast.success(resp?.data?.message || "created");
                }
                formik.resetForm();
                onCloseC();
                handleGetAllBundleList();
            } catch (error) {
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err)
            }
        }
    })

    const handleEditBundle = async (id: string) => {
        try {
            formik.setFieldValue("id", id);
            const resp = await handleGetByIdBundle(id);
            const data = resp?.data?.data;
            if (data?.BundleName) formik.setFieldValue("name", data?.BundleName);
            if (data?.price) formik.setFieldValue("price", data?.price);
            if (data?.tagline) formik.setFieldValue("tagline", data?.tagline);
            if (data?.description) formik.setFieldValue("about", data?.description);
            if (data?.BundleImages) formik.setFieldValue("image", data?.BundleImages);
            if (data?.BundleImages) formik.setFieldValue("imageName", data?.BundleImages);
            if (data?.SkillCourseId) formik.setFieldValue("courseIds", data?.SkillCourseId);
            onOpenC();
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    };

    const handleDeleteBundleItem = async () => {
        try {
            const resp = await handleDeleteBundle(formik.values?.id || "");
            toast.success(resp?.data?.message || "deleted");
            handleGetAllBundleList();
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    return {
        skillBundleList,
        formik,
        courseList,
        isOpenC,
        onOpenC,
        onOpenChangeC,
        handleEditBundle,
        handleDeleteBundleItem
    }
}


export interface BundleListI {
    _id: string;
    BundleName: string;
    price: string;
    SkillCourseId: [];
    TimeInHours: string;
}

export interface BundleFormI {
    id?: string;
    name: string;
    price: string;
    tagline: string;
    about: string;
    image: string | File;
    imageName: string | "";
    courseIds: string[];
}

export interface CourseListI {
    SkillName: string;
    _id: string;
}