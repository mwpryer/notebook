import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import "../styles/globals.css"
import { NotebookProvider } from "@/components/providers/notebook"
import { ThemeProvider } from "@/components/providers/theme"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex flex-col flex-grow">
            <NotebookProvider>{children}</NotebookProvider>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "Notebook",
  description: "Browser development environment to write JavaScript code",
}
