"use client"

import { useEffect, useRef } from "react"

import { startService } from "@/bundler"
import { useAppDispatch, useAppSelector } from "@/store"
import { initializedBundler } from "@/store/features/bundles"
import { cellsSelector } from "@/store/features/cells"
import { CellList } from "@/components/notebook/cell-list"

export function Notebook() {
  const dispatch = useAppDispatch()
  const cells = useAppSelector(cellsSelector)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    startService().then(() => dispatch(dispatch(initializedBundler())))
    started.current = true
  }, [dispatch])

  return (
    <div className="p-1 pb-12">
      <CellList cells={cells} />
    </div>
  )
}
