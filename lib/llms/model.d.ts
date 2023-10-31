import { ChatData, LlmUsage } from "../types";
import Manifest from "../manifest";
import FunctionCall from "../function/function_call";
import OpenAI from "openai";
declare class LlmModel {
    private engine;
    constructor();
    conv(message: ChatData): OpenAI.Chat.Completions.ChatCompletionMessageParam;
    generate_response(messages: ChatData[], manifest: Manifest, verbose: boolean): Promise<{
        role: string;
        res: string | null;
        function_call: FunctionCall | null;
        usage: LlmUsage | null;
    }>;
}
export default LlmModel;
