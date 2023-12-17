import { useContext, useState } from "react"
import { ArrowDown, ArrowUp, Trash2, Plus, Code, StickyNote, Code2 } from "lucide-react"
import prettier from "prettier/standalone"
import babel from "prettier/plugins/babel"
import estree from "prettier/plugins/estree"

import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { deleteCell, moveCell, insertCell } from "@/store/features/cells"
import { cn } from "@/lib/utils"
import { CellContext } from "@/components/providers/cell"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ActionBarProps = {
  id: string
  cellType: "code" | "note"
  className?: string
}
export function ActionBar({ id, cellType, className }: ActionBarProps) {
  const dispatch = useAppDispatch()
  const cell = useContext(CellContext)
  const cells = useAppSelector((state) => state.cells.order)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const prevCellId = cells[cells.indexOf(id) - 1]
  const nextCellId = cells[cells.indexOf(id) + 1]

  const handleFormatCode = async () => {
    if (!cell || !cell.editorRef || !cell.editorRef.current) return
    const code = cell.editorRef.current.getValue()
    const formatted = (await prettier.format(code, { parser: "babel", plugins: [babel, estree], semi: false })).replace(
      /\n$/,
      ""
    )
    cell.editorRef.current.setValue(formatted)
  }

  return (
    <div
      className={cn(
        "flex gap-1 p-0.5 bg-card border rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
        isDropdownOpen && "opacity-100",
        className
      )}
    >
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(insertCell({ prevCellId: id, type: "note" }))}
            className={cn("w-6 h-6 text-muted-foreground", isDropdownOpen && "text-secondary-foreground bg-muted")}
            aria-label="insert cell"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-fit">
          <DropdownMenuItem
            onClick={() => dispatch(insertCell({ prevCellId: id, type: "code" }))}
            className="px-1.5 py-0.5"
          >
            <Code className="w-3 h-3 mr-1.5" />
            <span className="text-sm">Code</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(insertCell({ prevCellId: id, type: "note" }))}
            className="px-1.5 py-0.5"
          >
            <StickyNote className="w-3 h-3 mr-1.5" />
            <span className="text-sm">Note</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {cellType === "code" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleFormatCode()}
          className="w-6 h-6 text-muted-foreground"
          aria-label="format code"
        >
          <Code2 className="w-4 h-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        disabled={!prevCellId}
        onClick={() => dispatch(moveCell({ id, direction: "up" }))}
        className="w-6 h-6 text-muted-foreground"
        aria-label="move cell up"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={!nextCellId}
        onClick={() => dispatch(moveCell({ id, direction: "down" }))}
        className="w-6 h-6 text-muted-foreground"
        aria-label="move cell down"
      >
        <ArrowDown className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(deleteCell({ id }))}
        className="w-6 h-6 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
        aria-label="delete cell"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
