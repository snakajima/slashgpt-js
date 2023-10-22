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
const manifest_1 = __importDefault(require("./manifest"));
const chat_history_1 = __importDefault(require("./chat_history"));
const model_1 = __importDefault(require("./llms/model"));
class ChatSession {
    constructor(config, manifest_data) {
        this.config = config;
        this.username = "you!";
        this.manifest = new manifest_1.default(manifest_data, config.base_path);
        this.history = new chat_history_1.default();
        this.prompt = this.manifest.prompt_data();
        if (this.prompt) {
            this.append_message("system", this.prompt, true);
        }
        this.llm_model = new model_1.default();
    }
    botname() {
        return this.manifest.botname();
    }
    append_message(role, content, preset, name, function_data) {
        this.history.append_message({ role, content, name, preset, function_data });
    }
    append_user_question(message) {
        const post_message = this.manifest.format_question(message);
        this.append_message("user", post_message, false);
    }
    call_llm() {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = this.history.messages();
            const { role, res, function_call } = yield this.llm_model.generate_response(messages, this.manifest, true);
            console.log(function_call);
            if (role && res) {
                if (function_call) {
                    this.append_message(role, res, false, undefined, function_call.function_data());
                }
                else {
                    this.append_message(role, res, false);
                }
            }
            return { res, function_call };
        });
    }
    call_loop(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const { res, function_call } = yield this.call_llm();
            if (res) {
                callback("bot", res);
            }
            if (function_call) {
                // not support emit yet.
                const { function_message, function_name, should_call_llm } = function_call.process_function_call(this.history, true);
                /*
                if (function_message) {
                  callback("function", {function_name, function_message})
                }
                if (should_call_llm) {
                  this.call_loop(callback)
                }
                */
            }
        });
    }
}
exports.default = ChatSession;
