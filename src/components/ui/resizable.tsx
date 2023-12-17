"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ResizableBox, ResizeHandle, ResizableBoxProps, ResizeCallbackData } from "react-resizable"

type ResizableProps = {
  direction: "horizontal" | "vertical"
  height?: number
  children?: React.ReactNode
  className?: string
}
export function Resizable({ direction, height: initialHeight, children, className }: ResizableProps) {
  const [isActive, setIsActive] = useState(false)
  const [width, setWidth] = useState(800)
  const [prevWidth, setPrevWidth] = useState(width)
  const [height, setHeight] = useState(initialHeight || 300)
  const [prevHeight, setPrevHeight] = useState(height)

  useEffect(() => {
    if (width !== window.innerWidth) setPrevWidth(width)

    function listener() {
      if (width > window.innerWidth) setWidth(window.innerWidth)
    }
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [width])

  useEffect(() => {
    if (height !== 0) setPrevHeight(height)
  }, [height])

  const handleOnResizeStart = () => {
    setIsActive(true)
  }

  const handleOnResizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    setIsActive(false)
    setWidth(data.size.width)
  }

  const handleSnapWindow = (e: React.MouseEvent<HTMLElement>) => {
    if (e.detail !== 2) return
    if (direction === "horizontal") {
      if (width !== window.innerWidth) {
        setPrevWidth(width)
        setWidth(window.innerWidth)
      } else {
        setWidth(prevWidth)
      }
    } else {
      if (height !== 0) {
        setPrevHeight(height)
        setHeight(0)
      } else {
        setHeight(prevHeight)
      }
    }
  }

  let resizableProps: Partial<ResizableBoxProps> = {
    className: `relative ${isActive ? "resize-active" : ""}`,
    handle: (resizeHandle, ref) => ResizableHandle(resizeHandle, ref, handleSnapWindow, className),
    onResizeStart: handleOnResizeStart,
    onResizeStop: handleOnResizeStop,
  }
  if (direction === "horizontal") {
    resizableProps = {
      ...resizableProps,
      width,
      height: Infinity,
      minConstraints: [0, Infinity],
      resizeHandles: ["e"],
    }
  }
  if (direction === "vertical") {
    resizableProps = {
      ...resizableProps,
      width: Infinity,
      height,
      minConstraints: [Infinity, 0],
      resizeHandles: ["s"],
    }
  }

  return <ResizableBox {...(resizableProps as ResizableBoxProps)}>{children}</ResizableBox>
}

function ResizableHandle(
  resizeHandle: ResizeHandle,
  ref: React.RefObject<any>,
  onDoubleClick: (e: React.MouseEvent<HTMLElement>) => void,
  className?: string,
) {
  if (resizeHandle === "e") {
    return (
      <div
        ref={ref}
        onClick={onDoubleClick}
        className={cn(
          "absolute right-0 top-0 z-10 -mr-2 grid h-full w-2 cursor-col-resize place-items-center overflow-hidden border-l border-r bg-card text-muted-foreground transition hover:border-primary hover:bg-indigo-500 hover:text-white [.resize-active>&]:border-primary [.resize-active>&]:bg-indigo-500 [.resize-active>&]:text-white",
          className,
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" fill="currentColor">
          <circle cx="1" cy="1" r="1" />
          <circle cx="1" cy="7" r="1" />
          <circle cx="1" cy="13" r="1" />
        </svg>
      </div>
    )
  } else {
    return (
      <div
        ref={ref}
        onClick={onDoubleClick}
        className={cn(
          "absolute bottom-0 left-0 -mb-2 grid h-2 w-full cursor-row-resize place-items-center overflow-hidden bg-card text-muted-foreground transition hover:border-primary hover:bg-indigo-500 hover:text-white [.resize-active>&]:border-primary [.resize-active>&]:bg-indigo-500 [.resize-active>&]:text-white",
          className,
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" fill="currentColor">
          <circle cx="1" cy="1" r="1" />
          <circle cx="7" cy="1" r="1" />
          <circle cx="13" cy="1" r="1" />
        </svg>
      </div>
    )
  }
}
