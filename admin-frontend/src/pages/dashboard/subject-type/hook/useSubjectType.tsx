import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handleCreateSubjectAPI, handleDeleteSubjectAPI, handleGETSubjectAPI, handleUpdateSubjectAPI } from "@/services/subject.service";
import { useDisclosure } from "@heroui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialValues: CreateSubjectIniValI = {
    category: "",
    subcategory: "",
    name: ""
}

export default function UseSubjectType() {
    const [isNewFeild, setisNewFeild] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [editIndex, setEditIndex] = useState<string | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<string | null>(null);
    const [subjectListData, setSubjectListData] = useState<SubjectListDataI[]>([])

    // formik
    const formik = useFormik({
        initialValues,
        onSubmit: handleCreateSubject
    })

    async function handleCreateSubject(val: CreateSubjectIniValI) {
        // create 
        if (editIndex === null) {
            try {
                await handleCreateSubjectAPI(val);
                getSubjectList() //refetch
                setisEdit(false);
                setEditIndex(null);
                setisNewFeild(false);
                formik.resetForm();
                toast.success("Subject created successfully!");
            } catch (error) {
                console.log(error);
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err)
            }
        }

        // update
        if (editIndex !== null) {
            try {
                await handleUpdateSubjectAPI(editIndex, val);
                getSubjectList() //refetch
                setisEdit(false);
                setEditIndex(null);
                setisNewFeild(false);
                formik.resetForm();
                toast.success("Subject updated successfully!");
            } catch (error) {
                console.log(error);
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err)
            }
        }
    }


    // Add New Feild
    function handleAddNewField() {
        setisNewFeild(true)
    }

    // handle Edit Note
    function handleEditNote(id: string, categoryId: string, subcategoryId: string, subject: string) {
        setEditIndex(id);
        setisEdit(true);
        setisNewFeild(true);
        formik.setFieldValue("category", categoryId);
        formik.setFieldValue("subcategory", subcategoryId);
        formik.setFieldValue("name", subject);
    }

    // handle Delete
    async function handleDeleteSubject() {
        if (deleteIndex) {
            try {
                await handleDeleteSubjectAPI(deleteIndex);
                setDeleteIndex(null);
                getSubjectList() //refetch
                toast.success("Subject deleted successfully!");
                onClose()
            } catch (error) {
                console.log(error);
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message);
                checkAuthUserHelper(err)
            }
        }
    }

    // GET Subjects
    async function getSubjectList() {
        try {
            const resp = await handleGETSubjectAPI();
            setSubjectListData(resp?.data?.data)
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    useEffect(() => {
        getSubjectList()
    }, [])


    return {
        isNewFeild,
        setisNewFeild,
        isEdit,
        setisEdit,
        isOpen,
        onOpen,
        onOpenChange,
        handleAddNewField,
        handleEditNote,
        handleDeleteSubject,
        setDeleteIndex,
        formik,
        subjectListData
    }
}

interface CreateSubjectIniValI {
    category: string,
    subcategory: string,
    name: string
}

interface SubjectListDataI {
    "_id": string,
    "category": {
        "_id": string,
        "name": string
    },
    "subcategory": {
        "_id": string,
        "name": string
    },
    "name": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number

}