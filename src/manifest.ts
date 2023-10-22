import { ManifestData } from "./types";

class Manifest {
  private data: ManifestData
  private agent_name: string;
  
  constructor(manifest_data: ManifestData, base_dir: string = "", agent_name: string = "") {
    this.data = manifest_data;
    this.agent_name= agent_name;
  }
  public prompt_data() {
    const prompt = Array.isArray(this.data.prompt) ? this.data.prompt.join("\n") : this.data.prompt
    return prompt;
  }
  public format_question(message: string) {
    return message;
  }
  public botname() {
    return this.data.bot || `Agent(${this.agent_name})`
  };
  
}

export default Manifest
