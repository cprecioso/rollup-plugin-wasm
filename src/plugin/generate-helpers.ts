export const program = (statements: string[]) => statements.join(";")

export const importStatement = (
  importPath: string,
  specifiers: [importName: string, identifier?: string][]
) =>
  `import {${specifiers
    .map(
      ([importName, identifier = importName]) =>
        `${importName} as ${identifier}`
    )
    .join(",")}} from "${importPath}"`

export const assignmentStatement = (identifier: string, expression: string) =>
  `const ${identifier} = (${expression})`

export const expression = (expression: string) => `(${expression})`

export const awaitExpression = (expression: string) => `(await (${expression}))`

export const functionCallExpression = (
  functionExpression: string,
  args: string[] = []
) =>
  `((${functionExpression})(${args.map((arg) => expression(arg)).join(",")}))`

export const objectLiteralExpression = (
  pairs: [name: string, value?: string][] = []
) =>
  `({${pairs
    .map(([name, value = name]) => `"${name}": (${value})`)
    .join(",")}})`

export const propertyAccessExpression = (
  object: string,
  propertyName: string
) => `((${object})["${propertyName}"])`

export const exportStatement = (
  specifiers: [name: string, identifier?: string][]
) =>
  `export {${specifiers
    .map(([name, identifier = name]) => `${identifier} as ${name}`)
    .join(",")}}`
