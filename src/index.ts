import module from "module";
import path from "path";
import type { Plugin } from "rollup";

const require = module.createRequire(import.meta.url);
const utilsFile = require.resolve("./utils");

const wasm = (): Plugin => ({
  name: "wasm",
  async transform(code, id) {
    if (path.extname(id) !== ".wasm") return null;

    this.addWatchFile(id);

    const wasmReferenceId = this.emitFile({
      type: "asset",
      fileName: path.basename(id),
      source: code,
    });

    return {
      code: `
import { instantiate } from "${utilsFile}";
const mod = await instantiate(import.meta.ROLLUP_FILE_URL_${wasmReferenceId});
export const __synthetic__ = mod.instance.exports;
`,
      syntheticNamedExports: "__synthetic__",
      moduleSideEffects: false,
    };
  },
});

export default wasm;
