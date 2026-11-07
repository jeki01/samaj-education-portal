import InfoIcon from "@/svg/InfoPrimaryIcon";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
// import LevelContainer from "../level-container/LevelContainer";
import CloseMenuIcon from "@/svg/CloseMenuIcon";
export default function QuesListBoxMobile({ QueCountList, handleSwitchQues }: QuesListBoxMobileProp) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="h-auto bg-[#f7f1ff] p-4 flex flex-col justify-around overflow-hidden mb-4 rounded-lg">
        <div className="flex items-center justify-between ques-list-box-mob-title">
          <div className="text-[18px] font-bold text-[#202020]"><span className="text-[#9533fb]">{QueCountList.length || "-"}</span> Questions</div>
          <div className="text-[12px] text-[#727272] flex items-center gap-x-2 mobile-test-info-bar"><InfoIcon /><button onClick={onOpen} className="text-[#9533fb] underline"> Click here </button> for more info</div>
        </div>
        <div className="flex gap-x-4 w-fit">
          {
            QueCountList.length > 0 && QueCountList.slice(0, 6).map(({ status }, i) => (
              <div
                key={i}
                onClick={() => handleSwitchQues(i)}
                className={`question-count w-[37px] h-[37px] rounded-full flex justify-center items-center text-white text-[14px] ${status === "default" ? "default--count" : status === "success" ? "completed--count" : "marked-later--count"} `}
              >{i + 1}</div>
            ))
          }
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        disableAnimation={true}
        hideCloseButton={true}
        classNames={{
          backdrop: "bg-[#EAEAEF66]",
          base: "",
          body: "p-0"
        }}
        size="full"
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                {/* Head */}
                <div className="flex items-center justify-between mt-8 mx-12" style={{ zIndex: 2 }}>
                  <div className="flex items-center gap-x-4">
                    <img src="/brand-logo.svg" alt="logo" className="h-[45px]"/>
                  </div>
                  <button className="close-modal-btn--screen--one" onClick={onClose}>
                    <CloseMenuIcon />
                  </button>
                </div>
                {/* <div className="mx-4 [&>div]:w-full [&>div]:justify-between [&>div]:px-4">
                  <LevelContainer />
                </div> */}
                <div className="m-4 h-[calc(100vh-312px)]s h-[80vh] rounded-[12px] bg-white mt-4 py-2 px-4 flex flex-col justify-between submit-test-container">
                  <div className="flex flex-col h-full">
                    {/* Question Total */}
                    <div className="flex items-center justify-between my-4">
                      <div className="text-[#202020] font-bold text-[24px] ">Questions</div>
                      <div className="text-[#9533fb] text-[24px] font-bold bg-[#f7f1ff] border border-[#9533fb] w-[72px] h-[39px] rounded-[12px] py-[2px] text-center">{QueCountList.length || 0}</div>
                    </div>
                    {/* Questions numbers */}
                    <div className="flex flex-wrap gap-y-4 gap-x-4 mx-auto counting--box">
                      {
                        QueCountList.length > 0 && QueCountList.map(({ status }, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              handleSwitchQues(i)
                              onClose()
                            }}
                            className={`question-count w-[37px] h-[37px] rounded-full flex justify-center items-center text-white text-[14px] ${status === "default" ? "default--count" : status === "success" ? "completed--count" : "marked-later--count"} `}
                          >{i + 1}</div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

interface QuesListBoxMobileProp {
  QueCountList: { id: string, status: string }[],
  handleSwitchQues: (i: number) => void
}