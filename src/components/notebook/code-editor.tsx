import { editor } from "monaco-editor"
import Editor, { OnMount, OnChange } from "@monaco-editor/react"
import { useTheme } from "next-themes"

type CodeEditorProps = {
  initialValue: string
  onMount: (editor: editor.IStandaloneCodeEditor) => void
  onChange: (value: string) => void
}
export function CodeEditor({ initialValue, onMount, onChange }: CodeEditorProps) {
  const { resolvedTheme } = useTheme()

  const handleEditorDidMount: OnMount = (editor) => {
    onMount(editor)
  }

  const handleEditorChange: OnChange = (value) => {
    onChange(value ?? "")
  }

  return (
    <div className="h-full md:border-b">
      <Editor
        defaultLanguage="javascript"
        defaultValue={initialValue}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          fixedOverflowWidgets: true,
          fontFamily: "var(--font-geist-mono)",
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
