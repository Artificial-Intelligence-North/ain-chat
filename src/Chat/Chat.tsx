import { FormEvent, useState } from "react";
import { TChatMessage } from "./ChatMessage";
import { ChatHistory, TChatHistory } from "./ChatHistory";
import { generateCompletion } from "../api/generateCompletion";
import { streamedResponseHandler } from "../streams/streamedResponseHandler";

import "./Chat.css";

export type TChat = {
  model: string;
};

export function Chat({ model }: TChat) {
  const [chatHistory, setChatHistory] = useState<TChatHistory>({
    messages: [],
  });

  const queryModel = (event: FormEvent) => {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    const chatInput = document.querySelector("input");

    if (chatInput && chatInput.value) {
      const prompt = chatInput.value;

      const humanMessage: TChatMessage = {
        actor: "human",
        message: prompt,
      };

      const aiMessage: TChatMessage = {
        actor: "ai",
        message: "",
      };

      setChatHistory({
        messages: [...chatHistory.messages, humanMessage, aiMessage],
      });

      let thinking = false;

      generateCompletion({
        prompt,
        model,
      })
        .then((response) =>
          streamedResponseHandler({
            data: response.data,
            onChunkParsed: (chunk) => {
              const listItems = document.querySelectorAll("li");
              const listItem = listItems[listItems.length - 1];
              if (chunk.response.match(/<think>/g)) {
                thinking = true;
              }
              if (chunk.response.match(/<\/think>/g)) {
                thinking = false;
              }
              if (!thinking) {
                listItem.innerHTML = listItem.innerHTML + chunk.response;
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
                actor: "ai",
                message,
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

      <form onSubmit={queryModel}>
        <div className="chat-input">
          <input type="text" />
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}

export default Chat;
