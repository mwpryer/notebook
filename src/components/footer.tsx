"use client"

import { Upload, Download } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/store"
import { cellsSelector, setCells } from "@/store/features/cells"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Footer() {
  const dispatch = useAppDispatch()
  const cells = useAppSelector(cellsSelector)

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const content = reader.result
        if (content) dispatch(setCells({ cells: JSON.parse(content as string) }))
      }
      reader.readAsText(file)
    }
  }

  return (
    <footer className="dark mt-auto w-full border-t bg-card px-3 py-4 text-sm text-muted-foreground">
      <div className="grid grid-cols-2 items-center md:grid-cols-3">
        <span className="whitespace-nowrap md:col-start-2 md:justify-self-center">
          Made by{" "}
          <span aria-label="wizard" role="img">
            🧙
          </span>{" "}
          <a className="font-semibold" href="https://mattpryer.com" rel="noopener noreferrer" target="_blank">
            Matt Pryer
          </a>
        </span>
        <div className="flex gap-2 justify-self-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a
                  download="notebook.json"
                  href={`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(cells, null, 2))}`}
                  className={cn(buttonVariants({ variant: "outline", size: "icon" }), "text-muted-foreground")}
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Export</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div>
                  <input type="file" onChange={handleImport} className="hidden" id="import" />
                  <label
                    htmlFor="import"
                    className={cn(buttonVariants({ variant: "outline", size: "icon" }), "text-muted-foreground")}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Import</span>
                  </label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
