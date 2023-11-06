"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const function_call_1 = __importDefault(require("../function/function_call"));
const openai_1 = __importDefault(require("openai"));
class LLMEngineBase {
}
class LLMEngineOpenAIGPT extends LLMEngineBase {
    constructor() {
        super();
        this.openai = new openai_1.default();
    }
    chat_completion(messages, manifest, verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(messages);
            const functions = manifest.functions();
            const function_call_param = manifest.function_call();
            const chatCompletion = yield this.openai.chat.completions.create({
                messages,
                model: "gpt-3.5-turbo",
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
        });
    }
}
class LlmModel {
    constructor() {
        this.engine = new LLMEngineOpenAIGPT();
    }
    conv(message) {
        const { role, content } = message;
        return { role, content };
    }
    generate_response(messages, manifest, verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.engine.chat_completion(messages.map(this.conv), manifest, verbose);
        });
    }
}
exports.default = LlmModel;
