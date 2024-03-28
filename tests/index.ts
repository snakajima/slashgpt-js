// import readline from "readline";

import fs from "fs";
import path from "path";
import YAML from "yaml";

import { ChatSession } from "../src/";
import { ChatConfig } from "../src/";

import { print_bot } from "../src/chat_utils";

const base_path = path.resolve(__dirname + "/../");

const file = base_path + "/manifests/kgraph/knowledge.yml";

const main = async () => {
  const manifest_file = fs.readFileSync(file, "utf8");
  const manifest = YAML.parse(manifest_file);
  const config = new ChatConfig(base_path);

  const session = new ChatSession(config, manifest);

  const callback = (callback_type: string, data: string) => {
    if (callback_type === "bot") {
      print_bot(session.botname(), data);
    }
  };

  const question = "太陽系の惑星の相関図";
  session.append_user_question(question);
  await session.call_loop(callback);

  console.log(session.history);
  /*
  for (;;) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const question = await new Promise(resolve => rl.question(`${session.username}:`, input_str => { rl.close(); resolve(input_str);})) as string;
    
    if (question) {
      session.append_user_question(session.manifest.format_question(question));
      await session.call_loop(callback);
    }
  }
*/
};

main();
