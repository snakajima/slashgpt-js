"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http_request = void 0;
const http_request = (url, method, headers, appkey_value, http_arguments) => {
    /*
    const appkey = {"appkey": appkey_value}
    const headers = {key: value.format(**http_arguments, **appkey) for key, value in headers.items()}
    if (ethod == "POST":
    headers["Content-Type"] = "application/json"
    if verbose:
    print_debug(f"Posting to {url} {headers}")
    response = requests.post(url, headers=headers, json=http_arguments)
    else:
    if verbose:
    print_debug(str(http_arguments.items()))
    url = url.format(
      **{key: urllib.parse.quote(value) for key, value in http_arguments.items()},
      **appkey,
        )
        if verbose:
            print_debug(f"Fetching from {url}")
        response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.text
    else:
        print_error(f"Got {response.status_code}:{response.text} from {url}")
    */
};
exports.http_request = http_request;
