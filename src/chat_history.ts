import { ChatData } from "./types";

class ChatHistory {
  private repository: ChatData[];
  
  constructor() {
    this.repository = [];
  }
  append_message(data: ChatData) {
    this.repository.push(data)
  }
  messages() {
    return this.repository;
  }
 
}

export default ChatHistory;
