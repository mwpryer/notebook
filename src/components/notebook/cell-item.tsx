import { Cell } from "@/store/features/cells"
import { CellProvider } from "@/components/providers/cell"
import { CodeCell } from "@/components/notebook/code-cell"
import { NoteCell } from "@/components/notebook/note-cell"
import { ActionBar } from "@/components/notebook/action-bar"

type CellItemProps = {
  cell: Cell
}
export function CellItem({ cell }: CellItemProps) {
  const cells = {
    code: <CodeCell cell={cell} />,
    note: <NoteCell cell={cell} />,
  }

  return (
    <div className="relative">
      <div className="flex flex-col overflow-hidden border rounded bg-card group">
        <CellProvider>
          <div className="overflow-hidden">{cells[cell.type]}</div>
          <ActionBar id={cell.id} className="absolute z-20 right-4 -top-2" cellType={cell.type} />
        </CellProvider>
      </div>
    </div>
  )
}
