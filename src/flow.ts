type Node = {
  title: string;
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
    callback({message: "run"})
  }
}

export default Flow;