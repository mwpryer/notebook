import { useContext } from "react"
import { useTheme } from "next-themes"
import Editor, { OnMount, OnChange } from "@monaco-editor/react"

import { CellContext } from "@/components/providers/cell"

type CodeEditorProps = {
  initialValue: string
  onChange: (value: string) => void
}
export function CodeEditor({ initialValue, onChange }: CodeEditorProps) {
  const { resolvedTheme } = useTheme()
  const cell = useContext(CellContext)

  const handleEditorDidMount: OnMount = (editor) => {
    cell!.editorRef!.current = editor
  }

  const handleEditorChange: OnChange = (value) => {
    if (!value) value = ""
    onChange(value)
  }

  return (
    <div className="relative h-full overflow-hidden md:border-b">
      <Editor
        defaultLanguage="javascript"
        defaultValue={initialValue}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          folding: false,
          lineNumbersMinChars: 3,
          minimap: { enabled: false },
          padding: { top: 8 },
          scrollBeyondLastLine: false,
          showUnused: false,
          tabSize: 2,
          wordWrap: "on",
        }}
        theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
        className="absolute inset-0"
      />
    </div>
  )
}
