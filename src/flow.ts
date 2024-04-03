type Node = {
  title: string;
}

type FlowData = {
  title: string;
  nodes: Record<string, Node>
};


class Flow {
  public title: string;
  public nodes: Record<string, Node>

  constructor(data: FlowData) {
    this.title = data.title;
    this.nodes = data.nodes;
  }

  public async run() {
    console.log("*** run")
  }
}

export default Flow;