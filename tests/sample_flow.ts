import path from "path";
import { Graph, FlowCommand } from "../src/flow";

import { readManifestData } from "../src/file_utils";

const test = async (graph_data: any) => {
  return new Promise((resolve, reject) => {
    const graph = new Graph(graph_data, async (params) => {
      if (params.cmd == FlowCommand.Execute) {
          const node = params.node;
          console.log("executing", node, params.params)
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
        resolve(graph);
      }
    });
    graph.run();
  });
}

const main = async () => {
  const file_path = path.resolve(__dirname) + "/graphs/sample1.yml";
  const graph_data = readManifestData(file_path);
  await test(graph_data);
  console.log("COMPLETE");
};
main();