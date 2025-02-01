import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import "../styles/globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/providers/theme"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NotebookProvider } from "@/components/providers/notebook"
import { Footer } from "@/components/footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <NotebookProvider>
              <main className="flex flex-grow flex-col">{children}</main>
              <Footer />
            </NotebookProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "Notebook",
  description: "Browser development environment to write JavaScript code",
}
