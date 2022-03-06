import fs from "fs"
import path from "path"
import type { Plugin } from "rollup"
import { fileURLToPath } from "url"
import { generateCode } from "./generator"

const helpersImportPath = fileURLToPath(new URL("helpers.mjs", import.meta.url))

const wasm = (): Plugin => ({
  name: "wasm",

  async load(id) {
    if (path.extname(id) !== ".wasm") return null

    this.addWatchFile(id)

    const source = await fs.promises.readFile(id)
    const mod = await WebAssembly.compile(source)

    const wasmReferenceId = this.emitFile({
      type: "asset",
      name: path.basename(id),
      source,
    })

    const wasmFileUrl = `import.meta.ROLLUP_FILE_URL_${wasmReferenceId}`

    const code = generateCode({ mod, wasmFileUrl, helpersImportPath })

    return { code, moduleSideEffects: false }
  },
})

export default wasm
