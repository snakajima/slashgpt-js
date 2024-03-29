import { replate_template } from "./utils";

export const http_request = async (
  __url: string,
  method: string,
  __headers: Record<string, string>,
  appkey_value: string,
  http_arguments: Record<string, string>,
) => {
  const appkey = { appkey: appkey_value };
  const headers = Object.keys(__headers).reduce(
    (tmp: Record<string, string>, key: string) => {
      tmp[key] = replate_template(
        { ...(http_arguments || {}), ...appkey },
        __headers[key],
      );
      return tmp;
    },
    {},
  );

  const response = await (async () => {
    if (method === "POST") {
      //headers["Content-Type"] = "application/json"
      // response = requests.post(url, headers=headers, json=http_arguments)
      console.log("post");
      return await fetch(__url, {
        method: "post",
        body: JSON.stringify({
          ...http_arguments,
          ...{ "Content-Type": "application/json" },
        }),
        headers,
      });
    }
    const http_args = Object.keys(http_arguments).reduce(
      (tmp: Record<string, string>, key: string) => {
        tmp[key] = encodeURIComponent(http_arguments[key]);
        return tmp;
      },
      {},
    );
    const url = replate_template({ ...http_args, ...appkey }, __url);
    return await fetch(url, { headers });
  })();

  if (response.status === 200) {
    return response.text();
  }
  console.log(
    "Got " + response.status + ":" + response.text() + "from " + __url,
  );
  return null;
};
