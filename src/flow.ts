export enum NodeState {
  Waiting,
  Executing,
  Failed,
  Completed
}

type NodeData = {
  inputs: undefined | Array<string>;
  params: any; // Application specific parameters
}

type FlowData = {
  nodes: Record<string, NodeData>
};

export enum FlowCommand {
  Log,
  Execute,
  OnComplete
}

type FlowCallback = (params: Record<string, any>) => void;

class Node {
  public key: string;
  public pendings: Set<string>;
  public params: any;
  public waitlist: Set<string>;
  public state: NodeState;
  public result: Record<string, any>;
  constructor(key: string, data: NodeData) {
    this.key = key;
    this.pendings = new Set(data.inputs ?? []);
    this.params = data.params;
    this.waitlist = new Set<string>();
    this.state = NodeState.Waiting;
    this.result = {};
  }

  public asString() {
    return `${this.key}: ${this.state} ${[...this.waitlist]}`    
  }

  public complete(result: Record<string, any>, nodes: Record<string, Node>, graph: Graph) {
    this.state = NodeState.Completed;
    this.result = result;
    this.waitlist.forEach(key => {
      const node = nodes[key];
      node.removePending(this.key, graph);
    });
    graph.remove(this);
  }

  public reportError(result: Record<string, any>, nodes: Record<string, Node>, graph: Graph) {
    this.state = NodeState.Failed;
    this.result = result;
    graph.remove(this);
  }

  public removePending(key: string, graph: Graph) {
    this.pendings.delete(key);
    this.executeIfReady(graph);
  }

  public executeIfReady(graph: Graph) {
    if (this.pendings.size == 0) {
      this.state = NodeState.Executing;
      graph.add(this);
      graph.callback({cmd: FlowCommand.Execute, node: this.key, params: this.params });
    }
  }
}

export class Graph {
  public nodes: Record<string, Node>
  public callback: FlowCallback;
  private runningNodes: Set<string>;

  constructor(data: FlowData, callback: FlowCallback) {
    this.callback = callback;
    this.runningNodes = new Set<string>();
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

  public run() {
    // Nodes without pending data should run immediately.
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      node.executeIfReady(this);
    });
  }

  public feed(key: string, result: Record<string, any>) {
    const node = this.nodes[key];
    node.complete(result, this.nodes, this);
  }

  public reportError(key: string, result: Record<string, any>) {
    const node = this.nodes[key];
    node.reportError(result, this.nodes, this);
  }

  public add(node: Node) {
    this.runningNodes.add(node.key);
  }

  public remove(node: Node) {
    this.runningNodes.delete(node.key);
    if (this.runningNodes.size == 0) {
      this.callback({cmd: FlowCommand.OnComplete});
    }
  }
}
