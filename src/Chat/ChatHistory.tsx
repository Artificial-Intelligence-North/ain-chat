import { TChatMessage, ChatMessage } from "./ChatMessage";

export type TChatHistory = {
  messages: Array<TChatMessage>;
};

export function ChatHistory(chatHistory: TChatHistory) {
  const { messages } = chatHistory;
  return (
    <div className="chat-history-container">
      <ul className="chat-history">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </ul>
    </div>
  );
}

export default ChatHistory;
