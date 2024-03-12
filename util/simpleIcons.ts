import * as icons from "simple-icons";

const arr = Array.from(Object.entries(icons));

function getRandomIcon(amount?: number) {
  const icon = arr[Math.floor(Math.random() * arr.length)];
  return icon[1];
}

export default getRandomIcon;
