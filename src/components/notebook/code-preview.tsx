import { useEffect, useRef } from "react"

import { Spinner } from "@/components/ui/spinner"

type CodePreviewProps = {
  isLoading: boolean
  code: string
  error: string
}
export function CodePreview({ isLoading, code, error }: CodePreviewProps) {
  const iframe = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!iframe.current) return
    iframe.current.srcdoc = html
    setTimeout(() => {
      if (!iframe.current?.contentWindow) return
      if (error) {
        const escaped = `${error.replace(/\n/g, "").replace(/"/g, '\\"').replace(/'/g, "\\'")}`
        iframe.current.contentWindow.postMessage(`(() => { throw new Error("${escaped}") })();`, "*")
      } else {
        iframe.current.contentWindow.postMessage(code, "*")
      }
    }, 50)
  }, [code, error])

  return (
    <div className="relative flex-grow overflow-hidden border-b">
      <div className="absolute inset-0 hidden [.react-draggable-transparent-selection_&]:block"></div>
      {isLoading && (
        <div className="absolute top-2 right-2">
          <Spinner className="w-8 h-8 text-primary" />
        </div>
      )}
      <div className="flex h-full">
        <iframe
          title="preview"
          srcDoc={html}
          sandbox="allow-scripts"
          ref={iframe}
          width="0"
          className="flex-grow"
        ></iframe>
      </div>
    </div>
  )
}

const html = `
<html>
  <head>
    <style>
      body {
        background-color: #ffffff;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      function handleError(error) {
        const root = document.getElementById("root")
        root.innerHTML = "<div style='color: red;'><h4>Runtime Error:</h4>" + error + "</div>"
        console.error(error)
      }
      window.addEventListener("error", (event) => {
        event.preventDefault()
        handleError(event.error)
      })
      window.addEventListener(
        "message",
        (event) => {
          try {
            eval(event.data)
          } catch (err) {
            handleError(err)
          }
        },
        false
      )
    </script>
  </body>
</html>
`
