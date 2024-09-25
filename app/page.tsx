// app/page.tsx 是你的應用程式的主要頁面。這是一個 React 元件，負責渲染你的應用程式的主要內容。
// 這行將你自定義的 Chatbot 元件從 @/components/Chatbot/chatbot 位置引入。這應該是一個自定義的 React 元件，負責處理聊天機器人的功能。
import Chatbot from "@/components/Chatbot/chatbot";

// 這是你的應用程式的主要頁面元件。這個元件包含了一個標題和 Chatbot 元件。
// export default function Home()：這是一個 React 函式元件，名為 Home，這個元件會被預設匯出作為主頁使用。
export default function Home() {
  // 	•	JSX (HTML-like)：
	//    •	<main> 定義了一個主要區域，並應用了幾個 Tailwind CSS 的樣式，如 flex、min-h-screen（最小高度佔滿全屏）、flex-col（將子元件垂直排列）、items-center（將子元件水平居中），以及 p-24（加入 padding）。
	//    •	<h1> 是頁面中的標題，顯示 “Chatbot with OpenAI”。
	//    •	<Chatbot />：這是引入的 Chatbot 元件，它會顯示在頁面中並負責顯示聊天機器人的界面。
  // JSX 是 JavaScript XML 的縮寫，它是一種語法擴展，主要用於 React 中。JSX 允許你在 JavaScript 代碼中撰寫類似於 HTML 的語法，然後這些語法會被轉換成 JavaScript 函數呼叫，最終產生網頁的 DOM 結構。
  // JSX 主要特點：
	// 1.	結合 JavaScript 和 HTML-like 語法：
	//    •	讓開發者可以在 JavaScript 中直接撰寫 HTML 標籤，並且可以在這些標籤中直接嵌入 JavaScript 表達式，增加了代碼的可讀性和直觀性。
	// 2.	語法擴展：
	//    •	JSX 不是原生的 JavaScript 語法，而是語法糖，會經由編譯工具（如 Babel）轉換成標準的 JavaScript 代碼。
  // 例子：
   // 這段 JSX 代碼在編譯後會被轉換成以下的 JavaScript 代碼：
  // const element = React.createElement('h1', null, 'Hello, world!');
  // 優點：
  // 	•	直觀易懂：讓你在撰寫 UI 時，語法看起來很接近 HTML，容易理解和維護。
  // 	•	靈活性：可以在 JSX 中插入 JavaScript 表達式（例如變量、函數調用等），這使得 UI 的邏輯可以很靈活地撰寫。    


  // 總結來說，JSX 讓 React 的 UI 代碼更加簡潔且具表現力，使得前端開發更加直觀。
  return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1>Chatbot with OpenAI</h1>
        <Chatbot />
      </main>
  );
}
