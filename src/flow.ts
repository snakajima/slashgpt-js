type FlowData = {
  title: string;
};

class Flow {
  public data: FlowData;
  constructor(data: FlowData) {
    this.data = data;
  }
}

export default Flow;