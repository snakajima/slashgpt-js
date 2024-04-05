import path from "path";
import { Graph, FlowCommand } from "../src/flow";

import { readManifestData } from "../src/file_utils";

const main = async () => {
  const file_path = path.resolve(__dirname) + "/graphs/sample1.yml";
  const graph_data = readManifestData(file_path);
  const graph = new Graph(graph_data, async (cmd, node, params) => {
    if (cmd == FlowCommand.Execute) {
        console.log("executing", node, params)
        setTimeout(() => {
          const result = { [node]:"success" };
          console.log("completing", node, result)
          graph.feed(node, result)
        }, params.delay);
    }
  });
  graph.run();
};
main();