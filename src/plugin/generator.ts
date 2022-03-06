import { IdentifierRegistry } from "@cprecioso/identifier-registry"
import * as h from "./generate-helpers"
import { groupBy } from "./utils"

export const generateCode = ({
  mod,
  wasmFileUrl,
  helpersImportPath,
}: {
  mod: WebAssembly.Module
  wasmFileUrl: string
  helpersImportPath: string
}) => {
  const registry = new IdentifierRegistry()

  const instantiateIdentifier = registry.add("instantiate")
  const wasmModuleIdentifier = registry.add("wasmModule")

  const imports = WebAssembly.Module.imports(mod).map((descriptor, i) => ({
    identifier: registry.add(descriptor.name),
    importName: descriptor.name,
    importPath: descriptor.module,
  }))
  const importsByPath = [...groupBy(imports, (i) => i.importPath)]

  const exports = WebAssembly.Module.exports(mod).map((descriptor, i) => ({
    identifier: registry.add(descriptor.name),
    exportName: descriptor.name,
  }))

  const code = h.program([
    ...importsByPath.map(([importPath, imports]) =>
      h.importStatement(
        importPath,
        imports.map(({ importName, identifier }) => [importName, identifier])
      )
    ),

    h.importStatement(helpersImportPath, [
      ["instantiate", instantiateIdentifier],
    ]),

    h.assignmentStatement(
      wasmModuleIdentifier,
      h.awaitExpression(
        h.functionCallExpression(instantiateIdentifier, [
          wasmFileUrl,
          h.objectLiteralExpression(
            importsByPath.map(([importPath, imports]) => [
              importPath,
              h.objectLiteralExpression(
                imports.map(({ importName, identifier }) => [
                  importName,
                  identifier,
                ])
              ),
            ])
          ),
        ])
      )
    ),

    ...exports.map(({ identifier, exportName }) =>
      h.assignmentStatement(
        identifier,
        h.propertyAccessExpression(
          `${wasmModuleIdentifier}.instance.exports`,
          exportName
        )
      )
    ),

    h.exportStatement(
      exports.map(({ identifier, exportName }) => [exportName, identifier])
    ),
  ])

  return code
}
