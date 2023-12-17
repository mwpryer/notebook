import { configureStore } from "@reduxjs/toolkit"

import cellsReducer from "@/store/features/cells"
import bundlesReducer from "@/store/features/bundles"
import { initialCells } from "@/store/features/cells"

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

store.dispatch({ type: "cells/setCells", payload: { cells: initialCells } })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
