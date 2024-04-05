export enum NodeState {
  Waiting,
  Executing,
  Failed,
  Completed
}

type NodeData = {
  inputs: undefined | Record<string, any>;
  params: any;
}

type FlowData = {
  nodes: Record<string, NodeData>
};

export enum FlowCommand {
  Log,
  Execute
}

type FlowCallback = (cmd: FlowCommand, node: string, params: any) => void;

class Node {
  public key: string;
  public inputs: Record<string, any>
  public pendings: Set<string>;
  public params: any;
  public waitlist: Set<string>;
  public state: NodeState;
  public result: Record<string, any>;
  constructor(key: string, data: NodeData) {
    this.key = key;
    this.inputs = data.inputs ?? {};
    this.pendings = new Set(Object.keys(this.inputs));
    this.params = data.params;
    this.waitlist = new Set<string>();
    this.state = NodeState.Waiting;
    this.result = {};
  }

  public asString() {
    return `${this.key}: ${this.state} ${[...this.waitlist]}`    
  }  
}

export class Graph {
  public nodes: Record<string, Node>
  public callback: FlowCallback;

  constructor(data: FlowData, callback: FlowCallback) {
    this.callback = callback;
    const foo: Record<string, Node> = {}; // HACK: Work around
    this.nodes = Object.keys(data.nodes).reduce((nodes, key) => {
      nodes[key] = new Node(key, data.nodes[key]);
      return nodes;
    }, foo);

    // Generate waitlist from inputs
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      node.pendings.forEach(pending => {
        const node2 = this.nodes[pending]
        node2.waitlist.add(key);
      });
    });
    console.log(this.asString());
  }

  public asString() {
    return Object.keys(this.nodes).map((key) => { return this.nodes[key].asString() }).join('\n');
  }

  public async run() {
    // Find nodes with no pending and run them immediately.
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      if (node.pendings.size == 0) {
        node.state = NodeState.Executing;
        this.callback(FlowCommand.Execute, key, node.params);
      }
    });
  }

  public async feed(key: string, result: Record<string, any>) {
    console.log("***feed", key, result)
    const node = this.nodes[key];
    node.result = result;
    node.waitlist.forEach(key2 => {
      const node2 = this.nodes[key2];
      node2.pendings.delete(key);
      if (node2.pendings.size == 0) {
        node2.state = NodeState.Executing;
        this.callback(FlowCommand.Execute, key2, node2.params);
      }
    });

  }
}
