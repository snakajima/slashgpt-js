"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replate_template = void 0;
const replate_template = (base_data, template) => {
    return Object.keys(base_data).reduce((tmp, key) => {
        return tmp.replaceAll("{" + key + "}", base_data[key]);
    }, template);
};
exports.replate_template = replate_template;
