import { ManifestData } from "./types";
import Manifest from "./manifest";
import ChatHistory from "./chat_history";

class ChatSession {
  public username: string;
  public manifest: Manifest;
  public history: ChatHistory;
  public prompt: string;
  
  constructor(manifest_data: ManifestData) {
    this.username = "you!"
    this.manifest = new Manifest(manifest_data);
    this.history = new ChatHistory();
    
    this.prompt = this.manifest.prompt_data()
    
  }
  
  botname() {
    return this.manifest.botname();
  }

  append_message(role: string, message: string, preset: boolean, name?: string) {
    this.history.append_message({"role": role, "content": message, "name": name, "preset": preset})
  }
  append_user_question(message: string) {
    const post_message = this.manifest.format_question(message);
    this.append_message("user", post_message, false);
  }

  call_llm() {
    // const {res, function_call} = { res:{}, function_call: process_function_call: () => {}};
    return {res: "", function_call: {}}
  }

  public call_loop(callback: (callback_type: string, data: string) => void) {
    const { res, function_call } = this.call_llm();

    if (res) {
      callback("bot", res)
    }
    if (function_call) {
      // not support emit yet.
      /*
      const {
        function_message,
        function_name,
        should_call_llm,
      } = function_call.process_function_call(
        self.history,
        true,
      )
      if (function_message) {
        callback("function", {function_name, function_message})
      }
      if (should_call_llm) {
        this.call_loop(callback)
      }
      */
    }
  }
}

export default ChatSession;
