import fs from "fs";
import YAML from "yaml";
import path from "path";

import { print_bot } from "../src/chat_utils";

export const readJsonManifest = (fileName: string) => {
  const manifest_file = fs.readFileSync(fileName, "utf8");
  const manifest = JSON.parse(manifest_file);
  return manifest;
};

export const readYamlManifest = (fileName: string) => {
  const manifest_file = fs.readFileSync(fileName, "utf8");
  const manifest = YAML.parse(manifest_file);
  return manifest;
};

export const readManifestData = (fileName: string) => {
  const file = getFilePath(fileName);
  if (file.endsWith(".yaml") || file.endsWith(".yml")) {
    return readYamlManifest(file);
  }
  if (file.endsWith(".json")) {
    return readJsonManifest(file);
  }
  throw new Error("No file exists " + fileName);
};

export const callback = (callback_type: string, data: unknown) => {
  if (callback_type === "bot") {
    print_bot("bot", JSON.stringify(data));
  }
};

export const getBasePath = () => path.resolve(__dirname + "/../");

const getFilePath = (fileName: string) => {
  const base_path = getBasePath();
  const file = base_path + "/manifests/main/" + fileName;
  return file;
};
