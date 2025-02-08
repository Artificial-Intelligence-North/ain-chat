import { ChatMessage } from "./ChatMessage";

interface ChatHistoryProps {
  messages: {
    message: string;
    type: string;
  }[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
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
