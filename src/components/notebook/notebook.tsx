"use client"

import { useEffect, useState } from "react"

import { startService } from "@/bundler"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { initialCells, setCells } from "@/store/features/cells"
import { CellList } from "@/components/notebook/cell-list"
import { Spinner } from "@/components/ui/spinner"

export function Notebook() {
  const dispatch = useAppDispatch()
  const [initialized, setInitialized] = useState(false)
  const cells = useAppSelector(({ cells }) => cells.order.map((id) => cells.data[id]))

  useEffect(() => {
    startService().then(() => setInitialized(true))
  }, [])

  useEffect(() => {
    dispatch(setCells({ cells: initialCells }))
  }, [dispatch])

  if (!initialized) {
    return (
      <div className="grid place-items-center border flex-grow">
        <Spinner className="w-24 h-24 text-primary" />
      </div>
    )
  }

  return (
    <div className="px-3 py-3 pb-4">
      <CellList cells={cells} />
    </div>
  )
}
