"use server";

import OpenAI from "openai";
import { Message } from "@/components/Chatbot/chatbot";
import fs from "fs";
import path from "path";

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// FAQ Type
type FAQ = {
    question: string;
    answer: string;
};

// Reads the FAQs JSON file
const filePath = path.resolve(process.cwd(), "data", "faqs.json");
const faqs : FAQ[] = JSON.parse(fs.readFileSync(filePath, "utf-8")).faqs;
console.log(faqs);

/**
 * Chat Completion
 * @param chatMessages 
 * @returns 
 */
// export async function chatCompletion(chatMessages: Message[]) {
//     console.log("FROM BACKEND", chatMessages);

//     const chat = [
//         { role: "system", content: "You are a helpful assistant" },
//         ...chatMessages
//     ]

//     const completion = await openAI.chat.completions.create({
//         messages: chat,
//         model: "gpt-4o-mini"
//     });
    
//     console.log("COMPLETION", completion.choices[0]);
    
//     return completion;
// }
export async function chatCompletion(chatMessages: Message[]) {
    try { 
        console.log("FROM BACKEND", chatMessages);

        // Check if the user question is in the FAQ array
        const faqsAnswer = faqs.find(faq => chatMessages.at(-1)?.content.toLowerCase().includes(faq.question.toLowerCase()));

        // if (faqsAnswer) {
        //     console.log("FAQS ANSWER", faqsAnswer);
        //     return {
        //         choices: [
        //             {
        //                 message: {
        //                     role: "system",
        //                     content: faqsAnswer.answer
        //                 }
        //             }
        //         ]
        //     };
        // }

        if (faqsAnswer) {
            console.log("FAQS ANSWER", faqsAnswer);
            return { role: "system", content: faqsAnswer.answer } as Message;
        }

        console.log("Reaching out to OPENAI API...");

        // Chat to be send to OPEN AI
        const chat = [
            { role: "system", content: "You are a helpful assistant" },
            ...faqs.map(faq => ({
                role: "system",
                content: `Q: ${faq.question}\nA: ${faq.answer}`
            })),
            ...chatMessages
        ]
        
        const completion = await openAI.chat.completions.create({
            messages: chat,
            model: "gpt-4o-mini"
        });

        if (!completion) {
            console.log("NO COMPLETION");
            throw new Error("Invalid response from OPENAI API!");
            return;
        }

        // Bot/Assistant Message
        const assistantMessage = completion.choices[0].message?.content;

        if (!assistantMessage) {
            console.log("NO ASSISTANT MESSAGE");
            throw new Error("No message from OPENAI API!");
        }
        
        console.log("COMPLETION", completion.choices[0].message.content);

        return { role: "system", content: assistantMessage } as Message;
    } catch (error) {
        console.error(error);
        return { role: "assistant", content: "I'm sorry, I'm having trouble now. Please try again later." } as Message;
    }
}