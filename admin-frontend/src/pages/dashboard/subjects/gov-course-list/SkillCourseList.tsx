import DangerCheckedIcon from "@/svg/DangerCheckedIcon";
import DeleteIcon from "@/svg/DeleteIcon";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import SuccessCheckedIcon from "@/svg/SuccessCheckedIcon";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ColumnFrame from "../../components/ColumnFrame";
// import UseCreateCourse from "../hooks/useCreateCourse";
import useGovList from "../hooks/useGovList";
import "./gov-course-list.css";

export default function SkillCourseList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  // const [AllActiveStatus, setAllActiveStatus] = useState(false);

  const { GovListData, deleteGovItem, setdeleteId,
    // createCourseForm
  } = useGovList();

  // Add New Feild
  function handleAddNewField() {
    navigate("/skill-course/create-course?type=create")
  }

  // ===============================
  // const {
  //   // CategoryList,
  //   // SubCategoryList,
  //   handleStateList,
  //   // SubjectList,
  //   getSubjectList
  // } = UseCreateCourse();
  // for get subcat
  // useEffect(() => {
  //   if (createCourseForm.values.category) {
  //     handleStateList(createCourseForm.values.category)
  //     // setAllActiveStatus(false);
  //   }
  // }, [createCourseForm.values.category])

  // for get subsubcat
  // useEffect(() => {
  //   if (createCourseForm.values.subcategory) {
  //     getSubjectList(createCourseForm.values.category, createCourseForm.values.subcategory)
  //   }
  // }, [createCourseForm.values.subcategory, createCourseForm.values.category])
  return (
    <>
      <div className="create-course-base p-8">
        {/* Head */}
        {/* <div className="course-list-page-head">
          <button className={`course-filter-btn ${AllActiveStatus ? "selected" : ""}`} onClick={() => {
            getGovList();
            setAllActiveStatus(a => !a);
            createCourseForm.setFieldValue("category", "");
            createCourseForm.setFieldValue("subcategory", "");
            createCourseForm.setFieldValue("subsubcategory", "");
            createCourseForm.setFieldValue("categoryType", "");
          }}>All</button>
          <InputSelect
            base="w-full !max-w-full"
            trigger="complete-profile__input__field"
            items={CategoryList}
            placeholder={"Category"}
            id={"category"}
            setFieldValue={createCourseForm.setFieldValue}
            className="w-full"
            error={createCourseForm.errors.category}
            isError={!!(createCourseForm.touched.category && createCourseForm.errors.category)}
            onBlur={createCourseForm.handleBlur}
            defaultSelectedKey={createCourseForm.values.category}
          // levelName="Category"
          />
          <InputSelect
            base="w-full !max-w-full"
            trigger="complete-profile__input__field"
            items={SubCategoryList}
            placeholder={"Sub Category"}
            id="subcategory"
            setFieldValue={createCourseForm.setFieldValue}
            className="w-full"
            error={createCourseForm.errors.subcategory}
            isError={!!(createCourseForm.touched.subcategory && createCourseForm.errors.subcategory)}
            onBlur={createCourseForm.handleBlur}
            defaultSelectedKey={createCourseForm.values.subcategory}
          // levelName="Sub Category"
          />
          <InputSelect
            base="w-full !max-w-full"
            trigger="complete-profile__input__field"
            items={SubjectList}
            placeholder={"Subject"}
            id="subsubcategory"
            setFieldValue={createCourseForm.setFieldValue}
            className="w-full"
            error={createCourseForm.errors.subsubcategory}
            isError={!!(createCourseForm.touched.subsubcategory && createCourseForm.errors.subsubcategory)}
            onBlur={createCourseForm.handleBlur}
            defaultSelectedKey={createCourseForm.values.subsubcategory}
          />
          <InputSelect
            base="w-full !max-w-full"
            trigger="complete-profile__input__field"
            items={categoryTypeList}
            placeholder={"Category Type"}
            id="categoryType"
            setFieldValue={createCourseForm.setFieldValue}
            className="w-full"
            error={createCourseForm.errors.categoryType}
            isError={!!(createCourseForm.touched.categoryType && createCourseForm.errors.categoryType)}
            onBlur={createCourseForm.handleBlur}
            defaultSelectedKey={createCourseForm.values.categoryType}
          />
          <button onClick={createCourseForm.submitForm} className="course-filter-btn active">Show Data</button>
        </div> */}
        {/* Course List */}

        <ColumnFrame
          title="Courses List"
          col_type="start"
          handleAddNew={handleAddNewField}
          base="!w-full !max-w-full gov--course--base"
          headbar="rounded-tr-[12px]"
          bodyClass=" h-auto gov--course--table-body"
        >
          <ul>
            {/* <thead> */}
            <li className="flex justify-between items-center px-4 h-[60px] bg-[#6633CC0D] font-semibold  border-t border-b border=[#CFD1DD]">
              <span className="w-[50px] course--list--head">S.No.</span>
              <span className="w-[150px] flex items-center justify-start course--list--head">Name </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">E-Book </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Lectures  </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Assessments </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Action</span>
            </li>
            <div className="gov-course-list-body">
              {
                GovListData.length > 0 &&
                GovListData.map((item, idx) => {
                  return <li key={idx} className={`h-[60px] border-b border-[#CFD1DD] border-t-0 flex items-center justify-between px-4 hover:bg-[#6633CC0D] ${Number(1) === 1 ? "bg-[#6633CC0D]" : ""}`}>
                    <div className="flex-1 xl:text-[16px] text-[14px] max-w-[50px] gov--course--list--item---cell">{idx + 1}</div>
                    <div className="flex-1 xl:text-[16px] text-[14px] w-[150px] truncate flex items-center justify-start gov--course--list--item---cell" title={item?.SkillName || "-"} style={{ display: "unset" }}>{item?.SkillName || "-"}</div>
                    <div className="flex-1 xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center gov--course--list--item---cell">
                      {
                        item?.ebook
                          // && item?.ebook.length > 0
                          ?
                          <SuccessCheckedIcon />
                          :
                          <DangerCheckedIcon />
                      }
                    </div>
                    <div className="flex-1 xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center">
                      {
                        item?.lectures && item?.lectures.length > 0 ?
                          <SuccessCheckedIcon />
                          :
                          <DangerCheckedIcon />
                      }
                    </div>
                    <div className="flex-1 xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center">
                      {
                        item?.assessment && item?.assessment.length > 0 ?
                          <SuccessCheckedIcon />
                          :
                          <DangerCheckedIcon />
                      }
                    </div>
                    <div className="gap-x-4 w-[150px] flex items-center justify-center">
                      <button onClick={() => {
                        navigate(`/skill-course/${item?._id}`)
                      }}>
                        <EditPrimaryIcon />
                      </button>
                      <button onClick={() => {
                        setdeleteId(item?._id)
                        onOpen()
                      }}>
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
                    Delete this Course
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => {
                    // handleDeleteLocation(itemId, type)
                    deleteGovItem()
                    onClose()
                    // setitemId("")
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

// const categoryTypeList = [
//   {
//     label: "Syllabus",
//     id: "Syllabus"
//   },
//   {
//     label: "Subject",
//     id: "Subject"
//   },
//   {
//     label: "Topic",
//     id: "Topic"
//   }
// ]