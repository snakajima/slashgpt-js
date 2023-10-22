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
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yaml_1 = __importDefault(require("yaml"));
const src_1 = require("../src/");
const src_2 = require("../src/");
const chat_utils_1 = require("../src/chat_utils");
const base_path = path_1.default.resolve(__dirname + "/../");
const file = base_path + "/manifests/kgraph/knowledge.yml";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const manifest_file = fs_1.default.readFileSync(file, "utf8");
    const manifest = yaml_1.default.parse(manifest_file);
    const config = new src_2.ChatConfig(base_path);
    const session = new src_1.ChatSession(config, manifest);
    const callback = (callback_type, data) => {
        if (callback_type === "bot") {
            (0, chat_utils_1.print_bot)(session.botname(), data);
        }
    };
    for (;;) {
        const rl = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
        const question = yield new Promise(resolve => rl.question(`${session.username}:`, input_str => { rl.close(); resolve(input_str); }));
        if (question) {
            session.append_user_question(session.manifest.format_question(question));
            yield session.call_loop(callback);
        }
    }
});
main();
