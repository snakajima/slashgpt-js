declare class FuctionAction {
    private function_action_data;
    constructor(function_action_data: Record<string, string>);
    call_api(name: string, call_arguments: Record<string, string>, base_dir: string): Promise<string | null>;
    private read_dataURL_template;
    private get_appkey_value;
}
export default FuctionAction;
