import * as React from "react"

import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.ComponentPropsWithRef<"span"> {}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(({ className }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("spinner pointer-events-none inline-block aspect-square bg-current w-6 h-6", className)}
    ></span>
  )
})
Spinner.displayName = "Spinner"

export { Spinner }
