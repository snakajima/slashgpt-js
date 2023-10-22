import { ChatData } from "./types";
declare class ChatHistory {
    private repository;
    constructor();
    append_message(data: ChatData): void;
    messages(): ChatData[];
    last_message(): ChatData | undefined;
}
export default ChatHistory;
