type Node = {
  title: string;
  inputs: undefined | any[];
  params: any;
  outputs: string[]; // auto-generated
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
    Object.keys(this.nodes).forEach(key => {
      const node = this.nodes[key];
      node.outputs = [];
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
        callback({cmd: FlowCommand.Execute, node: key, params: node.params});
      }
    });
  }

  public async feed(node: string, data: any) {
    console.log("***feed", node, data)
  }
}
