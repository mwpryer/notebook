import { Code, StickyNote } from "lucide-react"

import { useAppDispatch } from "@/store"
import { insertCell } from "@/store/features/cells"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type AddCellProps = {
  prevCellId: string | null
}
export function AddCell({ prevCellId }: AddCellProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="flex justify-center">
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => dispatch(insertCell({ prevCellId, type: "code" }))}
            className="rounded-r-none border-r-0 text-muted-foreground hover:text-foreground"
          >
            <Code className="h-4 w-4" />
            <span className="sr-only">New code cell</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>New code cell</p>
        </TooltipContent>
      </Tooltip>
      <div className="w-px bg-border"></div>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => dispatch(insertCell({ prevCellId, type: "note" }))}
            className="rounded-l-none border-l-0 text-muted-foreground hover:text-foreground"
          >
            <StickyNote className="h-4 w-4" />
            <span className="sr-only">New note cell</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>New note cell</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
