import path from "path";

import { readManifestData } from "../src/file_utils";

const main = async () => {
  const file_path = path.resolve(__dirname) + "/flow.yml";
  const manifest = readManifestData(file_path);
  console.log(manifest);
};
main();