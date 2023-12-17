"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Update theme for markdown editor
    document.documentElement.setAttribute("data-color-mode", resolvedTheme === "dark" ? "dark" : "light")
  }, [resolvedTheme])

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {(!mounted || (mounted && resolvedTheme === "dark")) && <Sun className="h-4 w-4" />}
      {mounted && resolvedTheme === "light" && <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
