type Node = {
  title: string;
}

type FlowData = {
  title: string;
  nodes: Record<string, Node>
};


class Flow {
  public data: FlowData;
  public nodes: Record<string, Node>

  constructor(data: FlowData) {
    this.data = data;
    this.nodes = data.nodes;
  }
}

export default Flow;