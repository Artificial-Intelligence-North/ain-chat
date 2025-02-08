import { FormEvent, useState } from "react";
import { ChatHistory } from "./ChatHistory";
import { generateCompletion } from "../../api/generateCompletion";
import { streamedResponseHandler } from "../../streams/streamedResponseHandler";

import "./Chat.css";
import ChatInput from "./ChatInput";

interface ChatProps {
  model: string;
}

export function Chat({ model }: ChatProps) {
  const [chatHistory, setChatHistory] = useState<{
    messages: {
      message: string;
      type: string;
    }[];
  }>({
    messages: [],
  });

  const queryModel = (event: FormEvent) => {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    const chatInput = document.querySelector("input");

    if (chatInput && chatInput.value) {
      const prompt = chatInput.value;

      const humanMessage = {
        message: prompt,
        type: "human",
      };

      const aiMessage = {
        message: "",
        type: "ai",
      };

      setChatHistory({
        messages: [...chatHistory.messages, humanMessage, aiMessage],
      });

      let thinking = false;

      generateCompletion({
        input: prompt,
        model,
        history: chatHistory.messages,
      })
        .then((stream) =>
          streamedResponseHandler({
            stream,
            onChunkParsed: (chunk) => {
              const listItems = document.querySelectorAll("li");
              const listItem = listItems[listItems.length - 1];
              if ((chunk.content as string).match(/<think>/g)) {
                thinking = true;
              }
              if ((chunk.content as string).match(/<\/think>/g)) {
                thinking = false;
              }
              if (!thinking) {
                listItem.innerHTML =
                  listItem.innerHTML + (chunk.content as string);
              }
            },
          })
        )
        .then((message) => {
          const listItems = document.querySelectorAll("li");
          const listItem = listItems[listItems.length - 1];
          listItem.innerHTML = "";
          setChatHistory({
            messages: [
              ...chatHistory.messages,
              humanMessage,
              {
                message,
                type: "ai",
              },
            ],
          });
        });

      chatInput.value = "";
    }
  };

  return (
    <div className="chat">
      <ChatHistory {...chatHistory} />

      <ChatInput onSubmit={queryModel} />
    </div>
  );
}

export default Chat;
