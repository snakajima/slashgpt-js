import path from "path";
import { Flow, FlowCommand } from "../src/flow";

import { readManifestData } from "../src/file_utils";

const main = async () => {
  const file_path = path.resolve(__dirname) + "/flow.yml";
  const flow_data = readManifestData(file_path);
  const flow = new Flow(flow_data)
  flow.run(async (result) => {
    if (result.cmd == FlowCommand.Execute) {
        console.log("executing", result.node)
        setTimeout(() => {
          console.log("done")
        }, 500);
    }
  });
};
main();