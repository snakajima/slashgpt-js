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

  public complete(result: Record<string, any>, nodes: Record<string, Node>, callback: FlowCallback) {
    this.state = NodeState.Completed;
    this.result = result;
    this.waitlist.forEach(key => {
      const node = nodes[key];
      node.removePending(this.key, callback);
    });
  }

  public removePending(key: string, callback: FlowCallback) {
    this.pendings.delete(key);
    this.executeIfReady(callback);
  }

  public executeIfReady(callback: FlowCallback) {
    if (this.pendings.size == 0) {
      this.state = NodeState.Executing;
      callback(FlowCommand.Execute, this.key, this.params);
    }
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

    // Generate the waitlist for each node
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      node.pendings.forEach(pending => {
        const node2 = this.nodes[pending]
        node2.waitlist.add(key);
      });
    });
  }

  public asString() {
    return Object.keys(this.nodes).map((key) => { return this.nodes[key].asString() }).join('\n');
  }

  public async run() {
    // Nodes without pending data should run immediately.
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      node.executeIfReady(this.callback);
    });
  }

  public async feed(key: string, result: Record<string, any>) {
    const node = this.nodes[key];
    node.complete(result, this.nodes, this.callback);
  }
}
