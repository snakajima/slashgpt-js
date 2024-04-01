import path from "path";

import { print_bot } from "../src/chat_utils";

export const callback = (callback_type: string, data: unknown) => {
  if (callback_type === "bot") {
    print_bot("bot", JSON.stringify(data));
  }
};

export const getBasePath = () => path.resolve(__dirname + "/../");

export const getFilePath = (fileName: string) => {
  const base_path = getBasePath();
  const file = base_path + "/manifests/main/" + fileName;
  return file;
};
