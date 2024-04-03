import path from "path";
import Flow from "../src/flow";

import { readManifestData } from "../src/file_utils";

const main = async () => {
  const file_path = path.resolve(__dirname) + "/flow.yml";
  const flow_data = readManifestData(file_path);
  const flow = new Flow(flow_data)
  console.log(flow.title);
  console.log(flow.nodes);
  flow.run();
};
main();