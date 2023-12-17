import { useState, useEffect, useRef } from "react"
import MDEditor, { commands } from "@uiw/react-md-editor"

import { Cell, updateCell } from "@/store/features/cells"
import { useAppDispatch } from "@/hooks/redux"
import { Resizable } from "@/components/ui/resizable"

type NoteCellProps = {
  cell: Cell
}
export function NoteCell({ cell }: NoteCellProps) {
  const dispatch = useAppDispatch()
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) return
      setEditing(false)
    }
    document.addEventListener("click", listener, { capture: true })
    return () => document.removeEventListener("click", listener, { capture: true })
  })

  return (
    <div className="pb-2 rounded bg-card [&_.w-md-editor-toolbar]:justify-start">
      <Resizable direction="vertical">
        <div className="flex h-full border-b">
          {editing ? (
            <div ref={ref} className="flex-grow">
              <MDEditor
                value={cell.content}
                onChange={(v) => dispatch(updateCell({ id: cell.id, content: v || "" }))}
                className="!h-full !shadow-none !pb-0"
                visibleDragbar={false}
                commands={[...commands.getCommands(), commands.divider]}
              />
            </div>
          ) : (
            <div onClick={() => setEditing(true)} className="flex-grow">
              <MDEditor.Markdown source={cell.content || "Click to edit..."} className="h-full p-6 overflow-y-auto " />
            </div>
          )}
        </div>
      </Resizable>
    </div>
  )
}
