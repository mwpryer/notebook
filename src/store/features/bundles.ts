import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { bundle } from "@/bundler"

export type BundlesState = {
  [key: string]: { code: string; isLoading: boolean; error: string } | undefined
}

const initialState: BundlesState = {}

export const createBundle = createAsyncThunk<void, { cellId: string; input: string }>(
  "bundles/createBundle",
  async ({ cellId, input }, { dispatch }) => {
    dispatch(bundleStart({ cellId }))
    const result = await bundle(input)
    dispatch(bundleComplete({ cellId, bundle: { code: result.code, error: result.error } }))
  }
)

export const bundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    bundleStart: (state, action: PayloadAction<{ cellId: string }>) => {
      state[action.payload.cellId] = { isLoading: true, code: "", error: "" }
    },
    bundleComplete: (state, action: PayloadAction<{ cellId: string; bundle: { code: string; error: string } }>) => {
      state[action.payload.cellId] = {
        isLoading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      }
    },
  },
})

export const { bundleStart, bundleComplete } = bundlesSlice.actions

export default bundlesSlice.reducer
