import { ManifestData } from "./types";
declare class Manifest {
    private data;
    base_dir: string;
    private agent_name;
    constructor(manifest_data: ManifestData, base_dir?: string, agent_name?: string);
    prompt_data(): string;
    format_question(message: string): string;
    botname(): string;
    model_name(): string;
    functions(): any;
    actions(): any;
    function_call(): {
        name: string;
    } | undefined;
    skip_function_result(): boolean;
}
export default Manifest;
