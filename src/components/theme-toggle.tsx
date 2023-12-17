"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    // Update theme for markdown editor
    if (resolvedTheme === "dark") {
      document.documentElement.setAttribute("data-color-mode", "dark")
    } else {
      document.documentElement.setAttribute("data-color-mode", "light")
    }
  }, [resolvedTheme])

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
