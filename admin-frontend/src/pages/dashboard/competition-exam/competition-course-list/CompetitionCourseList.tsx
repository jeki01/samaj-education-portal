import "./competition-course-list.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import ColumnFrame from "../../components/ColumnFrame";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import DeleteIcon from "@/svg/DeleteIcon";
import SuccessCheckedIcon from "@/svg/SuccessCheckedIcon";
import { useNavigate } from "react-router";
// import useGovList from "../hooks/useGovList";
import DangerCheckedIcon from "@/svg/DangerCheckedIcon";
import useGovList from "../hooks/useGovList";
// import InputSelect from "@/ui/select-input/InputSelect";
// import { useEffect, useState } from "react";
// import useGovList from "../../gov-exam/hooks/useGovList";
// import UseCreateCourse from "../../gov-exam/hooks/useCreateCourse";
// import UseCreateCourse from "../hooks/useCreateCourse";

export default function CompetitionCourseList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  // const [AllActiveStatus, setAllActiveStatus] = useState(false);

  const { GovListData, deleteGovItem, setdeleteId } = useGovList()
  // Add New Feild
  function handleAddNewField() {
    navigate("/competition-exam/create-course")
  }

  // ===============================
  // const {
  //   // CategoryList,
  //   // SubCategoryList,
  //   // handleStateList,
  //   // SubjectList,
  //   // getSubjectList
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
          title="Exam List"
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
              <span className="w-[150px] flex items-center justify-start course--list--head">Exam Name </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Schedule Date </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Test Series </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">File </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Action</span>
            </li>
            <div className="gov-course-list-body-comp">
              {
                GovListData.length > 0 &&
                GovListData.map((item, idx) => {
                  return <li key={idx} className={`h-[60px] border-b border-[#CFD1DD] border-t-0 flex items-center justify-between px-4 hover:bg-[#6633CC0D] ${Number(1) === 1 ? "bg-[#6633CC0D]" : ""}`}>
                    <div className="xl:text-[16px] text-[14px] w-[50px] gov--course--list--item---cell-comp">{idx + 1}</div>
                    <div className="xl:text-[16px] text-[14px] w-[150px] truncate flex items-center justify-start gov--course--list--item---cell-comp" title={item?.examName || "-"} style={{ display: "unset" }}>{item?.examName || "-"}</div>
                    <div className="xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center gov--course--list--item---cell-comp">
                      {
                        item?.scheduleDate &&
                        <span>{item?.scheduleDate}</span>
                      }
                    </div>
                    {/* <div className="xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center">
                      {
                        item?.studyNotes && item?.studyNotes.length > 0 ?
                          <SuccessCheckedIcon />
                          :
                          <DangerCheckedIcon />
                      }
                    </div>
                    <div className="xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center">
                      {
                        item?.videoLectures && item?.videoLectures.length > 0 ?
                          <SuccessCheckedIcon />
                          :
                          <DangerCheckedIcon />
                      }
                    </div> */}
                    <div className="xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center gov--course--list--item---cell-comp">
                      {
                        item?.testSeries && item?.testSeries[0]?.topicQuestions.length > 0 ?
                          <SuccessCheckedIcon />
                          :
                          <DangerCheckedIcon />
                      }
                    </div>
                    <div className="gov--course--list--item---cell-comp flex justify-center">
                      {
                        item?.status === "Inactive" ?
                          <div className="xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center published-status-inactive">Parked</div>
                          :
                          <div className="xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center published-status">Published</div>
                      }
                    </div>
                    <div className="gap-x-4 w-[150px] flex items-center justify-center gov--course--list--item---cell-comp">
                      <button onClick={() => {
                        navigate(`/competition-exam/${item?._id}`)
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