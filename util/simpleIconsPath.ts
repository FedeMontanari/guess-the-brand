import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const simpleIconsPath = (name: string) => {
  //@ts-ignore
  const icon: SimpleIcon = icons[name];
  for (let key in icons){
    console.log(key)
  }
  const { path, title, slug } = icon;
  return {
    path,
    title,
    slug,
  };
};

export default simpleIconsPath;
