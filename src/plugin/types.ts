export interface ImportInfo {
  path: string
  name: string
}

export interface ExportInfo {
  name: string
}

export interface ModuleInfo {
  imports: ImportInfo[]
  exports: ExportInfo[]
  transformed_module: number[]
}
