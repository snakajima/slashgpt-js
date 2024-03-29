declare class FuctionAction {
    private function_action_data;
    constructor(function_action_data: Record<string, string>);
    call_api(): void;
}
export default FuctionAction;
