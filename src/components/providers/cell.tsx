import React, { useRef } from "react"
import { editor } from "monaco-editor"

type CellContextType = {
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>
}
export const CellContext = React.createContext<CellContextType | null>(null)

export function CellProvider({ children }: { children: React.ReactNode }) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  return <CellContext.Provider value={{ editorRef }}>{children}</CellContext.Provider>
}
