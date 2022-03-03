export const instantiateNode = async (url: string) => {
  const fs = await import("fs");
  const contents = await fs.promises.readFile(new URL(url));
  const mod = await WebAssembly.instantiate(contents);
  return mod;
};

export const instantiateWeb = async (url: string) => {
  const req = fetch(url);
  const mod = await WebAssembly.instantiateStreaming(req);
  return mod;
};

const isNode =
  /*#__PURE__*/ typeof process !== "undefined" &&
  /*#__PURE__*/ process.versions != null &&
  /*#__PURE__*/ process.versions.node != null;

export const instantiate = async (url: string) => {
  if (isNode) {
    return await instantiateNode(url);
  } else {
    return await instantiateWeb(url);
  }
};
