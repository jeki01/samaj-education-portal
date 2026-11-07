import DeleteIcon from "@/svg/DeleteIcon";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import ColumnFrame from "../components/ColumnFrame";
import CreateBundleModal from "./CreateBundleModal";
import "./gov-course-list.css";
import useSkill from "./hook/useSkill";

export default function SkillBundleList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { skillBundleList, formik, courseList,
    isOpenC,
    onOpenC,
    onOpenChangeC,
    handleEditBundle,
    handleDeleteBundleItem
  } = useSkill();

  function handleAddNewField() { onOpenC() }
  return (
    <>
      <div className="create-course-base p-8">

        <ColumnFrame
          title="Bundle List"
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
              <span className="w-[150px] flex items-center justify-center course--list--head">Price </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Course Count  </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Total time  </span>
              <span className="w-[150px] flex items-center justify-center course--list--head">Action</span>
            </li>
            <div className="gov-course-list-body">
              {
                skillBundleList.length > 0 &&
                skillBundleList.map((item, idx) => {
                  return <li key={idx} className={`h-[60px] border-b border-[#CFD1DD] border-t-0 flex items-center justify-between px-4 hover:bg-[#6633CC0D] ${Number(1) === 1 ? "bg-[#6633CC0D]" : ""}`}>
                    <div className="flex-1 flex xl:text-[16px] text-[14px] max-w-[50px] gov--course--list--item---cell">{idx + 1}</div>
                    <div className="flex-1 xl:text-[16px] text-[14px] w-[150px] truncate flex items-center justify-start gov--course--list--item---cell" title={item?.BundleName || "-"}>{item?.BundleName || "-"}</div>
                    <div className="flex-1 xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center gov--course--list--item---cell">
                      {item?.price}
                    </div>
                    <div className="flex-1 xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center gov--course--list--item---cell">
                      {item?.SkillCourseId.length}
                    </div>
                    <div className="flex-1 xl:text-[16px] text-[14px] w-[150px] flex items-center justify-center gov--course--list--item---cell">
                      {item?.TimeInHours || "-"}
                    </div>
                    <div className="flex-1 gap-x-4 max-w-[150px] flex items-center justify-center">
                      <button onClick={() => {
                        handleEditBundle(item?._id)
                      }}>
                        <EditPrimaryIcon />
                      </button>
                      <button onClick={() => {
                        formik.setFieldValue("id", item?._id);
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

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation={true} onClose={() => { formik.setFieldValue("id", "") }}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                <ModalBody>
                  <p>
                    Delete this Bundle
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={async () => {
                    await handleDeleteBundleItem()
                    onClose()
                  }}>
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <CreateBundleModal
          isOpen={isOpenC}
          onOpenChange={onOpenChangeC}
          formik={formik}
          courseList={courseList}
        />
      </div>
    </>
  )
}