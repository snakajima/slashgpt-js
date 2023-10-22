"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_info = exports.print_bot = void 0;
const print_bot = (bot_name, message) => {
    console.log(`${bot_name}: ${message}`);
};
exports.print_bot = print_bot;
const print_info = (text) => {
    console.log(`${text}`);
};
exports.print_info = print_info;
