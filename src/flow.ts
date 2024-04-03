type Node = {
  title: string;
  inputs: undefined | any;
}

type FlowData = {
  title: string;
  nodes: Record<string, Node>
};

type FlowCallback = (result: any) => void;

export enum FlowCommand {
  Log,
  Execute
}

export class Flow {
  public title: string;
  public nodes: Record<string, Node>

  constructor(data: FlowData) {
    this.title = data.title;
    this.nodes = data.nodes;
  }

  public async run(callback: FlowCallback) {
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      if (node.inputs == undefined) {
        callback({cmd: FlowCommand.Execute, node: key, params: node});
      }
    });
  }

  public async feed(node: string, data: any) {
    console.log("***feed", node, data)
  }
}
