import { useState, useEffect, useRef } from "react"
import MDEditor, { commands } from "@uiw/react-md-editor"

import { useAppDispatch } from "@/store"
import { Cell, updateCell } from "@/store/features/cells"
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
    <div className="rounded bg-card pb-2 [&_.w-md-editor-toolbar]:justify-start">
      <Resizable direction="vertical">
        <div className="flex h-full border-b">
          {editing ? (
            <div ref={ref} className="flex-grow">
              <MDEditor
                value={cell.content}
                onChange={(v) => dispatch(updateCell({ id: cell.id, content: v || "" }))}
                className="!h-full !pb-0 !shadow-none"
                visibleDragbar={false}
                commands={[...commands.getCommands(), commands.divider]}
              />
            </div>
          ) : (
            <div onClick={() => setEditing(true)} className="flex-grow">
              <MDEditor.Markdown source={cell.content || "Click to edit..."} className="h-full overflow-y-auto p-6 " />
            </div>
          )}
        </div>
      </Resizable>
    </div>
  )
}
