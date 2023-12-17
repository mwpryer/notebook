import { Code, StickyNote } from "lucide-react"

import { useAppDispatch } from "@/hooks/redux"
import { insertCell } from "@/store/features/cells"
import { Button } from "@/components/ui/button"

type AddCellProps = {
  prevCellId: string | null
}
export function AddCell({ prevCellId }: AddCellProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="relative flex justify-center">
      <div className="flex">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => dispatch(insertCell({ prevCellId, type: "code" }))}
          className="rounded-r-none border-r-0"
        >
          <Code className="w-4 h-4" />
        </Button>
        <div className="w-px bg-border"></div>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => dispatch(insertCell({ prevCellId, type: "note" }))}
          className="rounded-l-none border-l-0"
        >
          <StickyNote className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
