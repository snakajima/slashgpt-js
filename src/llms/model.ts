import Manifest from "../manifest";
import { ChatData } from "../types";
import OpenAI from "openai";
import {ChatCompletionMessageParam} from "openai/resources/chat";

class LLMEngineBase {
  async chat_completion(messages: ChatCompletionMessageParam[], manifest: Manifest, verbose: boolean) {
  }
}
class LLMEngineOpenAIGPT extends LLMEngineBase {
  openai: OpenAI;
  
  constructor() {
    super()
    this.openai = new OpenAI();
  }
  async chat_completion(messages: ChatCompletionMessageParam[], manifest: Manifest, verbose: boolean) {
    
    console.log(messages)
    const functions = manifest.functions();
   
    const chatCompletion = await this.openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
      functions,
    });
    
    const answer = chatCompletion.choices[0].message;
    // console.log(chatCompletion.choices[0]);
    const res = answer.content;
    const role = answer.role

    const function_call = (functions) ? 
    
    return { role, res, function_call }

  }
}
class LlmModel {
  private engine: LLMEngineBase

  constructor() {
    this.engine = new LLMEngineOpenAIGPT()
  }
  conv(message: ChatData) {
    const { role, content } = message;
    return { role, content } as ChatCompletionMessageParam
  }
  async generate_response(messages: ChatData[], manifest: Manifest, verbose: boolean) {
    await this.engine.chat_completion(messages.map(this.conv), manifest, verbose)
  }
}

export default LlmModel;
