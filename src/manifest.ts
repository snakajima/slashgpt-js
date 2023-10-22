import fs from "fs";
import path from "path";

import { ManifestData } from "./types";

class Manifest {
  private data: ManifestData;
  private base_dir: string;
  private agent_name: string;

  constructor(
    manifest_data: ManifestData,
    base_dir: string = "",
    agent_name: string = "",
  ) {
    this.data = manifest_data;
    this.base_dir = base_dir;
    this.agent_name = agent_name;
  }
  public prompt_data() {
    const prompt = Array.isArray(this.data.prompt)
      ? this.data.prompt.join("\n")
      : this.data.prompt;
    return prompt;
  }
  public format_question(message: string) {
    return message;
  }
  public botname() {
    return this.data.bot || `Agent(${this.agent_name})`;
  }
  public functions() {
    const functions = this.data.functions;
    if (functions) {
      if (typeof functions === "string") {
        const functions_path = path.resolve(`${this.base_dir}/${functions}`);
        const functions_file = fs.readFileSync(functions_path, "utf8");
        return JSON.parse(functions_file);
      }
      return functions;
    }
    return null;
  }
}

export default Manifest;
