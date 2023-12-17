"use client"

import { Provider } from "react-redux"

import { store } from "@/store"

type NotebookProviderProps = {
  children: React.ReactNode
}
export function NotebookProvider({ children }: NotebookProviderProps) {
  return <Provider store={store}>{children}</Provider>
}
