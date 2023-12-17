import React from "react"

import { Cell } from "@/store/features/cells"
import { CellItem } from "@/components/notebook/cell-item"
import { AddCell } from "@/components/notebook/add-cell"

type CellListProps = {
  cells: Cell[]
}
export function CellList({ cells }: CellListProps) {
  return (
    <div className="space-y-2">
      {cells.map((cell) => (
        <CellItem key={cell.id} cell={cell} />
      ))}
      <AddCell prevCellId={cells[cells.length - 1]?.id ?? null} />
    </div>
  )
}
