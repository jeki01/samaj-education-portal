import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Spinner,
} from "@heroui/react";
import UseAskAnything from "./hook/useAskAnything";
import ReactMarkdown from 'react-markdown';
import "./ask-anything.css";
import { useEffect, useRef } from "react";

export default function AskAnythingModal({ isOpen, onOpenChange }: AskAnythingModalProps) {
    const { sendMessage, loading, messages, input, setInput, resetChatHistory } = UseAskAnything();
    useEffect(() => {
        if (!isOpen) {
            resetChatHistory()
        }
    }, [isOpen])

    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto scroll when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, loading]); // also scroll when spinner shows

    return (
        <>
            <Modal
                isOpen={isOpen}
                hideCloseButton={true}
                onOpenChange={onOpenChange}
                disableAnimation={true}
                placement="center"
                classNames={{
                    backdrop: "bg-[#EAEAEF66] backdrop-opacity-60",
                    base: "md:p-[40px] p-[20px] max-w-[792px] md:mx-0 mx-4",
                    body: "px-0"
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex items-center justify-between gap-1">
                                <span className="text-[#211C37] font-semibold text-[16px] text-center w-full"> Ask Anything</span>
                                {/* <button onClick={onClose}><CloseIcon /></button> */}
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="chat-box-wrapper">
                                        <div
                                            ref={chatContainerRef}
                                            style={{
                                                height: "300px",
                                                overflowY: "scroll",
                                                padding: "15px",
                                                borderRadius: "12px"
                                            }}
                                        >
                                            {messages
                                                .filter((m) => m.role !== "system")
                                                .map((msg, index, arr) => (
                                                    <div key={index}>
                                                        <div
                                                            className={
                                                                msg.role === "user"
                                                                    ? "user--role--msg"
                                                                    : "assistant--role--msg"
                                                            }
                                                        >
                                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                        </div>
                                                        {loading && index + 1 === arr.length ? (
                                                            <div className="flex justify-end">
                                                                <Spinner
                                                                    size="sm"
                                                                    classNames={{ label: "text-foreground mt-4", dots: "bg-[#bababa]" }}
                                                                    aria-label="wave"
                                                                    variant="wave"
                                                                    labelColor="foreground"
                                                                />
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    <div className="chat-box-input-wrapper">
                                        <input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                            placeholder="Type a message..."
                                        />
                                        <button onClick={sendMessage} disabled={loading}>
                                            {loading ? "Sending..." : "Send"}
                                        </button>
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

interface AskAnythingModalProps {
    isOpen: boolean,
    onOpenChange: () => void
}