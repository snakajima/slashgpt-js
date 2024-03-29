class FuctionAction {
  private function_action_data: Record<string, string>;

  constructor(function_action_data: Record<string, string>) {
    this.function_action_data = function_action_data;
  }
  public call_api(
    name: string,
    call_arguments: Record<string, unknown>,
    base_dir: string,
  ) {
    const callType = (this.function_action_data["type"] || "").toLowerCase();
    if (callType === "rest") {
      console.log("rest not implemented");
    } else if (callType === "graphql") {
      console.log("graphql not implemented");
    } else if (callType === "data_url") {
      return this.read_dataURL_template(
        base_dir,
        this.function_action_data["template_message"],
        this.function_action_data["mime_type"],
        this.function_action_data["message"],
        call_arguments,
      );
      console.log("data_url not implemented");
    } else if (callType === "message_template") {
      console.log("message_template not implemented");
    } else if (callType === "emit") {
      console.log("emit");
    } else if (callType === "debug") {
      console.log(
        name,
        "arguments: " + JSON.stringify(call_arguments, null, "\t"),
      );
      return null;
    }
    return "Success";
  }

  private read_dataURL_template(
    base_dir: string,
    template_message: string,
    mime_type: string,
    message: string,
    call_arguments: Record<string, unknown>,
  ) {
    console.log(base_dir, template_message, mime_type, message, call_arguments);

    const data = this.replate_template(call_arguments, template_message);
    const dataURL =
      "data:" + mime_type + ";charset=utf-8," + encodeURIComponent(data);
    return this.replate_template({ url: dataURL }, message);
  }

  private replate_template(
    base_data: Record<string, unknown>,
    template: string,
  ) {
    return Object.keys(base_data).reduce((tmp, key) => {
      return tmp.replaceAll("{" + key + "}", base_data[key] as string);
    }, template);
  }
}

export default FuctionAction;
