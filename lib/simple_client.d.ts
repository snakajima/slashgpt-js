import { ChatSession } from "./";
export declare const getCurrentFilePath: () => string;
export declare const callback: (callback_type: string, data: unknown) => void;
export declare const justRun: (fileName: string) => Promise<ChatSession>;
