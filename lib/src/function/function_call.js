"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FunctionCall {
    constructor(data, manifest) {
        this.function_call_data = data;
        console.log(this.function_call_data);
        this.manifest = manifest;
        //
        this.function_name = this.name();
        this.call_arguments = this.get_call_arguments();
    }
    function_data() {
        return {
            function_name: this.function_name,
            call_arguments: this.call_arguments,
        };
    }
    name() {
        return this.function_call_data.name;
    }
    get_call_arguments() {
        const call_arguments = this.function_call_data.arguments;
        if (call_arguments && typeof call_arguments === "string") {
            try {
                return JSON.parse(call_arguments);
            }
            catch (e) {
                console.log(e);
            }
        }
        return call_arguments;
    }
    process_function_call(history, verbose = false) {
        if (!this.function_name) {
            return {
                function_message: null,
                function_name: null,
                should_call_llm: false,
            };
        }
        return {
            function_message: "",
            function_name: this.function_name,
            should_call_llm: false,
            call_arguments: this.call_arguments,
        };
    }
}
exports.default = FunctionCall;
