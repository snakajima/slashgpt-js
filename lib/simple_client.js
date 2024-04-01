"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.justRun = exports.callback = exports.getCurrentFilePath = void 0;
const path_1 = __importDefault(require("path"));
const chat_utils_1 = require("./chat_utils");
const _1 = require("./");
const _2 = require("./");
const file_utils_1 = require("./file_utils");
const getCurrentFilePath = () => path_1.default.resolve(__dirname);
exports.getCurrentFilePath = getCurrentFilePath;
const callback = (callback_type, data) => {
    if (callback_type === "bot") {
        (0, chat_utils_1.print_bot)("bot", JSON.stringify(data));
    }
};
exports.callback = callback;
const justRun = async (fileName) => {
    const manifest = (0, file_utils_1.readManifestData)((0, exports.getCurrentFilePath)() + "/" + fileName);
    const config = new _2.ChatConfig((0, exports.getCurrentFilePath)());
    const session = new _1.ChatSession(config, manifest);
    session.append_user_question(manifest.sample);
    await session.call_loop(exports.callback);
    return session;
};
exports.justRun = justRun;
