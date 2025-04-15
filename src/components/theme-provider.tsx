
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  attribute = "data-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    if (attribute === "class") {
      root.classList.remove("light", "dark")

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light"
        root.classList.add(systemTheme)
        return
      }

      root.classList.add(theme)
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.setAttribute(attribute, theme === "system" ? systemTheme : theme)
    }

    localStorage.setItem(storageKey, theme)
  }, [theme, attribute, storageKey])

  useEffect(() => {
    if (!enableSystem) return

    const handleMediaChange = (event: MediaQueryListEvent) => {
      const root = window.document.documentElement
      const systemTheme = event.matches ? "dark" : "light"

      if (theme === "system") {
        if (attribute === "class") {
          root.classList.remove("light", "dark")
          root.classList.add(systemTheme)
        } else {
          root.setAttribute(attribute, systemTheme)
        }
      }
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener("change", handleMediaChange)

    return () => {
      mq.removeEventListener("change", handleMediaChange)
    }
  }, [theme, attribute, enableSystem])

  // handle transitions
  useEffect(() => {
    if (!disableTransitionOnChange) return

    const { classList } = document.documentElement
    classList.add("[&_*]:!transition-none")
    window.setTimeout(() => {
      classList.remove("[&_*]:!transition-none")
    }, 0)
  }, [theme, disableTransitionOnChange])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
