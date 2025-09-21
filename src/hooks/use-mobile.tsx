import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize state to false to avoid hydration mismatch, let useEffect correct it on client
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // This code only runs on the client
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Set the initial value on the client
    setIsMobile(mql.matches)

    // Listen for changes
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mql.addEventListener("change", onChange)

    // Cleanup listener on unmount
    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return isMobile
}
