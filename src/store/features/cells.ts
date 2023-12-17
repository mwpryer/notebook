import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"

export type CellType = "code" | "note"
export type Cell = {
  id: string
  type: CellType
  content: string
}
export type CellsState = {
  data: { [key: string]: Cell }
  isLoading: boolean
  error: string | null
  order: string[]
}

const initialState: CellsState = {
  data: {},
  isLoading: false,
  error: null,
  order: [],
}

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    setCells: (state, action: PayloadAction<{ cells: Cell[] }>) => {
      state.data = {}
      state.order = []
      action.payload.cells.forEach((cell) => {
        state.data[cell.id] = cell
        state.order.push(cell.id)
      })
    },
    insertCell: (state, action: PayloadAction<{ prevCellId: string | null; type: CellType; content?: string }>) => {
      const cell: Cell = {
        id: nanoid(),
        type: action.payload.type,
        content: action.payload.content || "",
      }
      state.data[cell.id] = cell
      const idx = state.order.findIndex((id) => id === action.payload.prevCellId)
      if (idx === -1) {
        state.order.unshift(cell.id)
      } else {
        state.order.splice(idx + 1, 0, cell.id)
      }
    },
    updateCell: (state, action: PayloadAction<{ id: string; content: string }>) => {
      state.data[action.payload.id].content = action.payload.content
    },
    deleteCell: (state, action: PayloadAction<{ id: string }>) => {
      delete state.data[action.payload.id]
      const index = state.order.findIndex((id) => id === action.payload.id)
      if (index !== -1) state.order.splice(index, 1)
    },
    moveCell: (state, action: PayloadAction<{ id: string; direction: "up" | "down" }>) => {
      const idx = state.order.findIndex((id) => id === action.payload.id)
      const newIdx = action.payload.direction === "up" ? idx - 1 : idx + 1
      if (newIdx < 0 || newIdx > state.order.length - 1) return
      state.order[idx] = state.order[newIdx]
      state.order[newIdx] = action.payload.id
    },
  },
})

export const { setCells, insertCell, updateCell, deleteCell, moveCell } = cellsSlice.actions

export default cellsSlice.reducer

const cell1 = `import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<App />)

let message = "secret message"`
const cell2 = `const Message = () => (
  <h1>
    Printing <em>{message}</em>
  </h1>
)

root.render(<Message />)`
export const initialCells: Cell[] = [
  { id: nanoid(), type: "code", content: cell1 },
  { id: nanoid(), type: "code", content: cell2 },
]
