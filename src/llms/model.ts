import { ChatData } from "../types";

import Manifest from "../manifest";
import FunctionCall from "../function/function_call";

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat";

abstract class LLMEngineBase {
  abstract chat_completion(
    messages: ChatCompletionMessageParam[],
    manifest: Manifest,
    verbose: boolean,
  ): Promise<{
    role: string;
    res: string | null;
    function_call: FunctionCall | null;
  }>;
}
class LLMEngineOpenAIGPT extends LLMEngineBase {
  openai: OpenAI;

  constructor() {
    super();
    this.openai = new OpenAI();
  }
  async chat_completion(
    messages: ChatCompletionMessageParam[],
    manifest: Manifest,
    verbose: boolean,
  ) {
    console.log(messages);
    const functions = manifest.functions();

    const chatCompletion = await this.openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
      functions,
    });

    const answer = chatCompletion.choices[0].message;
    const res = answer.content;
    const role = answer.role;

    // answer["function_call"] may be string, but actucally dict.
    const function_call =
      functions && answer["function_call"]
        ? new FunctionCall(answer["function_call"] as any, manifest)
        : null;

    return { role, res, function_call };
  }
}
class LlmModel {
  private engine: LLMEngineBase;

  constructor() {
    this.engine = new LLMEngineOpenAIGPT();
  }
  conv(message: ChatData) {
    const { role, content } = message;
    return { role, content } as ChatCompletionMessageParam;
  }
  async generate_response(
    messages: ChatData[],
    manifest: Manifest,
    verbose: boolean,
  ) {
    return await this.engine.chat_completion(
      messages.map(this.conv),
      manifest,
      verbose,
    );
  }
}

export default LlmModel;
