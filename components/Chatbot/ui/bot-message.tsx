import { RiRobot3Line } from "react-icons/ri";
import { Message } from "../chatbot";
import React from "react";

export default function BotMessage({ role, content }: Message) {
  // 判斷 content 內含 faqs.json 則不顯示
  if (content.includes("faqs.json")) {
    return null; // 不顯示任何內容
  }

  // role 是 'system'，改為 'assistant'
  const displayRole = role === "system" ? "assistant" : role;

  // 將 content 中的換行符和 Markdown 格式的超連結轉換為 HTML 格式，並加上底線和淺藍色
  const convertToHtml = (text: string) => {
    // 使用正則表達式替換超連結，將其設置為淺藍色且加底線
    const regex = /\[(.*?)\]\((.*?)\)/g;
    return text
      .replace(regex, (match, linkText, url) => {
        return `<a href="${url}" target="_blank" style="text-decoration: underline; color: #ADD8E6;">[ ${linkText} ]</a>`;
      })
      .replace(/\n/g, "<br />"); // 替換換行符為 <br />
  };

  // 將 content 轉換為 JSX 格式的 HTML
  const parsedContent = React.createElement("div", {
    dangerouslySetInnerHTML: { __html: convertToHtml(content) },
  });

  return (
    <div className="flex w-full my-2">
      <div
        className="flex justify-center p-1 w-8 h-8 border bg-slate-800 rounded-full mr-2"
      >
        <RiRobot3Line size={18} />
      </div>

      <div>
        {/* 顯示角色 */}
        <div>{displayRole}</div>

        {/* 顯示轉換後的內容 */}
        {parsedContent}
      </div>
    </div>
  );
}