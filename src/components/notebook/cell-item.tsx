import { useState } from "react"
import { editor } from "monaco-editor"

import { Cell } from "@/store/features/cells"
import { CodeCell } from "@/components/notebook/code-cell"
import { NoteCell } from "@/components/notebook/note-cell"
import { ActionBar } from "@/components/notebook/action-bar"

type CellItemProps = {
  cell: Cell
}
export function CellItem({ cell }: CellItemProps) {
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor | null>(null)

  const cells = {
    code: <CodeCell cell={cell} setEditorRef={setEditorRef} />,
    note: <NoteCell cell={cell} />,
  }

  return (
    <div className="relative">
      <div className="group flex flex-col overflow-hidden rounded border bg-card">
        {cells[cell.type]}
        <ActionBar
          id={cell.id}
          cellType={cell.type}
          editorRef={editorRef}
          className="absolute -bottom-2 right-4 z-20"
        />
      </div>
    </div>
  )
}
