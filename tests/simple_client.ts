import path from "path";

import { justRun } from "../src/simple_client";

const main = async () => {
  const file_path = path.resolve(__dirname) + "/paper.yml";
  const session = await justRun(file_path);
  console.log(session);
};
main();
