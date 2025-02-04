import Markdown from "react-markdown";

export type TChatMessage = {
  actor: "system" | "human" | "ai";
  message: string;
};

export function ChatMessage({ message, actor }: TChatMessage, index: number) {
  const classNameFromActor = (actor: string) => {
    switch (actor) {
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

  return (
    <li key={index} className={classNameFromActor(actor)}>
      <Markdown>{message.replace(/<think>(.|\n)*?<\/think>/g, "")}</Markdown>
    </li>
  );
}

export default ChatMessage;
