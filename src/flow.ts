export enum NodeState {
  Waiting,
  Executing,
  Failed,
  Completed
}

type NodeData = {
  title: string;
  inputs: undefined | Record<string, any>;
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
  public key: string;
  public title: string;
  public inputs: Record<string, any>
  public pendings: Set<string>;
  public params: any;
  public outputs: string[]; // auto-generated
  public state: NodeState;
  public result: Record<string, any>;
  constructor(key: string, data: NodeData) {
    this.key = key;
    this.title = data.title;
    this.inputs = data.inputs ?? {};
    this.pendings = new Set(Object.keys(this.inputs));
    this.params = data.params;
    this.outputs = [];
    this.state = NodeState.Waiting;
    this.result = {};
  }

  public asString() {
    return `${this.key}: ${this.state} ${this.outputs}`    
  }  
}

export class Graph {
  public title: string;
  public nodes: Record<string, Node>

  constructor(data: FlowData) {
    this.title = data.title;
    const foo: Record<string, Node> = {}; // HACK: Work around
    this.nodes = Object.keys(data.nodes).reduce((nodes, key) => {
      nodes[key] = new Node(key, data.nodes[key]);
      return nodes;
    }, foo);

    // Generate outputs from inputs
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      for (const pending in node.pendings) {
        const node = this.nodes[pending]
        node.outputs.push(key);
      }
    });
    console.log(this.asString());
  }

  public asString() {
    return Object.keys(this.nodes).map((key) => { return this.nodes[key].asString() }).join('\n');
  }

  public async run(callback: FlowCallback) {
    // Find nodes with no pending and run them immediately.
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      if (node.pendings.size == 0) {
        node.state = NodeState.Executing;
        callback({cmd: FlowCommand.Execute, node: key, params: node.params});
      }
    });
  }

  public async feed(key: string, result: Record<string, any>) {
    console.log("***feed", key, result)
    this.nodes[key].result = result;
  }
}
