import React, { Fragment } from "react"

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
        <Fragment key={cell.id}>
          <CellItem cell={cell} />
        </Fragment>
      ))}
      <AddCell prevCellId={cells[cells.length - 1]?.id ?? null} />
    </div>
  )
}
