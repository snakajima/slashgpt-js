import { ChatData, LlmUsage } from "../types";

import Manifest from "../manifest";
import FunctionCall from "../function/function_call";

import OpenAI, { ClientOptions } from "openai";
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
    usage: LlmUsage | null;
  }>;
}
class LLMEngineOpenAIGPT extends LLMEngineBase {
  openai: OpenAI;

  constructor(option?: ClientOptions) {
    super();
    this.openai = option ? new OpenAI(option) : new OpenAI();
  }
  async chat_completion(
    messages: ChatCompletionMessageParam[],
    manifest: Manifest,
    verbose: boolean,
  ) {
    // console.log(messages);
    const functions = manifest.functions();
    const function_call_param = manifest.function_call();
    const model_name = manifest.model_name();
    // console.log(model_name);
    const chatCompletion = await this.openai.chat.completions.create({
      messages,
      model: model_name || "gpt-3.5-turbo",
      functions,
      function_call: function_call_param,
    });

    const answer = chatCompletion.choices[0].message;
    const res = answer.content;
    const role = answer.role;
    const usage = chatCompletion.usage as LlmUsage;

    // answer["function_call"] may be string, but actucally dict.
    const function_call =
      functions && answer["function_call"]
        ? new FunctionCall(answer["function_call"] as any, manifest)
        : null;

    return { role, res, function_call, usage };
  }
}
class LlmModel {
  private engine: LLMEngineBase;

  constructor(option?: ClientOptions) {
    this.engine = new LLMEngineOpenAIGPT(option);
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
