"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatHistory {
    constructor() {
        this.repository = [];
    }
    append_message(data) {
        this.repository.push(data);
    }
    messages() {
        return this.repository;
    }
    last_message() {
        if (this.repository.length > 0) {
            return this.repository[this.repository.length - 1];
        }
    }
}
exports.default = ChatHistory;
