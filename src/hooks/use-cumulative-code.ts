import { useAppSelector } from "@/hooks/redux"

export const useCumulativeCode = (cellId: string) => {
  return useAppSelector((state) => {
    const { data, order } = state.cells
    const cells = order.map((id) => data[id])
    // Import aliases
    const base = `
    import __React__ from "react"
    import * as __ReactDOM__ from "react-dom/client"
    const __ctx__ = {}
    `
    const code = [base]
    for (const cell of cells) {
      if (cell.type === "code") {
        if (cell.id === cellId) {
          // Clear the DOM
          code.push(`
          for (const child of document.body.children) {
            document.body.removeChild(child)
          }
          for (const attr of document.body.attributes) {
            document.body.removeAttribute(attr.name)
          }
          document.body.innerHTML = "<div id='root'></div>"
          `)
          // Alias the React root
          code.push(`__ctx__.reactRoot = __ReactDOM__.createRoot(document.getElementById("root"))`)
          // Update any ReactDOM calls to use the alias and correctly call render
          code.push(cell.content.replace(/=.*createRoot\(.*/g, "= __ctx__").replace(/.render\(/g, ".reactRoot.render("))
          break
        } else {
          // Update any ReactDOM calls to use the alias and ignore calls to render
          code.push(cell.content.replace(/=.*createRoot\(.*/g, "= __ctx__").replace(/.*\.render\(.*/g, ""))
        }
      }
    }
    return code.join("\n")
  })
}
