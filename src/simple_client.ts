import path from "path";

import { print_bot } from "./chat_utils";
import { ChatSession } from "./";
import { ChatConfig } from "./";
import { readManifestData } from "./file_utils";

export const getCurrentFilePath = () => path.resolve(__dirname);

export const callback = (callback_type: string, data: unknown) => {
  if (callback_type === "bot") {
    print_bot("bot", JSON.stringify(data));
  }
};

export const justRun = async (fileName: string) => {
  const manifest = readManifestData(getCurrentFilePath() + "/" + fileName);
  const config = new ChatConfig(getCurrentFilePath());

  const session = new ChatSession(config, manifest);

  session.append_user_question(manifest.sample);
  await session.call_loop(callback);
  return session;
};
