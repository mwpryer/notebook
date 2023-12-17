import { useState } from "react"
import { editor } from "monaco-editor"
import { ArrowDown, ArrowUp, Trash2, Plus, Code, StickyNote, Code2 } from "lucide-react"
import prettier from "prettier/standalone"
import babel from "prettier/plugins/babel"
import estree from "prettier/plugins/estree"

import { useAppDispatch, useAppSelector } from "@/store"
import { insertCell, moveCell, deleteCell } from "@/store/features/cells"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ActionBarProps = {
  id: string
  cellType: "code" | "note"
  editorRef: editor.IStandaloneCodeEditor | null
  className?: string
}
export function ActionBar({ id, cellType, editorRef, className }: ActionBarProps) {
  const dispatch = useAppDispatch()
  const cellOrder = useAppSelector((state) => state.cells.order)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleFormatCode = async () => {
    if (!editorRef) return
    const code = editorRef.getValue()
    const formatted = (await prettier.format(code, { parser: "babel", plugins: [babel, estree], semi: false })).replace(
      /\n$/,
      "",
    )
    editorRef.setValue(formatted)
  }

  return (
    <div
      className={cn(
        "flex gap-1 rounded-md border bg-card p-0.5 opacity-0 transition-opacity group-hover:opacity-100",
        isDropdownOpen && "opacity-100",
        className,
      )}
    >
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-6 w-6 text-muted-foreground", isDropdownOpen && "bg-muted text-secondary-foreground")}
            aria-label="insert cell"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-fit">
          <DropdownMenuItem
            onClick={() => dispatch(insertCell({ prevCellId: id, type: "code" }))}
            className="px-1.5 py-0.5"
          >
            <Code className="mr-1.5 h-3 w-3" />
            <span className="text-sm">Code</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(insertCell({ prevCellId: id, type: "note" }))}
            className="px-1.5 py-0.5"
          >
            <StickyNote className="mr-1.5 h-3 w-3" />
            <span className="text-sm">Note</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {cellType === "code" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleFormatCode()}
          className="h-6 w-6 text-muted-foreground"
          aria-label="format code"
        >
          <Code2 className="h-4 w-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        disabled={!cellOrder[cellOrder.indexOf(id) - 1]}
        onClick={() => dispatch(moveCell({ id, direction: "up" }))}
        className="h-6 w-6 text-muted-foreground"
        aria-label="move cell up"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={!cellOrder[cellOrder.indexOf(id) + 1]}
        onClick={() => dispatch(moveCell({ id, direction: "down" }))}
        className="h-6 w-6 text-muted-foreground"
        aria-label="move cell down"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(deleteCell({ id }))}
        className="h-6 w-6 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
        aria-label="delete cell"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
