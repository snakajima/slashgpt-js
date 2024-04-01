# SlashGPT js

SlashGPT jsは、[SlashGPT](https://github.com/snakajima/SlashGPT)を TypeScriptに移植したものです。ブラウザとNode.jsでの動作を目的としています。
オリジナルのPythonバージョンで動作するManifestをサポートするように作っていますが、オリジナルとは動作が異なる部分があります。

以下はサポートしません
- Pythonで実行されるLLMのサポート
- ファイルシステムから読み込まれるファイルのサポート（ブラウザで動作しないため)
- Pythonコードを実行する機能
- embeddingなどのdbのサポート(ブラウザで動作しないため)

現在の実装状況は

## manifestで移植済みの機能
- *title* (string, **required**): Title for the user to see
- *about* (string, optional): About the manifest (URL, email, github id, or twitter id)
- *description* (string, optional): Human/LLM readable description of this agent
- *bot* (string, optional): Agent name. The default is Agent({agent_name}).
- *temperature* (number, optional): Temperature (the default is 0.7)
- *model* (string or dict, optional): LLM model (such as "gpt-4-613", the default is "gpt-3-turbo")
- *prompt* (array of strings, **required**): The system prompts which define the agent (required)
- *functions* (string or list, optional): string - location of the function definitions, list - function definitions
- *actions* (object, optional): Template-based function processor (see details below)
- *skip_function_result* (boolean): skip the chat completion right after the function call.


## manifestで移植されていない機能

#### チャット向けのため
- *sample* or *smaple...* (string, optional): Sample question (type "/sample" to submit it as the user message)
- *you* (string, optional): User name. The default is You({agent_name}).
- *intro* (array of strings, optional): Introduction statements (will be randomly selected)

#### 特別な用途の機能のため
- *form* (string): format string to extend user's query (e.g. "Write python code to {question}").
- *result_form* (string): format string to extend function call result.
- *list* (array of string, optional): {random} will put one of them randomly into the prompt

- *function_call* (string, optional): the name of tne function LLM should call
- *logprobs* (number, optional): Number of "next probable tokens" + associated log probabilities to return alongside the output
- *num_completions* (number, optional): Number of different completions to request from the model per prompt
- *resource* (string, optional): location of the resource file. Use {resource} to paste it into the prompt

#### ブラウザではサポートできないため
- *embeddings* (object, optional):
  - *name* (string, optional): index name of the embedding vector database
- *module* (string, optional): location of the Python script to be loaded for function calls
- *notebook* (boolean): create a new notebook at the beginning of each session (for code_palm2)
- *stream* (boolean, optional): Enable LLM output streaming (not yet implemented)


## 使い方

```
npm install slashgpt
```

```
import fs from "fs";
import path from "path";
import YAML from "yaml";

import { ChatSession } from "slashgpt";
import { ChatConfig } from "slashgpt";

import { print_bot } from "slashgpt/chat_utils";

const base_path = path.resolve(__dirname + "/");
const file = base_path + "/paper.yml";

const main = async () => {
  const manifest_file = fs.readFileSync(file, "utf8");
  const manifest = YAML.parse(manifest_file);
  const config = new ChatConfig(base_path);

  const session = new ChatSession(config, manifest);

  const callback = (callback_type: string, data: unknown) => {
    if (callback_type === "bot") {
      print_bot(session.botname(), JSON.stringify(data));
    }
  };

  session.append_user_question(manifest.sample);
  await session.call_loop(callback);

  console.log(session.history);
};

main();

```