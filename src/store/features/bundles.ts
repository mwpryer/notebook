import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { bundle } from "@/bundler"

export type BundlesState = {
  initialized: boolean
  data: { [key: string]: { code: string; isLoading: boolean; error: string } | undefined }
}

const initialState: BundlesState = {
  initialized: false,
  data: {},
}

export const createBundle = createAsyncThunk<void, { cellId: string; input: string }>(
  "bundles/createBundle",
  async ({ cellId, input }, { dispatch }) => {
    dispatch(bundleStart({ cellId }))
    const result = await bundle(input)
    dispatch(bundleComplete({ cellId, bundle: { code: result.code, error: result.error } }))
  },
)

export const bundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    initializedBundler: (state) => {
      state.initialized = true
    },
    bundleStart: (state, action: PayloadAction<{ cellId: string }>) => {
      state.data[action.payload.cellId] = {
        isLoading: true,
        code: state.data[action.payload.cellId]?.code || "",
        error: "",
      }
    },
    bundleComplete: (state, action: PayloadAction<{ cellId: string; bundle: { code: string; error: string } }>) => {
      state.data[action.payload.cellId] = {
        isLoading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      }
    },
  },
})

export const { initializedBundler, bundleStart, bundleComplete } = bundlesSlice.actions

export default bundlesSlice.reducer
