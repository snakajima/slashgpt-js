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
          if (params.params.fail) {
            const result = { [node]:"failed" };
            console.log("failed", node, result)
            graph.reportError(node, result);
          } else {
            const result = { [node]:"success" };
            console.log("completing", node, result)
            graph.feed(node, result)
          }
        }, params.params.delay);
    } else if (params.cmd == FlowCommand.OnComplete) {
      console.log("=== ON COMPLETE")
    }
  });
  graph.run();
};
main();