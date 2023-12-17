import * as React from "react"

import { cn } from "@/lib/utils"

interface SpinnerProps extends React.ComponentPropsWithRef<"div"> {}
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ className }, ref) => {
  return <div ref={ref} className={cn("spinner h-6 w-6 bg-current", className)}></div>
})
Spinner.displayName = "Spinner"

export { Spinner }
