import { ThemeToggle } from "@/components/theme-toggle"

export function Footer() {
  return (
    <footer className="dark bg-card text-muted-foreground py-4 px-3 w-full border-t text-sm mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 items-center">
        <span className="md:col-start-2 md:justify-self-center whitespace-nowrap">
          Made by{" "}
          <span aria-label="wizard" role="img">
            🧙
          </span>{" "}
          <a className="font-semibold" href="https://mattpryer.com" rel="noopener noreferrer" target="_blank">
            Matt Pryer
          </a>
        </span>
        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
