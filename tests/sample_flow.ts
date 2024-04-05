import path from "path";
import { Graph, FlowCommand } from "../src/flow";

import { readManifestData } from "../src/file_utils";

const main = async () => {
  const file_path = path.resolve(__dirname) + "/graphs/sample1.yml";
  const graph_data = readManifestData(file_path);
  const graph = new Graph(graph_data, async (params) => {
    if (params.cmd == FlowCommand.Execute) {
        const node = params.node;
        console.log("executing", node, params.params, params.payload)
        setTimeout(() => {
          const result = { [node]:"success" };
          console.log("completing", node, result)
          graph.feed(node, result)
        }, params.params.delay);
    }
  });
  graph.run();
};
main();