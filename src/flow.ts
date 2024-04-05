export enum NodeState {
  Waiting,
  Executing,
  Failed,
  Completed
}

type NodeData = {
  title: string;
  inputs: undefined | any[];
  params: any;
}

type FlowData = {
  title: string;
  nodes: Record<string, NodeData>
};

type FlowCallback = (result: any) => void;

export enum FlowCommand {
  Log,
  Execute
}

class Node {
  public title: string;
  public inputs: undefined | any[];
  public params: any;
  public outputs: string[]; // auto-generated
  public state: NodeState;
  constructor(data: NodeData) {
    this.title = data.title;
    this.inputs = data.inputs;
    this.params = data.params;
    this.outputs = [];
    this.state = NodeState.Waiting;
  }
}

export class Flow {
  public title: string;
  public nodes: Record<string, Node>

  constructor(data: FlowData) {
    this.title = data.title;
    const foo: Record<string, Node> = {}; // HACK: Work around
    this.nodes = Object.keys(data.nodes).reduce((nodes, key) => {
      nodes[key] = new Node(data.nodes[key]);
      return nodes;
    }, foo);
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      node.outputs = [];
      node.state = NodeState.Waiting;
    });
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      if (node.inputs !== undefined) {
        node.inputs.forEach(input => {
          const node = this.nodes[input.node]
          node.outputs.push(key);
        });

        // Debug code
        Object.keys(this.nodes).forEach(key => {
          const node = this.nodes[key]
          console.log("*outputs", key, node.outputs);          
        });
      }
    });

    console.log(this.nodes);
  }

  public async run(callback: FlowCallback) {
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      if (node.inputs == undefined) {
        node.state = NodeState.Executing;
        callback({cmd: FlowCommand.Execute, node: key, params: node.params});
      }
    });
  }

  public async feed(node: string, data: any) {
    console.log("***feed", node, data)
  }
}
