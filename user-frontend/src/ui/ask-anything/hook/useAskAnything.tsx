// import { AI } from "@/constant/global.const";
// import axios from "axios";
import axiosInstance, { type ErrResp } from "@/config/axios-instance";
import { useState } from "react";
import { toast } from "react-toastify";

const chatInitialVal = [
    { role: "system", content: "You are a helpful assistant." },
];

export default function UseAskAnything() {
    const [messages, setMessages] = useState(chatInitialVal);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // const API_KEY = import.meta.env.VITE_BASE_AI_KEY;

    const sendMessage = async () => {
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await axiosInstance.post("/v1/ask/question",
                {
                    // model: AI.MODAL,
                    question: input,
                }
                // ,
                // {
                //     headers: {
                //         Authorization: `Bearer ${API_KEY}`,
                //         "Content-Type": "application/json",
                //     },
                // }
            );

            const reply = res.data?.answer;
            setMessages([...newMessages, { role: "bot", content: reply }]);
        } catch (err) {
            const error = err as ErrResp;
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    };

    function resetChatHistory() {
        setMessages(chatInitialVal)
    }

    return {
        sendMessage,
        loading,
        messages,
        input,
        setInput,
        resetChatHistory
    }
}
