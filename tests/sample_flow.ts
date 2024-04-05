import path from "path";
import { Graph, FlowCommand } from "../src/flow";

import { readManifestData } from "../src/file_utils";

const main = async () => {
  const file_path = path.resolve(__dirname) + "/graphs/sample1.yml";
  const graph_data = readManifestData(file_path);
  const graph = new Graph(graph_data)
  graph.run(async (result) => {
    if (result.cmd == FlowCommand.Execute) {
        console.log("executing", result.node, result.params)
        setTimeout(() => {
          console.log("done")
          graph.feed(result.node, {})
        }, 500);
    }
  });
};
main();