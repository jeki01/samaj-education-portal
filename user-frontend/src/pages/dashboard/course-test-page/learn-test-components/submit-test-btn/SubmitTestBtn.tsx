import { useDisclosure } from "@heroui/react";
// import ResultModal from "../result/ResultModal";
import SubmitConfirmModal from "../submit-confirmation-modal/SubmitConfirmModal";
// import { SuccessSocres } from "../../hooks/useLearningTest";
import { type FinalSubmitTest_BodyData } from "@/services/my-learning.service";
// import TestResult from "../result/TestResult";

export default function SubmitTestBtn({ handleSubmitQuizz }: SubmitTestBtnProp) {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button onClick={onOpen} className="font-semibold common-btn-ui text-[16px] text-white h-[54px] bg-primary rounded-[16px] w-full">Submit Test</button>
      <SubmitConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        handleSubmitQuizz={handleSubmitQuizz}
      />
      {/* <TestResult /> */}
    </>
  )
}

interface SubmitTestBtnProp {
  handleSubmitQuizz: (data: FinalSubmitTest_BodyData) => void,
  QueProgress: number
}