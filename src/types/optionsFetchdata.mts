export type optionsFetchdata = {
    method ?: "GET"| "POST"| "PUT";
    data ?: Record<string, unknown> | FormData;
    token ?: string;
    headers?: Record<string, string>
}   

