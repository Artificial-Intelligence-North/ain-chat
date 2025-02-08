import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ChatHistory } from "../Chat";
import { IterableReadableStream } from "@langchain/core/utils/stream";

interface MessageChunk {
  content: string | string[] | undefined | object;
}
interface CompletionRequest {
  input: string;
  model: string;
  history: { message: string; type: string }[];
}

type CompletionResponse = IterableReadableStream<MessageChunk>;

type ChatHistory = (AIMessage | HumanMessage | SystemMessage)[];

export const generateCompletion = async ({
  input,
  model,
  history,
}: CompletionRequest): Promise<CompletionResponse> => {
  const llm = new ChatOllama({
    model,
    temperature: 0.5,
    maxRetries: 2,
  });

  const system = new SystemMessage({
    content: "You are a helpful AI assistant.",
  });

  const chatHistory: ChatHistory = [system];

  for (const { message, type } of history) {
    if (type === "human" && message) {
      chatHistory.push(
        new HumanMessage({
          content: message,
        })
      );
    }

    if (type === "ai" && message) {
      chatHistory.push(
        new AIMessage({
          content: message,
        })
      );
    }

    if (type === "system" && message) {
      chatHistory.push(
        new SystemMessage({
          content: message,
        })
      );
    }
  }

  chatHistory.push(
    new HumanMessage({
      content: input,
    })
  );

  const prompt = ChatPromptTemplate.fromMessages(chatHistory);
  const chain = prompt.pipe(llm);

  return chain.stream({});
};
