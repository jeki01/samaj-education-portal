import ChatPhotoPlaceholder from "@/svg/ChatPhotoPlaceholder";
import "./chat.css";
import ChatBackIcon from "@/svg/ChatBackIcon";
import { Divider, Tooltip } from "@heroui/react";
import PaperIcon from "@/svg/PaperIcon";
import { useNavigate } from "react-router";
import useChat from "./useChat";
import { useEffect, useRef } from "react";
import { groupMessages } from "@/helper/chat.helper";
import ReportIcon from "@/svg/ReportIcon";

export default function Chat() {
    const navigate = useNavigate();
    const { handleSendMessage, setInputVal, inputVal, allChatMessages, handleChatMsgReport, testDetails } = useChat();

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [allChatMessages]);
    console.log(allChatMessages);

    console.log(groupMessages(allChatMessages));

    return (
        <>
            <div className="chat-container">
                <div className="chat-header">
                    <button onClick={() => navigate("/competitions")} className="chat-back-btn"><ChatBackIcon /></button>
                    <div className="chat-header-info">
                        <div className="chat-group-icon"><ChatPhotoPlaceholder /></div>
                        <div className="chat-group-details">
                            <div className="chat-group-name">{testDetails.examName}</div>
                            <div className="chat-group-count">{testDetails.userCount} People</div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="chat-messages" ref={chatContainerRef}>
                    {
                        groupMessages(allChatMessages).map((group, i) => (
                            <div key={i} className="chat-group">
                                {group.grouped.map((msg, j) => (
                                    <div key={j}>
                                        <div className={`${msg.role === "user" ? "chat-user-info" : "chat-other-info"}`}>
                                            {
                                                j === 0 ?
                                                    <div className="chat-user">{msg.user}</div>
                                                    :
                                                    <div className="chat-user !bg-white"></div>
                                            }
                                            {
                                                msg.role === "user" ?
                                                    <div className={`${"user-text"}`}>{msg.message} <sub className="ml-2 opacity-80">{msg.messageTime}</sub></div>
                                                    :
                                                    <Tooltip
                                                        content={
                                                            <div className="report-tooltip-content"><ReportIcon /> Report</div>
                                                        }
                                                        placement={"right"}
                                                        onClick={() => {
                                                            handleChatMsgReport(msg?._id || "");
                                                        }}
                                                        classNames={{
                                                            base: 'report-tooltip-base',
                                                            content: 'report-tooltip-content-wrapper',
                                                        }}
                                                    >
                                                        <div className={`${"other-text"}`}>{msg.message} <sub className="ml-2 opacity-80">{msg.messageTime}</sub></div>
                                                    </Tooltip>
                                            }
                                        </div>
                                        <div className={`!mt-0 ${msg.role === "user" ? "chat-info-user" : "chat-info-other"}`}>
                                            {
                                                (msg?.reports !== 0) &&
                                                <div className="chat-report">{msg.reports} Reported Abusive</div>
                                            }
                                        </div>
                                    </div>
                                ))}
                                <div className={`${group.role === "user" ? "chat-info-user" : "chat-info-other"}`}>
                                    {/* <div className={`${group.grouped[0].role === "user" ? "chat-time-user" : "chat-time-other"}`}>{group.messageTime}</div> */}
                                    {
                                        (group?.totalReports && (group?.totalReports !== 0)) &&
                                        <div className="chat-report">{group?.totalReports || 0} Reported Abusive</div>
                                    }
                                </div>
                            </div>
                        ))}
                    {/* <div className="chat-text user">
                        <div className="user-text">How are you?</div>
                        <div className="chat-time-user">02:22 AM</div>
                    </div>
                    <div className="chat-text other">
                        <Tooltip content={"Report"} placement="right">
                            <div className="other-text">perfect! ✅</div>
                        </Tooltip>
                        <div className="other-text">omg, this is amazing</div>
                        <div className="chat-info-other">
                            <div className="chat-time-other">02:22 AM</div>
                            <div className="chat-report">2 Reported Abusive</div>
                        </div>
                    </div>
                    <TimelineDivider text="Today" />
                    <div className="chat-text other">
                        <div className="other-text">perfect! ✅</div>
                        <div className="other-text">omg, this is amazing</div>
                        <div className="chat-time-other">02:22 AM</div>
                    </div>
                    <div className="chat-text user">
                        <div className="user-text">lol 🤣</div>
                        <div className="chat-time-user">02:22 AM</div>
                    </div> */}
                </div>
                <div className="chat-send-input-wrapper">
                    <input
                        value={inputVal}
                        onChange={(e) => {
                            if (!testDetails.isBlocked) {
                                setInputVal(e.target.value)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (!testDetails.isBlocked && e.key === "Enter") {
                                handleSendMessage()
                            }
                        }}
                        placeholder="Type a message..."
                        disabled={testDetails.isBlocked}
                        title={testDetails.isBlocked ? `Chat is disabled` : ""}
                    />
                    <button
                        disabled={testDetails.isBlocked}
                        className="chat-send-btn"
                        onClick={handleSendMessage}
                    >
                        <PaperIcon />
                    </button>
                </div>
            </div>
        </>
    )
}
