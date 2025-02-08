import Markdown from "react-markdown";

interface ChatMessageProps {
  message: string;
  type: string;
}

export function ChatMessage({ message, type }: ChatMessageProps) {
  const classNameFromType = (type: string) => {
    switch (type) {
      case "human":
        return "human message";
      case "ai":
        return "ai message";
      case "system":
        return "system message";
      default:
        return "";
    }
  };

  const renderMessage = (message: string) => {
    return message.replace(/<think>(.|\n)*?<\/think>/g, "");
  };

  return (
    <li className={classNameFromType(type)}>
      <Markdown>{renderMessage(message)}</Markdown>
    </li>
  );
}

export default ChatMessage;
