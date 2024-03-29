"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const function_call_1 = __importDefault(require("../function/function_call"));
const openai_1 = __importDefault(require("openai"));
class LLMEngineBase {
}
class LLMEngineOpenAIGPT extends LLMEngineBase {
    constructor(option) {
        super();
        this.openai = option ? new openai_1.default(option) : new openai_1.default();
    }
    async chat_completion(messages, manifest, verbose) {
        const functions = manifest.functions();
        const function_call_param = manifest.function_call();
        const model_name = manifest.model_name();
        const chatCompletion = await this.openai.chat.completions.create({
            messages,
            model: model_name || "gpt-3.5-turbo",
            functions,
            function_call: function_call_param,
        });
        const answer = chatCompletion.choices[0].message;
        const res = answer.content;
        const role = answer.role;
        const usage = chatCompletion.usage;
        // answer["function_call"] may be string, but actucally dict.
        const function_call = functions && answer["function_call"]
            ? new function_call_1.default(answer["function_call"], manifest)
            : null;
        return { role, res, function_call, usage };
    }
}
class LlmModel {
    constructor(option) {
        this.engine = new LLMEngineOpenAIGPT(option);
    }
    conv(message) {
        const { role, content, name } = message;
        return { role, content, name };
    }
    async generate_response(messages, manifest, verbose) {
        return await this.engine.chat_completion(messages.map(this.conv), manifest, verbose);
    }
}
exports.default = LlmModel;
