"use client"

import React, { useEffect, useState } from "react"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "@/../tailwind.config"

import { Cell, updateCell } from "@/store/features/cells"
import { createBundle } from "@/store/features/bundles"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useCumulativeCode } from "@/hooks/use-cumulative-code"
import { Resizable } from "@/components/ui/resizable"
import { CodeEditor } from "@/components/notebook/code-editor"
import { CodePreview } from "@/components/notebook/code-preview"

const fullConfig = resolveConfig(tailwindConfig) as any
const md = parseInt(fullConfig.theme.screens.md.replace("px", ""))

let timer: any
type CodeCellProps = {
  cell: Cell
}
export function CodeCell({ cell }: CodeCellProps) {
  const dispatch = useAppDispatch()
  const bundle = useAppSelector((state) => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    dispatch(createBundle({ cellId: cell.id, input: cumulativeCode }))
  }, [cumulativeCode, dispatch, cell.id])

  const handleEditorChange = (value: string) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(updateCell({ id: cell.id, content: value }))
    }, 750)
  }

  const codeEditor = <CodeEditor initialValue={cell.content} onChange={handleEditorChange} />

  return (
    <div className="relative pb-2">
      {width < md ? (
        <div>
          {/* Small screens */}
          <Resizable direction="vertical" height={500}>
            <div className="flex flex-col h-full gap-2">
              <div>
                <Resizable direction="vertical" height={300} className="border-b border-t">
                  {codeEditor}
                </Resizable>
              </div>
              <CodePreview
                isLoading={!bundle || bundle.isLoading}
                code={bundle?.code || ""}
                error={bundle?.error || ""}
              />
            </div>
          </Resizable>
        </div>
      ) : (
        <div>
          {/* Medium screens */}
          <Resizable direction="vertical">
            <div className="flex h-full gap-2">
              <Resizable direction="horizontal">{codeEditor}</Resizable>
              <CodePreview
                isLoading={!bundle || bundle.isLoading}
                code={bundle?.code || ""}
                error={bundle?.error || ""}
              />
            </div>
          </Resizable>
        </div>
      )}
    </div>
  )
}
