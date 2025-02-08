import { FormEvent } from "react";
import { TextInput, Button, Group } from "@mantine/core";

interface ChatInputProps {
  onSubmit: (event: FormEvent) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="chat-input">
        <Group>
          <TextInput placeholder="Your prompt" />
          <Button type="submit">Send</Button>
        </Group>
      </div>
    </form>
  );
}

export default ChatInput;
