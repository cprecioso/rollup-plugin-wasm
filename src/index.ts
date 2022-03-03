import fs from "fs"
import path from "path"
import type { Plugin } from "rollup"
import { fileURLToPath } from "url"

const utilsFile = fileURLToPath(new URL("utils.mjs", import.meta.url))

const wasm = (): Plugin => ({
  name: "wasm",
  async load(id) {
    if (path.extname(id) !== ".wasm") return null

    this.addWatchFile(id)

    const wasmReferenceId = this.emitFile({
      type: "asset",
      fileName: path.basename(id),
      source: await fs.promises.readFile(id),
    })

    return {
      code: `
import { instantiate } from "${utilsFile}";
const mod = await instantiate(import.meta.ROLLUP_FILE_URL_${wasmReferenceId});
export const __synthetic__ = mod.instance.exports;
`,
      syntheticNamedExports: "__synthetic__",
      moduleSideEffects: false,
    }
  },
})

export default wasm
