export const instantiateNode = async (
  url: string,
  importObject?: WebAssembly.Imports
) => {
  const fs = await import("fs")
  const contents = await fs.promises.readFile(new URL(url))
  const mod = await WebAssembly.instantiate(contents, importObject)
  return mod
}

export const instantiateWeb = async (
  url: string,
  importObject?: WebAssembly.Imports
) => {
  const req = fetch(url)
  const mod = await WebAssembly.instantiateStreaming(req, importObject)
  return mod
}

const isNode =
  /*#__PURE__*/ typeof process !== "undefined" &&
  /*#__PURE__*/ process.versions != null &&
  /*#__PURE__*/ process.versions.node != null

export const instantiate = async (
  url: string,
  importObject?: WebAssembly.Imports
) => {
  if (isNode) {
    return await instantiateNode(url, importObject)
  } else {
    return await instantiateWeb(url, importObject)
  }
}
