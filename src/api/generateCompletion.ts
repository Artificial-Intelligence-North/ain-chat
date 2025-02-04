import axios from "axios";

export type BufferedCompletionChunk = ArrayBuffer;

export type CompletionRequest = {
  prompt: string;
  model: string;
};

// TODO: move to settings or config file maybe
const apiBaseUrl = "http://localhost:11434";

export const generateCompletion = async ({
  prompt,
  model,
}: CompletionRequest) =>
  axios.post<ReadableStream<BufferedCompletionChunk>>(
    `${apiBaseUrl}/api/generate`,
    {
      model,
      prompt,
    },
    {
      responseType: "stream",
      adapter: "fetch",
    }
  );
