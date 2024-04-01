import path from "path";

export const getBasePath = () => path.resolve(__dirname + "/../");

export const getFilePath = (fileName: string) => {
  const base_path = getBasePath();
  const file = base_path + "/manifests/main/" + fileName;
  return file;
};
