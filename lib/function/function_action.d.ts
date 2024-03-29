declare class FuctionAction {
    private function_action_data;
    constructor(function_action_data: Record<string, string>);
    call_api(name: string, call_arguments: Record<string, unknown>, base_dir: string): Promise<string | void | null>;
    private read_dataURL_template;
    private replate_template;
    private get_appkey_value;
}
export default FuctionAction;
