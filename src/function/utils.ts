export const replate_template = (
  base_data: Record<string, unknown>,
  template: string,
) => {
  return Object.keys(base_data).reduce((tmp, key) => {
    return tmp.replaceAll("{" + key + "}", base_data[key] as string);
  }, template);
};
