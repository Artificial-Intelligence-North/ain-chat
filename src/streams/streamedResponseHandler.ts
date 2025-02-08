import { IterableReadableStream } from "@langchain/core/utils/stream";

type MessageChunkStream = IterableReadableStream<MessageChunk>;
interface StreamedResponse {
  stream: MessageChunkStream;
  onChunkParsed?: (chunk: MessageChunk) => void;
}

interface MessageChunk {
  content: string | string[] | undefined | object;
}

export const streamedResponseHandler = async ({
  stream,
  onChunkParsed,
}: StreamedResponse) => {
  const chunks: MessageChunk[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
    onChunkParsed?.(chunk);
  }

  const response = chunks.map((c) => c.content).join("");

  return response;
};
