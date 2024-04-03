type Node = {
  title: string;
  inputs: undefined | any;
}

type FlowData = {
  title: string;
  nodes: Record<string, Node>
};

type FlowCallback = (result: any) => void;

class Flow {
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
        callback({cmd: "execute", node: key, params: node});
      }
    });
  }
}

export default Flow;