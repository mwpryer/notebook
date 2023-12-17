import { Code, StickyNote } from "lucide-react"

import { useAppDispatch } from "@/store"
import { insertCell } from "@/store/features/cells"
import { Button } from "@/components/ui/button"

type AddCellProps = {
  prevCellId: string | null
}
export function AddCell({ prevCellId }: AddCellProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="flex justify-center">
      <Button
        size="icon"
        variant="secondary"
        onClick={() => dispatch(insertCell({ prevCellId, type: "code" }))}
        className="rounded-r-none border-r-0 text-muted-foreground hover:text-foreground"
      >
        <Code className="h-4 w-4" />
        <span className="sr-only">Add code</span>
      </Button>
      <div className="w-px bg-border"></div>
      <Button
        size="icon"
        variant="secondary"
        onClick={() => dispatch(insertCell({ prevCellId, type: "note" }))}
        className="rounded-l-none border-l-0 text-muted-foreground hover:text-foreground"
      >
        <StickyNote className="h-4 w-4" />
        <span className="sr-only">Add note</span>
      </Button>
    </div>
  )
}
