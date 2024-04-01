export declare const http_request: (__url: string, method: string, __headers: Record<string, string>, __appkey_value: string, http_arguments: Record<string, string>) => Promise<string | null>;
export declare const graphQLRequest: (__url: string, __headers: Record<string, string>, __appkey_value: string, http_arguments: Record<string, string>) => Promise<string>;
