import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import ColumnFrame from "../components/ColumnFrame";
import DeleteIcon from "@/svg/DeleteIcon";
import UseSubjectType from "./hook/useSubjectType";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import InputSelect from "@/ui/select-input/InputSelect";
import UseCreateCourse from "../gov-exam/hooks/useCreateCourse";
import { useEffect } from "react";
import "./subject-type.css";

export default function SubjectType() {
    const {
        isNewFeild,
        isEdit,
        isOpen,
        onOpen,
        onOpenChange,
        handleAddNewField,
        handleEditNote,
        handleDeleteSubject,
        setDeleteIndex,
        formik,
        subjectListData
    } = UseSubjectType()

    // ===============================
    const {
        CategoryList,
        SubCategoryList,
        handleStateList
    } = UseCreateCourse();

    // for get subcat
    useEffect(() => {
        if (formik.values.category) {
            handleStateList(formik.values.category)
        }
    }, [formik.values.category])

    return (
        <>
            <div className="bg-white rounded-lg p-4 subject--table">
                <ColumnFrame
                    title="Subject types"
                    col_type="start"
                    handleAddNew={handleAddNewField}
                    base="!w-full !max-w-full h-[97%]"
                    headbar="rounded-tr-[12px]"
                    bodyClass="subject--table--body--base"
                >
                    <ul>
                        {/* <thead> */}
                        <li className="flex justify-between items-center px-4 h-[60px] bg-[#6633CC0D] font-semibold  border-t border-b border=[#CFD1DD]">
                            <span className="w-[50px]">S.No.</span>
                            <span className="w-[20%]">Category</span>
                            <span className="w-[20%]">SubCategory</span>
                            <span className="w-[30%]">Enter Subject types</span>
                            <span className="w-[150px]">Action</span>
                        </li>
                        {
                            isNewFeild &&
                            <li className=" rounded-xl h-[60px] flex items-center justify-between px-4 shadow-xl">
                                <div className="xl:text-[16px] text-[14px] w-[50px]">1</div>
                                <InputSelect
                                    base="w-full !max-w-full"
                                    trigger="complete-profile__input__field"
                                    items={CategoryList}
                                    placeholder={"Category"}
                                    id={"category"}
                                    setFieldValue={formik.setFieldValue}
                                    className="w-[20%]"
                                    error={formik.errors.category}
                                    isError={!!(formik.touched.category && formik.errors.category)}
                                    onBlur={formik.handleBlur}
                                    defaultSelectedKey={formik.values.category}
                                // levelName="Category"
                                />
                                <InputSelect
                                    base="w-full !max-w-full"
                                    trigger="complete-profile__input__field"
                                    items={SubCategoryList}
                                    placeholder={"Sub Category"}
                                    id="subcategory"
                                    setFieldValue={formik.setFieldValue}
                                    className="w-[20%]"
                                    error={formik.errors.subcategory}
                                    isError={!!(formik.touched.subcategory && formik.errors.subcategory)}
                                    onBlur={formik.handleBlur}
                                    defaultSelectedKey={formik.values.subcategory}
                                // levelName="Sub Category"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Subject types"
                                    className="w-[30%] mx-2 outline-none h-full"
                                    id="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                {
                                    isEdit ?
                                        <button
                                            type="button"
                                            onClick={formik.submitForm}
                                            className="bg-[linear-gradient(#6633CC,#9933FF)] text-white py-2 px-4 rounded-xl w-[150px]"
                                        >update</button>
                                        :
                                        <button
                                            type="button"
                                            onClick={formik.submitForm}
                                            className="bg-[linear-gradient(#6633CC,#9933FF)] text-white py-2 px-4 rounded-xl w-[150px]"
                                        >Save</button>
                                }
                            </li>
                        }
                        <div className="subject-type-list-body">
                            {
                                subjectListData.length > 0 &&
                                subjectListData.map(({ category, subcategory, name, _id }, idx) => {
                                    return <li key={idx} className={`h-[60px] border-b border-[#CFD1DD] border-t-0 flex items-center justify-between px-4 hover:bg-[#6633CC0D] ${Number(1) === 1 ? "bg-[#6633CC0D]" : ""}`}>
                                        <div className="xl:text-[16px] text-[14px] w-[50px]">{idx + 1}</div>
                                        <div className="xl:text-[16px] text-[14px] w-[20%] line-clamp-1" title={category?.name || "-"}>{category?.name || "-"}</div>
                                        <div className="xl:text-[16px] text-[14px] w-[20%] line-clamp-1" title={subcategory?.name || "-"}>{subcategory?.name || "-"}</div>
                                        <div className="xl:text-[16px] text-[14px] w-[30%] line-clamp-1" title={name || "-"}>{name || "-"}</div>
                                        <div className="flex items-center gap-x-4 w-[150px]">
                                            <button onClick={() => {
                                                handleEditNote(_id, category?._id, subcategory?._id, name)
                                            }}
                                                type="button"
                                            >
                                                <EditPrimaryIcon />
                                            </button>
                                            <button onClick={() => {
                                                setDeleteIndex(_id)
                                                onOpen()
                                            }}
                                                type="button"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </li>
                                })
                            }
                        </div>
                    </ul>
                </ColumnFrame>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Delete this Subject
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        handleDeleteSubject()
                                    }}>
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}
