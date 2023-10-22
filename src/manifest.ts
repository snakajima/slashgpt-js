import { ManifestData } from "./types";

class Manifest {
  private data: ManifestData
  constructor(manifest_data: ManifestData) {
    this.data = manifest_data;
  }
  public prompt_data() {
    const prompt = Array.isArray(this.data.prompt) ? this.data.prompt.join("\n") : this.data.prompt
    return prompt;
  }
}

export default Manifest
