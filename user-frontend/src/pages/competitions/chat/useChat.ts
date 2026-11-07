import type { ErrResp } from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
import { reportChatMsg } from "@/services/competition.service";
import { handleGetProfileDetails } from "@/services/profile.service";
import { socket } from "@/socket";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const testDetailsInit: testDetailsI = {
    examName: "",
    isBlocked: false,
    totalReports: 0,
    userCount: 0
}

export default function useChat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [allChatMessages, setAllChatMessages] = useState<chatMessageI[]>([]);
    const [inputVal, setInputVal] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<currUserInfoI | null>(null);
    const { testId } = useParams<{ testId: string }>();
    const [testDetails, setTestDetails] = useState<testDetailsI>(testDetailsInit);

    async function getProfileDetails() {
        try {
            const resp = await handleGetProfileDetails();
            const userName = resp?.data?.data?.firstName.charAt(0) + resp?.data?.data?.lastName.charAt(0);
            setCurrentUser({
                userId: resp?.data?.data?._id,
                user: userName || "Unknown"
            });
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "Something went wrong");
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        getProfileDetails();
    }, [])


    useEffect(() => {

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function receiveMessageGlobal(message: chatMessageI) {

            if (!currentUser) return;

            if (message.userId === currentUser.userId) return;

            setAllChatMessages(prev => [
                ...prev,
                {
                    message: message.message,
                    role: "other",
                    userId: message.userId,
                    messageTime: message.messageTime || moment().format("hh:mm A"),
                    user: message.user,
                    testId: message.testId,
                    reports: message.reports || 0,
                    _id: message._id,
                    totalReports: message.totalReports
                }
            ]);

            socket.emit("loadTestGlobalMessages", testId || "");
        }

        function loadChatHistory(data: chatHistoryDetailsI) {

            const { messages, ...rest } = data;            
            if (!currentUser) return;
            setTestDetails(rest);
            const messagesList: chatMessageI[] = messages.map(msg => ({
                ...msg,
                role: msg.userId === currentUser.userId ? "user" : "other"
            }))
            setAllChatMessages(messagesList);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("receiveMessageGlobal", receiveMessageGlobal);
        if (currentUser?.userId) {
            socket.on("loadOldMessages", loadChatHistory);
        }

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("receiveMessageGlobal", receiveMessageGlobal);
            socket.off("loadOldMessages", loadChatHistory);
        };
    }, [currentUser]);

    function handleSendMessage() {
        if (!inputVal.trim() || !currentUser) return;

        const newMessage: chatMessageI = {
            message: inputVal,
            user: currentUser.user,
            role: "user",
            userId: currentUser.userId,
            messageTime: moment().format("hh:mm A"),
            testId: testId || "",
            reports: 0,
            totalReports: 0
        };

        setAllChatMessages(prev => [...prev, newMessage]);

        socket.emit("sendMessageGlobal", newMessage);
        socket.emit("loadTestGlobalMessages", testId || "");

        setInputVal("");
    }

    useEffect(() => {
        if (socket.connected && currentUser?.userId) {
            socket.emit("loadTestGlobalMessages", testId || "");
        }
    }, [currentUser?.userId])


    async function handleChatMsgReport(msgId: string) {
        try {
            if (testId && msgId) {
                const data = await reportChatMsg(testId, msgId);
                socket.emit("loadTestGlobalMessages", testId || "");
                toast.success(data?.message || "Message reported successfully");
            }
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "Something went wrong");
            checkAuthUserHelper(err);
        }
    }


    return {
        isConnected,
        handleSendMessage,
        setInputVal,
        inputVal,
        allChatMessages,
        handleChatMsgReport,
        testDetails
    };
}

export interface chatMessageI {
    message: string;
    user: string;
    role: "user" | "other";
    userId: string;
    messageTime: string;
    testId: string;
    reports?: number;
    _id?: string;
    totalReports: number;
}

interface currUserInfoI {
    userId: string;
    user: string;
}

export interface testDetailsI {
    examName: string;
    isBlocked: boolean;
    totalReports: number;
    userCount: number;
}

interface chatHistoryDetailsI extends testDetailsI {
    messages: chatMessageI[];
}
