"use client";
import { FormEvent, useState } from "react"
import { TbMessageChatbot } from "react-icons/tb"
import BotMessage from "./ui/bot-message";
import UserMessage from "./ui/user-message";
import ChatInput from "./ui/chat-input";
import { chatCompletion } from "@/actions";

type Role = 'user' | 'assistant' | 'system';

export type Message = {
    role: Role;
    content: string;
};

export default function Chatbot(){
    const [showChat, setShowChat] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', content: `若在 faqs.json 裡找到適合的 FAQ，請列出 "answer"對應的value，全部的value為html url，請加上hyper link，且跳到另一個新的頁面，連結只要放 URL，不要放任何文字在連結上。 \
            若 user 問 'quick start guide'，請以 title 中有 'quick start' 為主，且有機種名字為主。 \
            若真找不到相關的資訊，請直接回應，'找不到相關的資訊，請聯絡 Advantech TSE AE (email: support.ACL@advantech.com)'` },
        { role: 'assistant', content: 'Hello, how may I help you today?' },
    ]);
    const handleSendMessage = async ( e : FormEvent ) => {
        e.preventDefault();
        console.log('USER MESSAGE', userMessage);
        if (!userMessage) return;

        // Create a new message object
        const newMessage = { role: 'user', content: userMessage } as Message;
        console.log('NEW MESSAGE', newMessage);
        
        
        // Update the messages state
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setLoading(true);

        // Request to OpenAI API
        try {
            // Copy of message
            const chatMessages = messages.slice();
            console.log('CHAT MESSAGE', chatMessages);

            // Call the completion API
            const res = await chatCompletion([...chatMessages, newMessage]);
            console.log('RESPONSE', res);
            
            setUserMessage('');
            setMessages(prevMessages => [...prevMessages, res]);        
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TbMessageChatbot
                size={64} onClick={() => setShowChat(!showChat)}
                className="fixed right-12 bottom-[calc(1rem)] hover:cursor-pointer"
            />
            { showChat && (
                <div className="fixed right-12 bottom-[calc(4rem+1.5rem)] border
                    hover:cursor-pointer p-5 shadow-md shadow-white w-[500px] h-[474px]">
                    <div className="flex flex-col h-full">
                        {/* CHAT HEADER */}
                        <div>
                            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
                            <p>Powered by OpenAI</p>
                            {/* <button onClick={() => setShowChat(false)}>Close</button> */}
                        </div>
                        {/* CHAT CONTAINER */}
                        <div className="flex flex-col flex-1 items-center p-2 mt-5 overflow-y-auto">
                            {messages && messages.map((m, i) => {
                                return (m.role === 'assistant') ? (
                                    <BotMessage {...m} key={i} />
                                ) : (
                                    <UserMessage {...m} key={i}/>
                                )
                            })}
                        </div>
                        {/* MESSAGE INPUT */}
                        <ChatInput
                            userMessage={userMessage}
                            setUserMessage={setUserMessage}
                            handleSendMessage={handleSendMessage}
                        />
                    </div>
                </div>
            )}
        </>
    )
}