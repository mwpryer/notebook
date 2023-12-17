"use client"

import React, { useEffect, useState } from "react"
import { editor } from "monaco-editor"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "@/../tailwind.config"

import { Cell, updateCell } from "@/store/features/cells"
import { useAppDispatch, useAppSelector } from "@/store"
import { createBundle } from "@/store/features/bundles"
import { useCumulativeCode } from "@/store/features/cells"
import { Resizable } from "@/components/ui/resizable"
import { CodeEditor } from "@/components/notebook/code-editor"
import { CodePreview } from "@/components/notebook/code-preview"

const fullConfig = resolveConfig(tailwindConfig) as any
const md = parseInt(fullConfig.theme.screens.md.replace("px", ""))

let debounceTimer: any
type CodeCellProps = {
  cell: Cell
  setEditorRef: (editor: editor.IStandaloneCodeEditor) => void
}
export function CodeCell({ cell, setEditorRef }: CodeCellProps) {
  const dispatch = useAppDispatch()
  const initialized = useAppSelector((state) => state.bundles.initialized)
  const bundle = useAppSelector((state) => state.bundles.data[cell.id])
  const cellIdx = useAppSelector((state) => state.cells.order.indexOf(cell.id))
  const cumulativeCode = useCumulativeCode(cell.id)
  const [width, setWidth] = useState(1920)

  useEffect(() => {
    setWidth(window.innerWidth)
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!initialized) return
    dispatch(createBundle({ cellId: cell.id, input: cumulativeCode }))
  }, [dispatch, initialized, cell.id, cumulativeCode])

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    setEditorRef(editor)
  }

  const handleEditorChange = (value: string) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      dispatch(updateCell({ id: cell.id, content: value }))
    }, 750)
  }

  const codeEditor = (
    <CodeEditor initialValue={cell.content} onMount={handleEditorDidMount} onChange={handleEditorChange} />
  )

  return (
    <div className="pb-2">
      {width < md ? (
        <Resizable direction="vertical" height={500} className="border-t">
          <div className="flex h-full flex-col gap-2">
            <div>
              <Resizable direction="vertical" height={300} className="border-b border-t">
                {codeEditor}
              </Resizable>
            </div>
            <CodePreview
              isLoading={!bundle || bundle.isLoading}
              cellIdx={cellIdx}
              code={bundle?.code || ""}
              error={bundle?.error || ""}
            />
          </div>
        </Resizable>
      ) : (
        <Resizable direction="vertical">
          <div className="flex h-full gap-2">
            <Resizable direction="horizontal">{codeEditor}</Resizable>
            <CodePreview
              isLoading={!bundle || bundle.isLoading}
              cellIdx={cellIdx}
              code={bundle?.code || ""}
              error={bundle?.error || ""}
            />
          </div>
        </Resizable>
      )}
    </div>
  )
}
