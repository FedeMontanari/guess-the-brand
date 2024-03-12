import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const simpleIconsPath = (name: string) => {
  //@ts-ignore
  const icon: SimpleIcon = icons[name];
  const svg = icon.path;
  return svg;
};

export default simpleIconsPath;
