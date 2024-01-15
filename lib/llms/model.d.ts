import { ChatData, LlmUsage } from "../types";
import Manifest from "../manifest";
import FunctionCall from "../function/function_call";
import OpenAI, { ClientOptions } from "openai";
declare class LlmModel {
    private engine;
    constructor(option?: ClientOptions);
    conv(message: ChatData): OpenAI.Chat.Completions.ChatCompletionMessageParam;
    generate_response(messages: ChatData[], manifest: Manifest, verbose: boolean): Promise<{
        role: string;
        res: string | null;
        function_call: FunctionCall | null;
        usage: LlmUsage | null;
    }>;
}
export default LlmModel;
