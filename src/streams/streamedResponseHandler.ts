export type CompletionChunk = {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
};

type TStreamedResponse = {
  data: ReadableStream<ArrayBuffer>;
  onChunkParsed?: (chunk: CompletionChunk) => void;
};

export const streamedResponseHandler = async ({
  data,
  onChunkParsed,
}: TStreamedResponse) => {
  const reader = data.getReader();
  const decoder = new TextDecoder();

  const chatResponse: Array<string> = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n").filter(Boolean);

    for (const line of lines) {
      try {
        const completionChunk: CompletionChunk = JSON.parse(line);
        chatResponse.push(completionChunk.response);
        onChunkParsed?.(completionChunk);
      } catch (error) {
        console.error("Error parsing chunk:", error);
      }
    }
  }

  return chatResponse.join("");
};
