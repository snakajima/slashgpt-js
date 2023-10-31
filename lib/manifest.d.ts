import { ManifestData } from "./types";
declare class Manifest {
    private data;
    private base_dir;
    private agent_name;
    constructor(manifest_data: ManifestData, base_dir?: string, agent_name?: string);
    prompt_data(): string;
    format_question(message: string): string;
    botname(): string;
    functions(): any;
    function_call(): {
        name: string;
    } | undefined;
}
export default Manifest;
